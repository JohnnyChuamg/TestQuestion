const fs = require('fs');
const pathHelper = require('path');
const express = require('express');
require('express-async-errors');
const host = new (require('../infras/extensions/expressHost'))('api',console);
// host.configuration('./configs');
host.configuration(pathHelper.join(__dirname,'internal','configs'))
    .addMySql(addMySql(host?.configs?.envConfig?.mysql))
    .addPipelines(
    [
        express.json({limit:'1024mb'}),
        (require('cors'))(),
        express.urlencoded({limit:'1024mb',extended:true}),
        (require('cookie-parser'))(),
        (require('compression'))()
    ])
    .set('trust proxy', 1)
    .addRoutes(scanRoutes('',pathHelper.join(pathHelper.resolve(__dirname), 'routes')))
    .build(async host=> {
        host.use(express.static(pathHelper.join(__dirname, 'public')))
            .set('views', pathHelper.join(__dirname, 'views'))
            .set('view engine', 'ejs')
            .set('case sensitive routing', true)
    })
;
function scanRoutes (prefix,filePath) {
    let result = [];
    fs.readdirSync(filePath, {withFileTypes: true}).map(file => {
        if (file.isDirectory()) {
            result = result.concat(scanRoutes(`${prefix}/${file.name}`, pathHelper.join(filePath, file.name)))
        } else if (file.name.endsWith('.js')) {
            result.push({
                area: `${prefix}/${pathHelper.parse(file.name).name}`,
                source: `${filePath}/${file.name}`
            })
        }
    });
    return result;
}

function addMySql(configs) {
    if (!configs) {
        throw new Error('add mysql service failed. configs cannot be null or empty ')
    }
    const Pool = require('../infras/providers/mysql/pool');
    const pool = new Pool(console);

    for (const key of Object.keys(configs)) {
        pool.add(key, configs[key])
    }
    return pool;
}
module.exports = host;