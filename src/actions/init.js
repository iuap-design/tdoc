var fs = require('fs');
var sysPath = require('path');
var cpr = require('cpr');

var configTPL = {
    name: "",
    common: "",
    pages: []
};

module.exports = function(cwd, conf) {
    if (conf.template) {
        if (conf.template == true) {
            console.log('X 参数为路径!'.red);
        } else {
            cpr(sysPath.join(__dirname, '../../template'), sysPath.join(cwd, conf.template), {
                deleteFirst: true,
                overwrite: true,
                confirm: false
            }, function(err, files) {
                if (err) {
                    console.log('X 资源拷贝失败！'.red);
                } else {
                    console.log('√ 初始化自定义模板成功！'.green);
                }
            });
        }
    } else {
        var confFilePath = sysPath.join(cwd, 'tdoc.config.json');
        if (fs.existsSync(confFilePath)) {
            console.log('X 配置文件已经存在!'.red);
        } else {
            fs.writeFileSync(confFilePath, JSON.stringify(configTPL, {}, 4), 'UTF-8');
            console.log('√ 生成 tdoc.config.json 成功！'.green);
            console.log('√ 如想快速上手！可以查看配置说明，地址：https://github.com/iuap-design/tdoc/blob/master/doc/config.md#配置内容'.green);
        }
    }
}

module.exports.usage = '初始化配置文件';

module.exports.setOptions = function(optimist) {
    optimist.alias('t', 'template');
    optimist.describe('t', '初始化自定义模板');
};
