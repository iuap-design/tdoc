# TDoc

## 简介

前端工程文档生成工具

[![npm version](https://badge.fury.io/js/tdoc.svg)](http://badge.fury.io/js/tdoc)

![](https://nodei.co/npm/tdoc.png?downloads=true&downloadRank=true&stars=true)

## 安装

```
npm install tdoc [-g]
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
var tdoc = require("tdoc");

tdoc.build('/path/to/project', options);
```

### Gulp

```javascript
var tdoc = require("tdoc");

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
