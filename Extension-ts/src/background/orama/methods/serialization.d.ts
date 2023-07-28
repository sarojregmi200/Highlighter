import { Orama } from '../types.js';
export interface RawData {
    internalDocumentIDStore: unknown;
    index: unknown;
    docs: unknown;
    sorting: unknown;
}
export declare function load(orama: Orama, raw: RawData): Promise<void>;
export declare function save(orama: Orama): Promise<RawData>;
