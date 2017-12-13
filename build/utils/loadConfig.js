'use strict';

var fs = require('fs'),
    sysPath = require('path'),
    JSON5 = require('json5');

module.exports = function (cwd, callback) {
    var confPath = sysPath.join(cwd, 'tdoc.config.json'),
        conf;
    if (fs.existsSync(confPath)) {
        try {
            conf = JSON5.parse(fs.readFileSync(confPath, 'utf-8'));
        } catch (e) {}
        callback(conf);
    } else {
        callback(conf);
    }
};