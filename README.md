
# anguar1 工程运行启动说明
## 第一章 安装工程依赖包
第一步：安装node.js
- 在官网上（https://nodejs.org/en/download/）下载最新node版本，正常进行安装

第二步：安装依赖
- 通过 在本工程跟路径上，执行npm install  命令完成依赖安装 

## 第二章 开发时，本地服务的配置与启动
第一步：本地服务的配置
- 在文件devServer/proxy.js中，配置转发服务，如

```js
module.exports = {
    enable: true, //激活远程代理
    enableLocal: true, //激活本地JSON代理到_public/data目录
  proxyTable: {
/*
 * 转发时，不改变交易上下文的情况（推荐使用此方式，避免Session丢失）
 * 如http://127.0.0.1:8080/pweb/resource.do ===>http://196.168.1.1:8000/pweb/resource.do
 */
    "/pweb":"http://196.168.1.1:8000/", 
/*
 *转发时，改变交易上下文的情况，
 *如http://127.0.0.1:8080/pmobile/resource.do ===>http://196.168.1.2:8000/resource.do
 */
    "/pmobile":{
      target:"http://196.168.1.2:7000/",  
      pathRewrite: {'^/pmobile' : ''},
      logLevel: 'debug'
    },
  }
};
```

第二步：本地服务的启动
在本工程路径下，启动本地测试服务: npm start 或者 npm run dev
```js
>npm start
```
- 服务默认启动在9001端口，请在浏览器地址栏输入http://localhost:9001/进行测试。
- static开发测试路径：http://localhost:9001/static/index.html
- sample压缩投产测试：http://localhost:9001/build/sample/index.html
## 第三章 发布前，配置动态添加版本号。
第一步 配置config.json

> addVersion is to determine whether to add the version number,boolean ,default false

> root is the root directory that needs to be added to the version number     

> index is the final index page to produce

> htmls is the directory where the file containing the script was imported

> route is the routing file

>cssPath is the path where imports jsFiles and cssFiles

>cssApart is the file where do not add version number,the value is a string which can split filename with semicolon

>lastVersion is the lastest version

```json
{
  "addVersion": false,
  "root": "static",
  "index": "static/index.handlebars",
  "htmls": "static/htmls",
  "route": "static/lib/angular-config-router.js",
  "cssPath": "static/lib/config.preload.js",
  "cssApart": "bootstrap.css",
  "lastVersion": "",
  "other": ""
}
```
第二步 动态添加随机数版本号
>1).<font color="red">注意：在使用oc-lazy-load引入脚本时，要放在数组方括号内,例如
</font>

```js
<div oc-lazy-load='["htmls/Test/Test.js"]' >
```


>2).根据需要执行npm run minify or npm run concat
   >>此命令包含添加版本号

>3).删除开发代码中的版本号 npm run clean-version

>4).为开发的项目添加版本号 npm run version

<font color="red">注意：请等待代码全部构建完再继续操作，请不要把该版本号提交git或svn,除非有单独的git分支或svn来保存有版本号的代码</font>


## 第四章 发布时，执行自动压缩。

执行命令：> npm run minify

- 自动压缩命令说明： > npm run minify
 > 工程资源合并压缩,输出到/build/sample/目录, 生产部署版本通过http://localhost:9001/build/sample/index.html可测试访问。
- 【可选】自动合并命令说明: npm run concat 
 > 工程资源合并,输出到/build/concat/目录, 该任务只做 js 和 css 文件合并，不进行压缩,预生产模式测试版本
##
========================================================================================
