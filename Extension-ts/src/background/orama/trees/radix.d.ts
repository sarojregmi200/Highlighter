import { InternalDocumentID } from '../components/internal-document-id-store.js';
export declare class Node {
    constructor(key: string, subWord: string, end: boolean);
    key: string;
    subWord: string;
    children: Record<string, Node>;
    docs: InternalDocumentID[];
    end: boolean;
    word: string;
    toJSON(): object;
}
type FindParams = {
    term: string;
    exact?: boolean;
    tolerance?: number;
};
type FindResult = Record<string, InternalDocumentID[]>;
export declare function create(end?: boolean, subWord?: string, key?: string): Node;
export declare function insert(root: Node, word: string, docId: InternalDocumentID): void;
export declare function find(root: Node, { term, exact, tolerance }: FindParams): FindResult;
export declare function contains(root: Node, term: string): boolean;
export declare function removeWord(root: Node, term: string): boolean;
export declare function removeDocumentByWord(root: Node, term: string, docID: InternalDocumentID, exact?: boolean): boolean;
export {};
