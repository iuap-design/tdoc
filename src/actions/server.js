var fs = require('fs');
var path = require('path');
var JSON5 = require('json5');
var browsersync = require('browser-sync').create();

module.exports = function(cwd) {
    var dest = './_docs';
    var loadconfig = function(cwd) {
        var confPath = path.join(cwd, 'tdoc.config.json'),
            conf;
        if (fs.existsSync(confPath)) {
            try {
                conf = JSON5.parse(fs.readFileSync(confPath, 'utf-8'));
            } catch (e) {}
            return conf;
        } else {
            return conf;
        }
    }
    var config = loadconfig(cwd);
    if (config && config.dest) {
        dest = config.dest;
    }
    browsersync.init({
        port: 8001,
        startPath: dest+'/index.html',//默认打开的初始地址，可以不加
        server: {
            baseDir: './',
            directory: true
        }
    })
}

module.exports.usage = '启动服务';
