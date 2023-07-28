import { ISorter, OpaqueSorter, SortType } from '../types.js';
import { InternalDocumentID, InternalDocumentIDStore } from './internal-document-id-store.js';
interface PropertySort<K> {
    docs: Map<InternalDocumentID, number>;
    orderedDocs: [InternalDocumentID, K][];
    orderedDocsToRemove: Map<InternalDocumentID, boolean>;
    type: SortType;
}
export interface Sorter extends OpaqueSorter {
    sharedInternalDocumentStore: InternalDocumentIDStore;
    isSorted: boolean;
    language: string;
    enabled: boolean;
    sortableProperties: string[];
    sortablePropertiesWithTypes: Record<string, SortType>;
    sorts: Record<string, PropertySort<number | string | boolean>>;
}
export type DefaultSorter = ISorter<Sorter>;
export declare function load<R = unknown>(sharedInternalDocumentStore: InternalDocumentIDStore, raw: R): Promise<Sorter>;
export declare function save<R = unknown>(sorter: Sorter): Promise<R>;
export declare function createSorter(): Promise<DefaultSorter>;
export {};
