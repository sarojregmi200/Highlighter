export async function load(orama, raw) {
    orama.internalDocumentIDStore.load(orama, raw.internalDocumentIDStore);
    orama.data.index = await orama.index.load(orama.internalDocumentIDStore, raw.index);
    orama.data.docs = await orama.documentsStore.load(orama.internalDocumentIDStore, raw.docs);
    orama.data.sorting = await orama.sorter.load(orama.internalDocumentIDStore, raw.sorting);
}
export async function save(orama) {
    return {
        internalDocumentIDStore: orama.internalDocumentIDStore.save(orama.internalDocumentIDStore),
        index: await orama.index.save(orama.data.index),
        docs: await orama.documentsStore.save(orama.data.docs),
        sorting: await orama.sorter.save(orama.data.sorting)
    };
}

//# sourceMappingURL=serialization.js.map