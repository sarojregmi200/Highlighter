import { Node as AVLNode } from '../trees/avl.js';
import { Node as RadixNode } from '../trees/radix.js';
import { ComparisonOperator, IIndex, OpaqueDocumentStore, OpaqueIndex, Orama, Schema, SearchableType, SearchableValue, SearchContext, Tokenizer, TokenScore } from '../types.js';
import { DocumentID, InternalDocumentID, InternalDocumentIDStore } from './internal-document-id-store.js';
export type FrequencyMap = {
    [property: string]: {
        [documentID: InternalDocumentID]: {
            [token: string]: number;
        } | undefined;
    };
};
export type BooleanIndex = {
    true: InternalDocumentID[];
    false: InternalDocumentID[];
};
export interface Index extends OpaqueIndex {
    sharedInternalDocumentStore: InternalDocumentIDStore;
    indexes: Record<string, RadixNode | AVLNode<number, InternalDocumentID[]> | BooleanIndex>;
    searchableProperties: string[];
    searchablePropertiesWithTypes: Record<string, SearchableType>;
    frequencies: FrequencyMap;
    tokenOccurrences: Record<string, Record<string, number>>;
    avgFieldLength: Record<string, number>;
    fieldLengths: Record<string, Record<InternalDocumentID, number | undefined>>;
}
export type DefaultIndex = IIndex<Index>;
export declare function insertDocumentScoreParameters(index: Index, prop: string, id: DocumentID, tokens: string[], docsCount: number): Promise<void>;
export declare function insertTokenScoreParameters(index: Index, prop: string, id: DocumentID, tokens: string[], token: string): Promise<void>;
export declare function removeDocumentScoreParameters(index: Index, prop: string, id: DocumentID, docsCount: number): Promise<void>;
export declare function removeTokenScoreParameters(index: Index, prop: string, token: string): Promise<void>;
export declare function calculateResultScores<I extends OpaqueIndex, D extends OpaqueDocumentStore, AggValue>(context: SearchContext<I, D, AggValue>, index: Index, prop: string, term: string, ids: DocumentID[]): Promise<TokenScore[]>;
export declare function create(orama: Orama<{
    Index: DefaultIndex;
}>, sharedInternalDocumentStore: InternalDocumentIDStore, schema: Schema, index?: Index, prefix?: string): Promise<Index>;
export declare function insert(implementation: DefaultIndex, index: Index, prop: string, id: DocumentID, value: SearchableValue, schemaType: SearchableType, language: string | undefined, tokenizer: Tokenizer, docsCount: number): Promise<void>;
export declare function remove(implementation: DefaultIndex, index: Index, prop: string, id: DocumentID, value: SearchableValue, schemaType: SearchableType, language: string | undefined, tokenizer: Tokenizer, docsCount: number): Promise<boolean>;
export declare function search<D extends OpaqueDocumentStore, AggValue>(context: SearchContext<Index, D, AggValue>, index: Index, prop: string, term: string): Promise<TokenScore[]>;
export declare function searchByWhereClause<I extends OpaqueIndex, D extends OpaqueDocumentStore, AggValue>(context: SearchContext<I, D, AggValue>, index: Index, filters: Record<string, boolean | ComparisonOperator>): Promise<number[]>;
export declare function getSearchableProperties(index: Index): Promise<string[]>;
export declare function getSearchablePropertiesWithTypes(index: Index): Promise<Record<string, SearchableType>>;
export declare function load<R = unknown>(sharedInternalDocumentStore: InternalDocumentIDStore, raw: R): Promise<Index>;
export declare function save<R = unknown>(index: Index): Promise<R>;
export declare function createIndex(): Promise<DefaultIndex>;
