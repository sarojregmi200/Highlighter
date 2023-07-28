import { DocumentID } from '../components/internal-document-id-store.js';
import { Orama } from '../types.js';
export declare function remove(orama: Orama, id: DocumentID, language?: string, skipHooks?: boolean): Promise<boolean>;
export declare function removeMultiple(orama: Orama, ids: DocumentID[], batchSize?: number, language?: string, skipHooks?: boolean): Promise<number>;
