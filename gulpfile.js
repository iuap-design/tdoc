var gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    sysPath = require('path'),
    fs = require('fs'),
    JSON5 = require('json5');

var path={};
path.html = './_docs';
var loadconfig = function(cwd){
    var confPath = sysPath.join(cwd, 'tdoc.config'),
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
var config = loadconfig(process.cwd());
if(config&&config.dest){
    path.html = config.dest;
}

/* 起服务，并监听各个资源，一旦有改动，就自动刷新页面 */
gulp.task('live', function() {
    browsersync.init({
        port: 3333,
        startPath: path.html+'/index.html',//默认打开的初始地址，可以不加
        server: {
            baseDir: './',
            directory: true
        }
    })
    gulp.watch(path.html).on('change', browsersync.reload)
})

//启动服务
gulp.task('default', ['live']);
