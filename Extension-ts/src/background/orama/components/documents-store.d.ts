import { DocumentID, InternalDocumentID, InternalDocumentIDStore } from './internal-document-id-store.js';
import { Document, IDocumentsStore, OpaqueDocumentStore, Orama } from '../types.js';
export interface DocumentsStore extends OpaqueDocumentStore {
    sharedInternalDocumentStore: InternalDocumentIDStore;
    docs: Record<InternalDocumentID, Document | undefined>;
    count: number;
}
export type DefaultDocumentsStore = IDocumentsStore<DocumentsStore>;
export declare function create(_: Orama, sharedInternalDocumentStore: InternalDocumentIDStore): Promise<DocumentsStore>;
export declare function get(store: DocumentsStore, id: DocumentID): Promise<Document | undefined>;
export declare function getMultiple(store: DocumentsStore, ids: DocumentID[]): Promise<(Document | undefined)[]>;
export declare function getAll(store: DocumentsStore): Promise<Record<InternalDocumentID, Document>>;
export declare function store(store: DocumentsStore, id: DocumentID, doc: Document): Promise<boolean>;
export declare function remove(store: DocumentsStore, id: DocumentID): Promise<boolean>;
export declare function count(store: DocumentsStore): Promise<number>;
export declare function load<R = unknown>(sharedInternalDocumentStore: InternalDocumentIDStore, raw: R): Promise<DocumentsStore>;
export declare function save<R = unknown>(store: DocumentsStore): Promise<R>;
export declare function createDocumentsStore(): Promise<DefaultDocumentsStore>;
