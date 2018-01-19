const progress = require("process");

process.stdin.on('end', function() {
    process.stdout.write('end');
});

function gets(cb){
    process.stdin.setEncoding('utf8');
    //输入进入流模式（flowing-mode，默认关闭，需用resume开启），注意开启后将无法read到数据
    //见 https://github.com/nodejs/node-v0.x-archive/issues/5813
    process.stdin.resume();
    process.stdin.on('data', function(chunk) {
        console.log('start!');
        //去掉下一行可一直监听输入，即保持标准输入流为开启模式
        process.stdin.pause();
        cb(chunk);
    });
    console.log('试着在键盘敲几个字然后按回车吧');
}

gets(function(reuslt){
    console.log("["+reuslt+"]");
    //process.stdin.emit('end'); //触发end事件
});
/*
process.stdin.setEncoding('utf8');
process.stdout.write("当前构建version是否已经结束？Y/N\n");
process.stdin.resume();
process.stdin.on('data', function() {
    console.log("in function");
    var chunk = process.stdin.read();
    process.stdout.write('data1: ' + typeof(chunk)+"===\n"+chunk);
   /!* process.stdout.write(chunk=='y');
    if (chunk=="Y"||chunk=="y") {
        process.stdout.write('data: ' + chunk);
        process.stdin.emit('end');
    }*!/
});

process.stdin.on('end', function() {
    process.stdout.write('end');
});*/
