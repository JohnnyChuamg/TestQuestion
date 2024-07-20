const MySqlProvider = require('./provider');
const MySqlConfig = require('./config');
class MySqlPool {
    #keys=[];
    #logger;

    constructor(logger) {
        this.#logger = logger ?? console
    }

    add(name,setting) {
        if (!name) {
            throw new Error('Cannot add sql by setting: name cannot be null or empty');
        }

        const lowerCaseName = name.toLowerCase();
        const keyExists = this.#keys.findIndex(element => element.lowerCaseName === lowerCaseName);
        if (keyExists > -1) {
            throw new Error(`cannot add sql by setting: name [${name}] is already exists`);
        }

        this[name] = new MySqlProvider(convertToMySqlConfig(setting.master), convertToMySqlConfig(setting.slave), this.#logger);
        this.#keys.push({name: name, lowerCaseName});
    }

    async execute(sql, params, options = {disableLogging: false}) {
        const provider = this['default'] ?? this[(this.keys())[0]];
        if (provider) {
            return await provider.execute(sql, params, options);
        }
    }

    keys() {
        return this.#keys.map(element => element.name);
    }
}

function convertToMySqlConfig (config) {
    return new MySqlConfig(config.user, config.password, config.host, config.port, config.database, config.multipleStatements, config.waitForConnections, config.connections, config.queueLimit);
}

module.exports = MySqlPool;