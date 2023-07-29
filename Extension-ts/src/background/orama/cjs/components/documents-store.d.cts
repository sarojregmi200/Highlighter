import { create as esmCreate, get as esmGet, getMultiple as esmGetMultiple, store as esmStore, remove as esmRemove, count as esmCount, load as esmLoad, save as esmSave, createDocumentsStore as esmCreateDocumentsStore } from '../../components/documents-store.js';
export declare function create(...args: Parameters<typeof esmCreate>): ReturnType<typeof esmCreate>;
export declare function get(...args: Parameters<typeof esmGet>): ReturnType<typeof esmGet>;
export declare function getMultiple(...args: Parameters<typeof esmGetMultiple>): ReturnType<typeof esmGetMultiple>;
export declare function store(...args: Parameters<typeof esmStore>): ReturnType<typeof esmStore>;
export declare function remove(...args: Parameters<typeof esmRemove>): ReturnType<typeof esmRemove>;
export declare function count(...args: Parameters<typeof esmCount>): ReturnType<typeof esmCount>;
export declare function load(...args: Parameters<typeof esmLoad>): ReturnType<typeof esmLoad>;
export declare function save(...args: Parameters<typeof esmSave>): ReturnType<typeof esmSave>;
export declare function createDocumentsStore(...args: Parameters<typeof esmCreateDocumentsStore>): ReturnType<typeof esmCreateDocumentsStore>;