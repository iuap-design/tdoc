var tdoc = require('./tdoc.js');

var colors = require('colors');
var fs = require('fs');
var sysPath = require('path');
var JSON5 = require('json5');
var optimist = require('optimist');
var loadConfig = require('./utils/loadConfig.js');
var packageJSON = require('../package.json');

//显示版本信息
function helpTitle() {
    console.info('');
    console.info('===================== tdoc ' + packageJSON.version + ' ====================');
    console.info('');
}

//对其空格文字
function fixempty(str, limit) {
    var i, n = limit - str.length;
    if (n < 0) {
        n = 0;
    }
    return str + ((function() {
        var _i, _results = [];
        for (i = _i = 0; 0 <= n ? _i <= n : _i >= n; i = 0 <= n ? ++_i : --_i) {
            _results.push(" ");
        }
        return _results;
    })()).join('');
};

var cli = module.exports = {
    run: function(cmd) {
        var cwd = process.cwd(),
            argv = optimist.argv;
        if (tdoc[cmd]) {
            if (argv.h || argv.help) {
                helpTitle();
                console.info('');
                console.info('命令：', cmd);
                console.info('说明：', tdoc.actions[cmd].usage);
                console.info('');
                if (tdoc.actions[cmd].setOptions) {
                    tdoc.actions[cmd].setOptions(optimist);
                }
                optimist.showHelp();
            } else if (cmd == 'build') {
                loadConfig(cwd, function(conf) {
                    if (conf) {
                        tdoc.build(cwd, conf, {
                            watch: argv.w || argv.watch,
                            template: argv.t || argv.template,
                            dest: argv.o || argv.output,
                            page: argv.p || argv.page
                        });
                    } else {
                        console.log('配置文件读取失败！'.red);
                    }
                })
            } else if (cmd == 'init') {
                tdoc.init(cwd, {
                    template: argv.t || argv.template
                });
            } else if (cmd == 'new' ) {
                tdoc.new(cwd);
            } else if (cmd == 'server') {
                tdoc.server(cwd);
            }

        } else {
            console.log('X 命令不存在！'.red);
        }
    },
    help: function() {
        helpTitle();
        for (var key in tdoc.actions) {
            console.info(' ' + (fixempty(key, 15)) + ' # ' + (tdoc.actions[key].usage || ''));
        }
        console.info('');
        console.info(' 如果需要帮助, 请使用 tdoc {命令名} --help ');
    }
};
