import { runMultipleHook, runSingleHook } from '../components/hooks.js';
import { getDocumentIdFromInternalId, getInternalDocumentId } from '../components/internal-document-id-store.js';
import { trackRemoval } from '../components/sync-blocking-checker.js';
export async function remove(orama, id, language, skipHooks) {
    let result = true;
    const { index , docs  } = orama.data;
    const doc = await orama.documentsStore.get(docs, id);
    if (!doc) {
        return false;
    }
    const docId = getDocumentIdFromInternalId(orama.internalDocumentIDStore, getInternalDocumentId(orama.internalDocumentIDStore, id));
    const docsCount = await orama.documentsStore.count(docs);
    if (!skipHooks) {
        await runSingleHook(orama.beforeRemove, orama, docId);
    }
    const indexableProperties = await orama.index.getSearchableProperties(index);
    const indexablePropertiesWithTypes = await orama.index.getSearchablePropertiesWithTypes(index);
    const values = await orama.getDocumentProperties(doc, indexableProperties);
    for (const prop of indexableProperties){
        var _orama_index, _orama_index_beforeRemove, _orama_index1, _orama_index_afterRemove;
        const value = values[prop];
        // The document doesn't contain the key
        if (typeof value === 'undefined') {
            continue;
        }
        const schemaType = indexablePropertiesWithTypes[prop];
        await ((_orama_index_beforeRemove = (_orama_index = orama.index).beforeRemove) === null || _orama_index_beforeRemove === void 0 ? void 0 : _orama_index_beforeRemove.call(_orama_index, orama.data.index, prop, docId, value, schemaType, language, orama.tokenizer, docsCount));
        if (!await orama.index.remove(orama.index, orama.data.index, prop, id, value, schemaType, language, orama.tokenizer, docsCount)) {
            result = false;
        }
        await ((_orama_index_afterRemove = (_orama_index1 = orama.index).afterRemove) === null || _orama_index_afterRemove === void 0 ? void 0 : _orama_index_afterRemove.call(_orama_index1, orama.data.index, prop, docId, value, schemaType, language, orama.tokenizer, docsCount));
    }
    const sortableProperties = await orama.sorter.getSortableProperties(orama.data.sorting);
    const sortableValues = await orama.getDocumentProperties(doc, sortableProperties);
    for (const prop of sortableProperties){
        // The document doesn't contain the key
        if (typeof sortableValues[prop] === 'undefined') {
            continue;
        }
        await orama.sorter.remove(orama.data.sorting, prop, id);
    }
    if (!skipHooks) {
        await runSingleHook(orama.afterRemove, orama, docId);
    }
    await orama.documentsStore.remove(orama.data.docs, id);
    trackRemoval(orama);
    return result;
}
export async function removeMultiple(orama, ids, batchSize, language, skipHooks) {
    let result = 0;
    if (!batchSize) {
        batchSize = 1000;
    }
    const docIdsForHooks = skipHooks ? [] : ids.map((id)=>getDocumentIdFromInternalId(orama.internalDocumentIDStore, getInternalDocumentId(orama.internalDocumentIDStore, id)));
    if (!skipHooks) {
        await runMultipleHook(orama.beforeMultipleRemove, orama, docIdsForHooks);
    }
    await new Promise((resolve, reject)=>{
        let i = 0;
        async function _insertMultiple() {
            const batch = ids.slice(i * batchSize, (i + 1) * batchSize);
            i++;
            if (!batch.length) {
                return resolve();
            }
            for (const doc of batch){
                try {
                    if (await remove(orama, doc, language, skipHooks)) {
                        result++;
                    }
                } catch (err) {
                    reject(err);
                }
            }
            setTimeout(_insertMultiple, 0);
        }
        setTimeout(_insertMultiple, 0);
    });
    if (!skipHooks) {
        await runMultipleHook(orama.afterMultipleRemove, orama, docIdsForHooks);
    }
    return result;
}

//# sourceMappingURL=remove.js.map