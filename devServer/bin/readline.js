const fs = require("fs");
const readline = require('readline');
const readPath ='../webapp/lib/app.js';
const writePath ='../webapp/lib/result.js';

const fsRead = fs.createReadStream(readPath);
const fsWrite = fs.createWriteStream(writePath);

const rl = readline.createInterface({
    input: fsRead,
    output:fsWrite,
    crlfDelay: Infinity
});
var rand = Math.round(Math.random()*100000000000000000);
var result="";

rl.on('line', (line) => {
    let regit =/(\.html)|(\.js)/;
    if(line.match(regit)){
        let line2=line.replace("\.js","\.js?v="+rand).replace("\.html","\.html?v="+rand);
        fsWrite.write(line2+"\n");
        return false;
    }
    fsWrite.write(line+"\n");
});
