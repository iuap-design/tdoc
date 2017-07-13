## 简介

前端工程文档生成工具，方便开发者通过md文档能快速构建出系统完整的文档页面。

[![npm version](https://badge.fury.io/js/tdoc-cli.svg)](http://badge.fury.io/js/tdoc-cli)

![](https://nodei.co/npm/tdoc-cli.png?downloads=true&downloadRank=true&stars=true)

## 安装

```
npm install tdoc-cli [-g]
```

## 使用方式

- ```cd /path/to/project/ ```  进入项目目录
- ```tdoc init ```  初始化tdoc配置文件，编写配置文件tdoc.config (配置及配置文件请查看 [配置说明](./doc/config.md))
- ```tdoc build ```  构建文档
- ```tdoc server ``` 启动服务，访问文档页面效果

详细请查看[命令使用方式说明](./doc/usage.md)。

## 使用其他方式

1. 使用脚本：

   ```javascript
   var ydoc = require("ydoc");

   ydoc.build('/path/to/project', options);
   ```

2. 使用Gulp：

   ```javascript
   var ydoc = require("ydoc");

   gulp.task('ydoc', function() {
       return gulp.src('./')
           .pipe(ydoc({
               // 配置
           }));
   });
   ```


## ToDo

- [x] 可以init出一个完整简单示例，方便用户能迅速入门
- [x] 要能结合gulp和browsersync
- [x] 能够起本地server服务预览
