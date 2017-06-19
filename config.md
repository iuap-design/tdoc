## 配置文件

配置文件以 `tdoc.config` 的形式出现。

### 文件形式

`tdoc.config` 的内容是 `JSON`，支持注释。

示例：

```
{
    "name": "tdoc",
     ...
}
```

## 配置内容

### 整体配置说明

示例:

```json
{
    "name": "tdoc",
    "dest": "path/to/destination", // 默认为  "_docs"
    "examplePath": "./examples", // 示例代码路径 默认 "./"
    "template": "path/to/templte", // 默认使用 tdoc 内置的模板
    "options": { // 通用编译器配置
        "markdwon": { // 对于 markdown 编译器进行统一配置
            "memuLevel": 2
        }
    },
    "common": { // 通用配置，包括主页配置等
        "title": "tdoc",
        "footer": "Made By YMFE Team. © 2014 - 2016",
        "home": "YMFE",
        "homeUrl": "http://tinper.org/",
        "navbars": [{ // 导航栏配置
            "name": "tdoc",
            "url": "http://tinper.org/tdoc/"
        }]
    },
    "pages": [{
        "name": "index", // Page Name 会根据他生成 html 文件，例  index.html
        "title": "开始", // Page Title
        "banner": { // Banner 配置
            "title": "tdoc",
            "description": "开始"
        },
        "content": "./README.md",  // 内容
        "options": { // 此 Page 用的编译器的配置
            "menuLevel": 2
        }
    }, {
        "name": "hybird",
        "title": "混合开发",
        "intro": "document/README.md", // 介绍
        "content": { // 单页多模块配置
            "sidebar": true, // 是否显示侧边目录
            "blocks": [{
                "name": "简介", // 标题
                "content": "document/hybrid/README.md" // 内容
            }, {
                "name": "Hybrid" // 只有标题，做目录和分割用
            }, {
                "name": "说明",
                "sub": true, // 标题在目录里已子目录形式显示
                "content": "modules/hybrid/framework/README.md"
            }]
        }
    }, {
        "name":"FAQ",
        "title":"FAQ",
        "url": "https://github.com/iuap-design/tdoc/issues"
    }]
}
```
