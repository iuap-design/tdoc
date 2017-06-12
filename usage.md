## 安装

从 NPM 中安装

> npm install tdoc -g

[![npm version](https://badge.fury.io/js/tdoc.svg)](http://badge.fury.io/js/tdoc)

![](https://nodei.co/npm/tdoc.png?downloads=true&downloadRank=true&stars=true)

## 构建命令

> tdoc build [-t templatePath] [-p page] [-w] [-o dest]

读取配置，构建文档

* `-w|--watch`: 监听变化自动构建
* `-t|--template`: 参数为自定义模板路径
* `-o|--output`: 输出目录
* `-p|--page`: 指定编译某页，默认编译所有。（多个页面名可以逗号分开，例 -p index,demo）

## 初始化命令

> tdoc init [-t templatePath]

初始项目，创建配置文件或自定义模板(-t)

* `-t|--template`: 参数为自定义模板路径
