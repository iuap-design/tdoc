var fs = require('fs'),
    sysPath = require('path'),
    JSON5 = require('json5');

module.exports = function(cwd, callback) {
    var confPath = sysPath.join(cwd, 'tdoc.config'),
        confJSPath = sysPath.join(cwd, 'tdocfile.js'),
        conf;
    if (fs.existsSync(confPath)) {
        try {
            conf = JSON5.parse(fs.readFileSync(confPath, 'utf-8'));
        } catch (e) {}
        callback(conf);
    } else if (fs.existsSync(confJSPath)) {
        if (require.cache[confJSPath]) {
            delete require.cache[confJSPath];
        }
        var tdocfile = require(confJSPath);
        if (typeof tdocfile == 'function') {
            if (tdocfile.length == 1) {
                tdocfile(callback);
            } else {
                callback(tdocfile());
            }
        } else {
            callback(tdocfile);
        }
    } else {
        callback(conf);
    }
};
