const {PolicyholderBinaryTree} = require("./models/policyholder");
class PolicyholderService {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    /**
     *
     * */
    async getPolicyholderIncludeSubtree(id) {
        if (!id) {
            throw new Error('id cannot be null or empty.')
        } else if (isNaN(id) || id === 0) {
            throw new Error('id should be a integer number and must be gather than 0.')
        }

        const source = await this.#repository.getPolicyholderIncludeSubtree({
            id: id,
            pageSize: Math.pow(2, 4) - 1, page: 1
        });

        if (!source || source.length === 0) {
            //404
            return null;
        }

        const tree = new PolicyholderBinaryTree();

        for (const data of source) {
            tree.insert(data.Id, data.Name, data.CreateDate, data.IntroducerId);
        }
        return tree.toPolicyholderResult();
    }

    async getIntroducerIncludeSubtree(id) {
        if (!id) {
            throw new Error('id cannot be null or empty.')
        } else if (isNaN(id) || id === 0) {
            throw new Error('id should be a integer number and must be gather than 0.')
        }

        const source = await this.#repository.getIntroducerId(id);

        if (!source || source.length ===0) {
            return null;
        }

        const introducerId = source[0].IntroducerId;

        return await this.getPolicyholderIncludeSubtree(introducerId)
    }
}

module.exports = PolicyholderService;