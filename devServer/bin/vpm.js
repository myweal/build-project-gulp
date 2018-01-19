/**
 * author myweal
 * 2018-1-17
 * Traversal in the htmls file containing the introduction of the script,
 * the routing file, the final index page to produce
 */
const fs = require("fs");
const path = require("path");
const os = require("os");

const addVersion = require("./addVersion.js");
const getRandomWord = require("./getRandomWord.js");
const relativeCurrentPath = "../../";
const configPath = path.resolve(__dirname, relativeCurrentPath + "config.json");
//Flag is to determine whether to delete random version number
module.exports = function (flag) {
    // css files is imported in this project
    var cssFiles = "";
//get route、htmls、index path
    var config = JSON.parse(fs.readFileSync(configPath, {"encoding": "utf8"}));
    var addVersionFileList = [], webPagePathAllList = [], webPagePathList = [],webPagePathList2=[],webPagePathList3=[];
// 判断空格或空字符串
    var regit = /^\s*$/;
    var htmlDirPath = "";
    if (!regit.test(config.cssPath)) {
        cssFiles = require(path.resolve(__dirname, relativeCurrentPath + config.cssPath)).cssFiles;
    }
    if (!regit.test(config.index)) {
        addVersionFileList.push(path.resolve(__dirname, relativeCurrentPath + config.index));
    }
    if (!regit.test(config.htmls)) {
        htmlDirPath = path.resolve(__dirname, relativeCurrentPath + config.htmls);
    }

    if (!regit.test(config.route)) {
        addVersionFileList.push(path.resolve(__dirname, relativeCurrentPath + config.route));
    }

    if (!regit.test(config.other)) {
        if (config.other.indexOf(";") > 0) {
            // TODO 多个配置的路径 待完成
            config.other.split(";");

            return false;
        }
        addVersionFileList.push(path.resolve(__dirname, relativeCurrentPath + config.other));
    }
    //console.log("htmls path:" + dirPath);
    /*** 解析htmls下面的文件夹及文件,获得htmls下面的所有文件 开始*/
    function getHtmlsPath(dirPath) {
        const fileList = fs.readdirSync(dirPath);
        // 一级目录或文件的数量
        let fileList_length=fileList.length;

        for (let j = 0; j < fileList_length; j++) {
            // 获得htmls下面的一级目录
            let fileFolder = fileList[j];
            // 判断如果是mac电脑，则过滤掉.DS_Store这个系统文件
            if (os.platform() == "darwin" && fileFolder == ".DS_Store") {
                continue;
            }
            // 判断当前路径是否为文件
            let path = dirPath + "/" + fileFolder;
            let stats = fs.statSync(path);
            // 判断htmls下内容是文件还是目录开始
            if (stats.isFile()) {
                // 当前路径为文件，则添加到添加版本号的列表中
                addVersionFileList.push(path);
            } else {
                // 如果是文件夹则继续调用getFilePath
                getHtmlsPath(path);
            }
        }
    }
    getHtmlsPath(htmlDirPath);
    /*** 解析htmls下面的文件夹及文件,获得htmls下面的所有文件 结束*/

    /**add css filePath start*/
    for (let i = 0; i < cssFiles.length; i++) {
        // 判断是否有除了的css文件
        if (!regit.test(config.cssApart)) {
            // 排除的css文件名称以分号分割
            let cssApartList = config.cssApart.split(";");
            for (let key in cssApartList) {
                // 该文件为需要过滤掉的文件
                if (cssFiles[i].indexOf(cssApartList[key]) > -1) {
                    continue;
                }
                // 不过过滤掉的文件则添加到
                let cssPath = path.resolve(__dirname, relativeCurrentPath + config.root + "/" + cssFiles[i]);
                addVersionFileList.push(cssPath);
            }
        }
    }
    /**add css filePath end*/

    // determine whether add or detete the random number start
    var rand="";
    if(flag){
        if(config.lastVersion==""){
            console.log("无版本号。。。");

        }else{
            // 删除版本号
            console.log("删除版本号"+config.lastVersion);
        }
    }else{
        /**get randomWord start*/
         rand= getRandomWord();
        if(config.lastVersion==""){
            console.log("添加新的版本号"+rand);
        }else{
            console.log("把原来的版本号"+config.lastVersion+"替换成最新的版本号"+rand);
        }
        /**get randomWord end*/
    }
    // determine whether add or detete the random number end

    /***Traverse all files to add a random version number start*/
    //console.log("all who need add version :" + JSON.stringify(addVersionFileList));
    for (let i = 0; i < addVersionFileList.length; i++) {
        let file = addVersionFileList[i];
        // flag为true为删除原版本号，否则为添加
        addVersion(file, rand,config,flag);
        //After adding a random version number to all files, save the random version number to the file
        if(i==addVersionFileList.length-1){
            // 设置延迟，保证都添加完版本号
            setTimeout(function () {
                // 保存新的版本号
                config.lastVersion=rand;
                // 保存新的版本号
                fs.writeFileSync(configPath,JSON.stringify(config));
            },1000);
        }
    }
    /***Traverse all files to add a random version number end*/

};
