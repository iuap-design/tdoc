var Koa = require('koa');
var fs = require('fs');
var path = require('path');
var logger = require('koa-logger');
var serve = require('koa-static');
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
                console.log(conf);
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
    // var app = new Koa();
    //
    // app.use(async (ctx, next) => {
    //     if (ctx.request.url === '/') {
    //         console.log(cwd);
    //         console.log(path.resolve(cwd, dest + '/index.html'));
    //         ctx.redirect(dest + '/index.html');
    //     } else {
    //         await next();
    //     }
    // });
    //
    // app.use(logger());
    // app.use(serve(cwd));
    //
    // app.listen(8001);
    //
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
