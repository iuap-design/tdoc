var fs = require('fs');
var cpr = require('cpr');
var sysPath = require('path');
var colors = require('colors');
var watch = require('watch');
var through = require('through2');

var actions = require('./actions');
var loadConfig = require('./utils/loadConfig.js');

var templatePath = sysPath.join(__dirname, '../template');

function execTemplate(destPath, tplPath, callback) {
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
    }
    cpr(sysPath.join(tplPath, 'source'), sysPath.join(destPath, 'source'), {
        deleteFirst: true,
        overwrite: true,
        confirm: false
    }, function(err, files) {
        if (err) {
            console.log('X 资源拷贝失败！'.red);
        } else {
            var tplFilePath = sysPath.join(tplPath, 'template.html');
            if (fs.existsSync(tplFilePath)) {
                callback(fs.readFileSync(tplFilePath, 'utf-8'));
            } else {
                console.log('X 模板读取失败！'.red);
            }
        }
    });
}
function startTime(){
    var today=new Date()
    var h=today.getHours()
    var m=today.getMinutes()
    var s=today.getSeconds()
    h=checkTime(h)
    m=checkTime(m)
    s=checkTime(s)
    return '[' + h + ':' + m + ':' + s + ']';
}

var tdoc = module.exports = function(data) {
    data = data || {};
    return through.obj(function(file, enc, cb) {
        var cwd = file.cwd;
        loadConfig(cwd, function(conf) {
            tdoc.build(cwd, conf ? Object.assign(conf, data) : data);
            cb();
        });
    });
};

tdoc.actions = actions;

tdoc.init = actions.init;

tdoc.new = actions.new;

tdoc.build = function(cwd, conf, opt) {
    opt = opt || {};
    var template = opt.template || conf.template,
        rDest = opt.dest || conf.dest || '_docs',
        destPath = sysPath.join(cwd, rDest),
        tplPath = template ? sysPath.join(cwd, template) : templatePath,
        buildPages = opt.page;

    if (!buildPages || buildPages == true) {
        buildPages = [];
        try {
            require('child_process').execSync('rm -rf ' + destPath);
        } catch(e) {}
    } else {
        buildPages = buildPages.split(',').map(function(page) {
            return page.trim();
        });
    }

    conf.buildPages = buildPages;

    function build(content) {
        console.log('-> Building .......'.gray);
        actions.build(cwd, conf, content);
        console.log('√ Complete!'.green);
        console.log('');
    }

    execTemplate(destPath, tplPath, function(content) {
        conf.dest = destPath;
        conf.templateContent = content;
        build(content);
        if (opt.watch) {
            // console.log('√ Start Watching .......'.green);
            watch.watchTree(cwd, {
                ignoreDirectoryPattern: new RegExp(rDest)
            }, function(path) {
                var reg = /ydoc.json$|ydocfile.js$/gi;
                var reg_doc = new RegExp('.md');
                // 判断doc的配置文件是否变化，若变化则更新配置文件后构建文档
                if(reg.test(path)){
                    console.log((startTime()+'--> Reload Config ......').cyan);
                    loadConfig(cwd, function(cf) {
                        cf.buildPages = buildPages;
                        cf.dest = destPath;
                        cf.templateContent = content;
                        cf.codeTemplateContent = codeContent;
                        conf = cf;

                        build(content);
                    });
                }else if(reg_doc.test(path)){
                    console.log((startTime()+'--> Reload md ......').cyan);
                    build(content);
                }
            });
        }
    });
};
