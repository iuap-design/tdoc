# TDoc

## 简介

前端工程文档生成工具

[![npm version](https://badge.fury.io/js/tdoc-cli.svg)](http://badge.fury.io/js/tdoc-cli)

![](https://nodei.co/npm/tdoc-cli.png?downloads=true&downloadRank=true&stars=true)

## 安装

```
npm install tdoc-cli [-g]
```

## 使用方式

### 命令

```
cd /path/to/project/
tdoc build
```

详细请查看[命令使用说明](./usage.md)。

### 脚本

```javascript
var tdoc = require("tdoc-cli");

tdoc.build('/path/to/project', options);
```

### Gulp

```javascript
var tdoc = require("tdoc-cli");

gulp.task('tdoc', function() {
    return gulp.src('./')
        .pipe(tdoc({
            // 配置
        }));
});
```

### Grunt

```javascript
grunt.initConfig({
    tdoc: {
        // 配置
    }
});

grunt.loadNpmTasks('tdoc');
```

配置及配置文件请查看 [配置说明](./config.md);
