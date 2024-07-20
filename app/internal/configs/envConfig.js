const dotenv = require('dotenv')

dotenv.config({path:'.env'})

module.exports = Object.freeze({
    mysql: {
        default: {
            master: {
                host: process.env.DEFAULT_DB_MASTER_HOST,
                port: process.env.DEFAULT_DB_MASTER_PORT,
                user: process.env.DEFAULT_DB_MASTER_USER,
                password: process.env.DEFAULT_DB_MASTER_PASSWORD,
                database: 'TestQ',
                connectionLimit: 10,
                multipleStatements: true,
                waitForConnections: true,
                queueLimit: 0
            },
            slave: {
                host: process.env.DEFAULT_DB_SLAVE_HOST,
                port: process.env.DEFAULT_DB_SLAVE_PORT,
                user: process.env.DEFAULT_DB_SLAVE_USER,
                password: process.env.DEFAULT_DB_SLAVE_PASSWORD,
                database: 'TestQ',
                connectionLimit: 10,
                multipleStatements: true,
                waitForConnections: true,
                queueLimit: 0
            }
        }
    }
});