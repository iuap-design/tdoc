var fs = require('fs');
var sysPath = require('path');
var inquirer = require('inquirer');

var configTPL = {
    name: "",
    common: "",
    pages: []
};
var mdOjbect = {
    'index.md': "# get start",
    'usage.md': "# 使用说明",
    'config.md': "# 配置中心"
};

module.exports = function(cwd, conf) {
    var confFilePath = sysPath.join(cwd, 'tdoc.config.json');

    inquirer.prompt([{
        type: 'input',
        name: 'dirName',
        message: '存放md文件夹的名称 :',
        default: function() {
            return 'doc';
        }
    }]).then(function(input) {
        var dir = sysPath.join(cwd, input.dirName);
        if (fs.existsSync(dir)) {
            console.log('X md文件夹已经存在!'.red);
        } else {
            fs.mkdirSync(dir);
            console.log('√ 创建' + input.dirName + '文件夹成功！'.green);
        }
        for (item in mdOjbect) {
            var filePath = dir + '/' + item;
            fs.writeFileSync(filePath, mdOjbect[item], 'UTF-8');
        }
        var data = fs.readFileSync(confFilePath, 'utf8');
        data = data.replace(/\/doc/g, '/'+input.dirName);
        if (fs.existsSync(confFilePath)) {
            console.log('X 配置文件已经存在!'.red);
            inquirer.prompt([{
                type: 'confirm',
                message: '是否覆盖原有配置 tdoc.config.json 文件?',
                name: 'ok'
            }]).then(function(res) {
                if (res.ok) {
                    fs.writeFileSync(confFilePath, data, 'UTF-8');
                    console.log('√ 覆盖原有 tdoc.config.json 成功！'.green);
                }
            });
        } else {
            fs.writeFileSync(confFilePath, data, 'UTF-8');
            console.log('√ 生成 tdoc.config.json 成功！'.green);
        }
    })
}
module.exports.usage = '创建测试文件';
