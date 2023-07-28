import { AfterSearch, Document, MultipleCallbackComponent, Orama, ProvidedTypes, Results, SearchParams, SingleCallbackComponent } from '../types.js';
export declare const OBJECT_COMPONENTS: string[];
export declare const FUNCTION_COMPONENTS: string[];
export declare const SINGLE_OR_ARRAY_COMPONENTS: string[];
export declare function runSingleHook<P extends ProvidedTypes>(hooks: SingleCallbackComponent<P>[], orama: Orama<P>, id: string, doc?: Document): Promise<void>;
export declare function runMultipleHook<P extends ProvidedTypes>(hooks: MultipleCallbackComponent<P>[], orama: Orama<P>, docsOrIds: Document[] | string[]): Promise<void>;
export declare function runAfterSearch<P extends ProvidedTypes, AggValue>(hooks: AfterSearch<P>[], db: Orama<P>, params: SearchParams<AggValue>, language: string | undefined, results: Results<AggValue>): Promise<void>;
