class Policyholder {
    code;
    name;
    registration_date;
    introducer_code;
    constructor(id, name, createDate, introducerId) {
        this.code = id.toString().padStart(8, '0');
        this.name = name;
        this.registration_date = createDate;
        this.introducer_code = introducerId?.toString()?.padStart(8, '0') ?? null
    }
}

class PolicyholderBinaryTree {
    constructor() {
        this.root = null;
    }

    insert(id, name, createDate, introducerId) {
        const newNode = new Policyholder(id, name, createDate, introducerId)
        if (!this.root) {
            this.root = newNode;
            return;
        }
        let queue = [this.root];
        while (queue.length) {
            let currentNode = queue.shift();

            if (!currentNode.left) {
                currentNode.left = newNode;
                return;
            } else {
                queue.push(currentNode.left);
            }

            if (!currentNode.right) {
                currentNode.right = newNode;
                return;
            } else {
                queue.push(currentNode.right);
            }
        }
    }

    #inorder(node, array, options) {
        if (node) {
            array.push({
                code: node.code,
                name: node.name,
                registration_date: node.registration_date,
                introducer_code: node.introducer_code,
                level: options.level,
                type: options.type
            });
            options.level += 1;
            this.#inorder(node.left, array, {level: options.level, type: 'l'});
            this.#inorder(node.right, array, {level: options.level, type: 'r'});
        }
    }

    /**
     * 遍歷左樹
     * */
    #getLeftSubtreeArray() {
        let leftSubtreeArray = [];
        if (this.root && this.root.left) {
            this.#inorder(this.root.left, leftSubtreeArray, {level: 1, type: 'l'});
        }
        return leftSubtreeArray;
    }

    /**
     * 遍歷右樹
     * */
    #getRightSubtreeArray() {
        let rightSubtreeArray = [];
        if (this.root && this.root.right) {
            this.#inorder(this.root.right, rightSubtreeArray, {level: 1, type: 'r'});
        }
        return rightSubtreeArray;
    }

    toPolicyholderResult() {
        return {
            code: this.root.code,
            name: this.root.name,
            introducer_code: this.root.introducer_code,
            registration_date: this.root.registration_date,
            l: this.#getLeftSubtreeArray().sort((s, n) => s.level - n.level),
            r: this.#getRightSubtreeArray().sort((s, n) => s.level - n.level)
        }
    }
}

module.exports = {Policyholder, PolicyholderBinaryTree};