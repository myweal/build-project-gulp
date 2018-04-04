/**
 * author vx lss
 * 2018-1-17
 * Add a random string for all incoming files
 */
const fs = require("fs");
const addVersion = function (readPath, rand, config, flag) {
    // return content of string type
    var content = fs.readFileSync(readPath, {"encoding": "utf8"});
    var regExp = new RegExp("\\?versionStr=" + config.lastVersion, "g");
    // determine whether delete the version number, if flag is true then delete the version number
    if (flag) {
        if (config.lastVersion !== "" && content.indexOf("versionStr=" + config.lastVersion) >= 0) {
            content = content.replace(regExp, "");
            fs.writeFileSync(readPath, content);
        }
        return false;
    }

    // 如果没有加过版本号的就添加
    if (rand !== "" && content.indexOf("?versionStr=") < 0) {
        //  No version number added
        content = content.replace(/\.js\s*"/g, "\.js?versionStr=" + rand + "\"")
            .replace(/\.js\s*'/g, "\.js?versionStr=" + rand + "\'")
            .replace(/\.html\s*"/g, "\.html?versionStr=" + rand + "\"")
            .replace(/\.html\s*'/g, "\.html?versionStr=" + rand + "\'")
            .replace(/\.css\s*"/g, "\.css?versionStr=" + rand + "\"")
            .replace(/\.css\s*'/g, "\.css?versionStr=" + rand + "\'")
            .replace(/\.gif/g, "\.gif?versionStr=" + rand)
            .replace(/\.jpeg/g, "\.jpeg?versionStr=" + rand)
            .replace(/\.jpg/g, "\.jpg?versionStr=" + rand)
            .replace(/\.PNG/g, "\.PNG?versionStr=" + rand)
            .replace(/\.GIF/g, "\.GIF?versionStr=" + rand)
            .replace(/\.JPEG/g, "\.JPEG?versionStr=" + rand)
            .replace(/\.JPG/g, "\.JPG?versionStr=" + rand);
        // 不对index.handlebars中的图片，由于该页面的图片基本上都是位于消息头的配置图片，不要添加版本号
        if(readPath.indexOf("index.handlebars")<0){
            content = content.replace(/\.png/g, "\.png?versionStr=" + rand);
        }
        fs.writeFileSync(readPath, content);
    } else if (rand !== "") {
        // Added version number
        content = content.replace(regExp, "?versionStr=" + rand);
        fs.writeFileSync(readPath, content);
    }
};

module.exports = addVersion;
