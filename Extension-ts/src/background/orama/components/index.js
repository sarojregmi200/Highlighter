import { createError } from '../errors.js';
import { create as avlCreate, find as avlFind, greaterThan as avlGreaterThan, insert as avlInsert, lessThan as avlLessThan, rangeSearch as avlRangeSearch, removeDocument as avlRemoveDocument } from '../trees/avl.js';
import { create as radixCreate, find as radixFind, insert as radixInsert, removeDocumentByWord as radixRemoveDocument } from '../trees/radix.js';
import { intersect } from '../utils.js';
import { BM25 } from './algorithms.js';
import { getInnerType, isArrayType } from './defaults.js';
import { getInternalDocumentId } from './internal-document-id-store.js';
export async function insertDocumentScoreParameters(index, prop, id, tokens, docsCount) {
    const internalId = getInternalDocumentId(index.sharedInternalDocumentStore, id);
    index.avgFieldLength[prop] = ((index.avgFieldLength[prop] ?? 0) * (docsCount - 1) + tokens.length) / docsCount;
    index.fieldLengths[prop][internalId] = tokens.length;
    index.frequencies[prop][internalId] = {};
}
export async function insertTokenScoreParameters(index, prop, id, tokens, token) {
    let tokenFrequency = 0;
    for (const t of tokens){
        if (t === token) {
            tokenFrequency++;
        }
    }
    const internalId = getInternalDocumentId(index.sharedInternalDocumentStore, id);
    const tf = tokenFrequency / tokens.length;
    index.frequencies[prop][internalId][token] = tf;
    if (!(token in index.tokenOccurrences[prop])) {
        index.tokenOccurrences[prop][token] = 0;
    }
    // increase a token counter that may not yet exist
    index.tokenOccurrences[prop][token] = (index.tokenOccurrences[prop][token] ?? 0) + 1;
}
export async function removeDocumentScoreParameters(index, prop, id, docsCount) {
    const internalId = getInternalDocumentId(index.sharedInternalDocumentStore, id);
    index.avgFieldLength[prop] = (index.avgFieldLength[prop] * docsCount - index.fieldLengths[prop][internalId]) / (docsCount - 1);
    index.fieldLengths[prop][internalId] = undefined;
    index.frequencies[prop][internalId] = undefined;
}
export async function removeTokenScoreParameters(index, prop, token) {
    index.tokenOccurrences[prop][token]--;
}
export async function calculateResultScores(context, index, prop, term, ids) {
    const documentIDs = Array.from(ids);
    // Exact fields for TF-IDF
    const avgFieldLength = index.avgFieldLength[prop];
    const fieldLengths = index.fieldLengths[prop];
    const oramaOccurrences = index.tokenOccurrences[prop];
    const oramaFrequencies = index.frequencies[prop];
    // oramaOccurrences[term] can be undefined, 0, string, or { [k: string]: number }
    const termOccurrences = typeof oramaOccurrences[term] === 'number' ? oramaOccurrences[term] ?? 0 : 0;
    const scoreList = [];
    // Calculate TF-IDF value for each term, in each document, for each index.
    const documentIDsLength = documentIDs.length;
    for(let k = 0; k < documentIDsLength; k++){
        var _oramaFrequencies_internalId;
        const internalId = getInternalDocumentId(index.sharedInternalDocumentStore, documentIDs[k]);
        const tf = (oramaFrequencies === null || oramaFrequencies === void 0 ? void 0 : (_oramaFrequencies_internalId = oramaFrequencies[internalId]) === null || _oramaFrequencies_internalId === void 0 ? void 0 : _oramaFrequencies_internalId[term]) ?? 0;
        const bm25 = BM25(tf, termOccurrences, context.docsCount, fieldLengths[internalId], avgFieldLength, context.params.relevance);
        scoreList.push([
            internalId,
            bm25
        ]);
    }
    return scoreList;
}
export async function create(orama, sharedInternalDocumentStore, schema, index, prefix = '') {
    if (!index) {
        index = {
            sharedInternalDocumentStore,
            indexes: {},
            searchableProperties: [],
            searchablePropertiesWithTypes: {},
            frequencies: {},
            tokenOccurrences: {},
            avgFieldLength: {},
            fieldLengths: {}
        };
    }
    for (const [prop, type] of Object.entries(schema)){
        const typeActualType = typeof type;
        const path = `${prefix}${prefix ? '.' : ''}${prop}`;
        if (typeActualType === 'object' && !Array.isArray(type)) {
            // Nested
            create(orama, sharedInternalDocumentStore, type, index, path);
            continue;
        }
        switch(type){
            case 'boolean':
            case 'boolean[]':
                index.indexes[path] = {
                    true: [],
                    false: []
                };
                break;
            case 'number':
            case 'number[]':
                index.indexes[path] = avlCreate(0, []);
                break;
            case 'string':
            case 'string[]':
                index.indexes[path] = radixCreate();
                index.avgFieldLength[path] = 0;
                index.frequencies[path] = {};
                index.tokenOccurrences[path] = {};
                index.fieldLengths[path] = {};
                break;
            default:
                throw createError('INVALID_SCHEMA_TYPE', Array.isArray(type) ? 'array' : type, path);
        }
        index.searchableProperties.push(path);
        index.searchablePropertiesWithTypes[path] = type;
    }
    return index;
}
async function insertScalar(implementation, index, prop, id, value, schemaType, language, tokenizer, docsCount) {
    const internalId = getInternalDocumentId(index.sharedInternalDocumentStore, id);
    switch(schemaType){
        case 'boolean':
            {
                const booleanIndex = index.indexes[prop];
                booleanIndex[value ? 'true' : 'false'].push(internalId);
                break;
            }
        case 'number':
            avlInsert(index.indexes[prop], value, [
                internalId
            ]);
            break;
        case 'string':
            {
                const tokens = await tokenizer.tokenize(value, language, prop);
                await implementation.insertDocumentScoreParameters(index, prop, internalId, tokens, docsCount);
                for (const token of tokens){
                    await implementation.insertTokenScoreParameters(index, prop, internalId, tokens, token);
                    radixInsert(index.indexes[prop], token, internalId);
                }
                break;
            }
    }
}
export async function insert(implementation, index, prop, id, value, schemaType, language, tokenizer, docsCount) {
    if (!isArrayType(schemaType)) {
        return insertScalar(implementation, index, prop, id, value, schemaType, language, tokenizer, docsCount);
    }
    const innerSchemaType = getInnerType(schemaType);
    const elements = value;
    const elementsLength = elements.length;
    for(let i = 0; i < elementsLength; i++){
        await insertScalar(implementation, index, prop, id, elements[i], innerSchemaType, language, tokenizer, docsCount);
    }
}
async function removeScalar(implementation, index, prop, id, value, schemaType, language, tokenizer, docsCount) {
    const internalId = getInternalDocumentId(index.sharedInternalDocumentStore, id);
    switch(schemaType){
        case 'number':
            {
                avlRemoveDocument(index.indexes[prop], internalId, value);
                return true;
            }
        case 'boolean':
            {
                const booleanKey = value ? 'true' : 'false';
                const position = index.indexes[prop][booleanKey].indexOf(internalId);
                index.indexes[prop][value ? 'true' : 'false'].splice(position, 1);
                return true;
            }
        case 'string':
            {
                const tokens = await tokenizer.tokenize(value, language, prop);
                await implementation.removeDocumentScoreParameters(index, prop, id, docsCount);
                for (const token of tokens){
                    await implementation.removeTokenScoreParameters(index, prop, token);
                    radixRemoveDocument(index.indexes[prop], token, internalId);
                }
                return true;
            }
    }
}
export async function remove(implementation, index, prop, id, value, schemaType, language, tokenizer, docsCount) {
    if (!isArrayType(schemaType)) {
        return removeScalar(implementation, index, prop, id, value, schemaType, language, tokenizer, docsCount);
    }
    const innerSchemaType = getInnerType(schemaType);
    const elements = value;
    const elementsLength = elements.length;
    for(let i = 0; i < elementsLength; i++){
        await removeScalar(implementation, index, prop, id, elements[i], innerSchemaType, language, tokenizer, docsCount);
    }
    return true;
}
export async function search(context, index, prop, term) {
    if (!(prop in index.tokenOccurrences)) {
        return [];
    }
    // Performa the search
    const rootNode = index.indexes[prop];
    const { exact , tolerance  } = context.params;
    const searchResult = radixFind(rootNode, {
        term,
        exact,
        tolerance
    });
    const ids = new Set();
    for(const key in searchResult){
        for (const id of searchResult[key]){
            ids.add(id);
        }
    }
    return context.index.calculateResultScores(context, index, prop, term, Array.from(ids));
}
export async function searchByWhereClause(context, index, filters) {
    const filterKeys = Object.keys(filters);
    const filtersMap = filterKeys.reduce((acc, key)=>({
            [key]: [],
            ...acc
        }), {});
    for (const param of filterKeys){
        const operation = filters[param];
        if (typeof operation === 'boolean') {
            const idx = index.indexes[param];
            if (typeof idx === 'undefined') {
                throw createError('UNKNOWN_FILTER_PROPERTY', param);
            }
            const filteredIDs = idx[operation.toString()];
            filtersMap[param].push(...filteredIDs);
            continue;
        }
        if (typeof operation === 'string' || Array.isArray(operation)) {
            const idx = index.indexes[param];
            if (typeof idx === 'undefined') {
                throw createError('UNKNOWN_FILTER_PROPERTY', param);
            }
            for (const raw of [
                operation
            ].flat()){
                const term = await context.tokenizer.tokenize(raw, context.language, param);
                const filteredIDsResults = radixFind(idx, {
                    term: term[0],
                    exact: true
                });
                filtersMap[param].push(...Object.values(filteredIDsResults).flat());
            }
            continue;
        }
        const operationKeys = Object.keys(operation);
        if (operationKeys.length > 1) {
            throw createError('INVALID_FILTER_OPERATION', operationKeys.length);
        }
        const operationOpt = operationKeys[0];
        const operationValue = operation[operationOpt];
        const AVLNode = index.indexes[param];
        if (typeof AVLNode === 'undefined') {
            throw createError('UNKNOWN_FILTER_PROPERTY', param);
        }
        switch(operationOpt){
            case 'gt':
                {
                    const filteredIDs = avlGreaterThan(AVLNode, operationValue, false);
                    filtersMap[param].push(...filteredIDs);
                    break;
                }
            case 'gte':
                {
                    const filteredIDs = avlGreaterThan(AVLNode, operationValue, true);
                    filtersMap[param].push(...filteredIDs);
                    break;
                }
            case 'lt':
                {
                    const filteredIDs = avlLessThan(AVLNode, operationValue, false);
                    filtersMap[param].push(...filteredIDs);
                    break;
                }
            case 'lte':
                {
                    const filteredIDs = avlLessThan(AVLNode, operationValue, true);
                    filtersMap[param].push(...filteredIDs);
                    break;
                }
            case 'eq':
                {
                    const filteredIDs = avlFind(AVLNode, operationValue) ?? [];
                    filtersMap[param].push(...filteredIDs);
                    break;
                }
            case 'between':
                {
                    const [min, max] = operationValue;
                    const filteredIDs = avlRangeSearch(AVLNode, min, max);
                    filtersMap[param].push(...filteredIDs);
                }
        }
    }
    // AND operation: calculate the intersection between all the IDs in filterMap
    const result = intersect(Object.values(filtersMap));
    return result;
}
export async function getSearchableProperties(index) {
    return index.searchableProperties;
}
export async function getSearchablePropertiesWithTypes(index) {
    return index.searchablePropertiesWithTypes;
}
function loadNode(node) {
    const convertedNode = radixCreate(node.end, node.subWord, node.key);
    convertedNode.docs = node.docs;
    convertedNode.word = node.word;
    for (const childrenKey of Object.keys(node.children)){
        convertedNode.children[childrenKey] = loadNode(node.children[childrenKey]);
    }
    return convertedNode;
}
export async function load(sharedInternalDocumentStore, raw) {
    const { indexes: rawIndexes , searchableProperties , searchablePropertiesWithTypes , frequencies , tokenOccurrences , avgFieldLength , fieldLengths  } = raw;
    const indexes = {};
    for (const prop of Object.keys(rawIndexes)){
        const value = rawIndexes[prop];
        if (!('word' in value)) {
            indexes[prop] = value;
            continue;
        }
        indexes[prop] = loadNode(value);
    }
    return {
        sharedInternalDocumentStore,
        indexes,
        searchableProperties,
        searchablePropertiesWithTypes,
        frequencies,
        tokenOccurrences,
        avgFieldLength,
        fieldLengths
    };
}
export async function save(index) {
    const { indexes , searchableProperties , searchablePropertiesWithTypes , frequencies , tokenOccurrences , avgFieldLength , fieldLengths  } = index;
    return {
        indexes,
        searchableProperties,
        searchablePropertiesWithTypes,
        frequencies,
        tokenOccurrences,
        avgFieldLength,
        fieldLengths
    };
}
export async function createIndex() {
    return {
        create,
        insert,
        remove,
        insertDocumentScoreParameters,
        insertTokenScoreParameters,
        removeDocumentScoreParameters,
        removeTokenScoreParameters,
        calculateResultScores,
        search,
        searchByWhereClause,
        getSearchableProperties,
        getSearchablePropertiesWithTypes,
        load,
        save
    };
}

//# sourceMappingURL=index.js.map