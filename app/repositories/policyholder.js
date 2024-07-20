class PolicyholderRepository {
    #mysql;

    constructor(mysql) {
        this.#mysql = mysql;
    }

    /**
     * @typedef {object} policyHolder
     * @property {int} policyHolder.Id
     * @property {string} policyHolder.Name
     * @property {date} policyHolder.CreateDate
     * @property {int} policyHolder.IntroducerId
     * */
    /**
     * 取得保戶資料（包含直接保戶與間接保戶）
     * @param {object} option
     * @param {int} option.id
     * @param {int} option.pageSize
     * @param {int} option.page
     * @returns {Promise<policyHolder[]>}
     */
    async getPolicyholderIncludeSubtree(option) {
        if (isNaN(option.id) || option.id === 0) {
            // code 不對
            return null;
        }
        const sql = `
            SELECT A.\`Id\`, A.\`Name\`, A.\`CreateDate\`, B.\`IntroducerId\`
            FROM Policyholder A
                     LEFT JOIN PolicyholderRelation B ON A.Id = B.PolicyholderId
            WHERE FIND_IN_SET(id, getChilds(?))
            ORDER BY A.\`Id\` ASC LIMIT ?
            OFFSET ?;
        `;
        const params = [option.id, option.pageSize, (option.page - 1) * option.pageSize];
        const source = await this.#mysql.execute(sql, params);
        return source[0];
    }

    /**
     * 取得介紹者的ID
     * @param {int} id 欲查詢的對象id
     * @return {Promise<int>} 介紹者的id
     * */
    async getIntroducerId(id) {
        const sql = ` SELECT IntroducerId FROM PolicyholderRelation WHERE PolicyholderId = ? `
        const source = await this.#mysql.execute(sql,[id]);
        return source[0];
    }
}

module.exports = PolicyholderRepository