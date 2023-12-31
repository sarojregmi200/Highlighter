const BALANCE_STATE = {
    UNBALANCED_RIGHT: -2,
    SLIGHTLY_UNBALANCED_RIGHT: -1,
    BALANCED: 0,
    SLIGHTLY_UNBALANCED_LEFT: 1,
    UNBALANCED_LEFT: 2
};
function getHeight(node) {
    return node ? node.height : -1;
}
function rotateLeft(node) {
    const right = node.right;
    node.right = right.left;
    right.left = node;
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    right.height = Math.max(getHeight(right.left), getHeight(right.right)) + 1;
    return right;
}
function rotateRight(node) {
    const left = node.left;
    node.left = left.right;
    left.right = node;
    node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    left.height = Math.max(getHeight(left.left), getHeight(left.right)) + 1;
    return left;
}
export function contains(node, key) {
    return !!find(node, key);
}
export function getSize(root) {
    let size = 0;
    const queue = [];
    if (root !== null) {
        queue.push(root);
    }
    while(queue.length > 0){
        const node = queue.shift();
        size++;
        if (node.left !== null) {
            queue.push(node.left);
        }
        if (node.right !== null) {
            queue.push(node.right);
        }
    }
    return size;
}
export function isBalanced(root) {
    if (root === null) return true;
    const stack = [
        root
    ];
    while(stack.length > 0){
        const node = stack.pop();
        if (node === undefined) return true;
        const heightDiff = getHeight(node.left) - getHeight(node.right);
        if (heightDiff > 1 || heightDiff < -1) {
            return false;
        }
        if (node.right !== null) {
            stack.push(node.right);
        }
        if (node.left !== null) {
            stack.push(node.left);
        }
    }
    return true;
}
export function rangeSearch(node, min, max) {
    if (!node) {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = [];
    function traverse(node) {
        if (!node) {
            return;
        }
        if (node.key > min) {
            traverse(node.left);
        }
        if (node.key >= min && node.key <= max) {
            result.push(...node.value);
        }
        if (node.key < max) {
            traverse(node.right);
        }
    }
    traverse(node);
    return result;
}
export function greaterThan(node, key, inclusive = false) {
    if (!node) {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = [];
    function traverse(node) {
        if (!node) {
            return;
        }
        if (inclusive && node.key >= key) {
            result.push(...node.value);
        }
        if (!inclusive && node.key > key) {
            result.push(...node.value);
        }
        traverse(node.left);
        traverse(node.right);
    }
    traverse(node);
    return result;
}
export function lessThan(node, key, inclusive = false) {
    if (!node) {
        return [];
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = [];
    function traverse(node) {
        if (!node) {
            return;
        }
        if (inclusive && node.key <= key) {
            result.push(...node.value);
        }
        if (!inclusive && node.key < key) {
            result.push(...node.value);
        }
        traverse(node.left);
        traverse(node.right);
    }
    traverse(node);
    return result;
}
function getNodeByKey(node, key) {
    while(node !== null){
        if (key < node.key) {
            node = node.left;
        } else if (key > node.key) {
            node = node.right;
        } else {
            return node;
        }
    }
    return null;
}
export function create(key, value) {
    return {
        key,
        value,
        left: null,
        right: null,
        height: 0
    };
}
export function insert(root, key, value) {
    let parent = null;
    let current = root;
    while(current !== null){
        parent = current;
        if (key < current.key) {
            current = current.left;
        } else if (key > current.key) {
            current = current.right;
        } else {
            current.value = current.value.concat(value);
            return root;
        }
    }
    const newNode = create(key, value);
    if (!parent) {
        root = newNode // tree was empty
        ;
    } else if (key < parent.key) {
        parent.left = newNode;
    } else {
        parent.right = newNode;
    }
    current = newNode;
    while(parent){
        const balanceFactor = getHeight(parent.left) - getHeight(parent.right);
        if (balanceFactor === BALANCE_STATE.UNBALANCED_LEFT) {
            if (key > parent.left.key) {
                parent.left = rotateLeft(parent.left);
            }
            parent = rotateRight(parent);
        }
        if (balanceFactor === BALANCE_STATE.UNBALANCED_RIGHT) {
            if (key < parent.right.key) {
                parent.right = rotateRight(parent.right);
            }
            parent = rotateLeft(parent);
        }
        if (parent === root) {
            break;
        }
        current = parent;
        parent = getNodeParent(root, current.key);
    }
    return root;
}
function getNodeParent(root, key) {
    let current = root;
    let parent = null;
    while(current !== null){
        if (key < current.key) {
            parent = current;
            current = current.left;
        } else if (key > current.key) {
            parent = current;
            current = current.right;
        } else {
            break;
        }
    }
    return parent;
}
export function find(root, key) {
    const node = getNodeByKey(root, key);
    if (!node) {
        return null;
    }
    return node.value;
}
export function remove(root, key) {
    let node = root;
    let parentNode = null;
    while(node && node.key !== key){
        parentNode = node;
        if (key < node.key) {
            node = node.left;
        } else {
            node = node.right;
        }
    }
    if (!node) {
        return null;
    }
    if (!node.left && !node.right) {
        if (!parentNode) {
            // Node to be deleted is root
            root = null;
        } else {
            if (parentNode.left === node) {
                parentNode.left = null;
            } else {
                parentNode.right = null;
            }
        }
    } else if (node.left && node.right) {
        let minValueNode = node.right;
        let minValueParent = node;
        while(minValueNode.left){
            minValueParent = minValueNode;
            minValueNode = minValueNode.left;
        }
        node.key = minValueNode.key;
        if (minValueParent === node) {
            minValueParent.right = minValueNode.right;
        } else {
            minValueParent.left = minValueNode.right;
        }
    } else {
        const childNode = node.left ? node.left : node.right;
        if (!parentNode) {
            root = childNode;
        } else {
            if (parentNode.left === node) {
                parentNode.left = childNode;
            } else {
                parentNode.right = childNode;
            }
        }
    }
    return root;
}
export function removeDocument(root, id, key) {
    const node = getNodeByKey(root, key);
    if (node.value.length === 1) {
        remove(root, key);
        return;
    }
    node.value.splice(node.value.indexOf(id), 1);
}

//# sourceMappingURL=avl.js.map