/**
 * author  myweal
 * 2018-1-17
 * Add a random string for all incoming files
 */
const fs = require("fs");
const addVersion = function (readPath,rand,config,flag) {
    // return content of string type
    var content = fs.readFileSync(readPath, {"encoding": "utf8"});
    var regExp = new RegExp("\\?v="+config.lastVersion,"g");
    // determine whether delete the version number, if flag is true then delete the version number
    if(flag){
        if(config.lastVersion!=="" &&content.indexOf("v="+config.lastVersion)>=0){
            content = content.replace(regExp,"");
            fs.writeFileSync(readPath, content);
        }
        return false;
    }

    // 如果没有加过版本号的就添加
    if (rand!=="" && content.indexOf("?v=") < 0) {
      //  No version number added
        content = content.replace(/\.js/g, "\.js?v=" + rand)
            .replace(/\.html\s*"/g, "\.html?v=" + rand+"\"")
            .replace(/\.html\s*'/g, "\.html?v=" + rand+"\'")
            .replace(/\.css\s*"/g, "\.css?v=" + rand+"\"")
            .replace(/\.css\s*'/g, "\.css?v=" + rand+"\'")
            .replace(/\.png/gi,"\.png?v=" + rand)
            .replace(/\.gif/gi,"\.gif?v=" + rand)
            .replace(/\.jpeg/gi,"\.jpeg?v=" + rand)
            .replace(/\.jpg/gi,"\.jpg?v=" + rand);
        fs.writeFileSync(readPath, content);
    }else if(rand!==""){
        // Added version number
        content = content.replace(regExp,"?v="+rand);
        fs.writeFileSync(readPath, content);
    }
};

module.exports = addVersion;
