export type Node<K, V> = {
    key: K;
    value: V;
    left: Node<K, V> | null;
    right: Node<K, V> | null;
    height: number;
};
export declare function contains<K, V>(node: Node<K, V>, key: K): boolean;
export declare function getSize<K, V>(root: Node<K, V> | null): number;
export declare function isBalanced<K, V>(root: Node<K, V> | null): boolean;
export declare function rangeSearch<K, V>(node: Node<K, V>, min: K, max: K): V;
export declare function greaterThan<K, V>(node: Node<K, V>, key: K, inclusive?: boolean): V;
export declare function lessThan<K, V>(node: Node<K, V>, key: K, inclusive?: boolean): V;
export declare function create<K, V>(key: K, value: V): Node<K, V>;
export declare function insert<K, V>(root: Node<K, V>, key: K, value: V): Node<K, V>;
export declare function find<K, V>(root: Node<K, V>, key: K): V | null;
export declare function remove<K, V>(root: Node<K, V> | null, key: K): Node<K, V> | null;
export declare function removeDocument<K, V>(root: Node<K, V[]>, id: V, key: K): void;
