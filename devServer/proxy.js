module.exports = {
    saveJson:false,//是否保存服务端json数据,注意只记录rejecode===000000的json数据,默认关闭
	enable: true, //激活远程代理
	enableLocal: true, //激活本地JSON代理到_public/data目录
	proxyTable: {
		"/api":"http://127.0.0.1:8080/", //转发时，不改变交易上下文的情况（推荐使用此方式，避免Session丢失），如http://127.0.0.1:8080/pweb/resource.do ===>http://196.168.1.1:8000/pweb/resource.do
		"/pmobile":{
			target:"http://196.168.1.2:7000/",  //转发时，改变交易上下文的情况，如http://127.0.0.1:8080/pmobile/resource.do ===>http://196.168.1.2:8000/resource.do
			pathRewrite: {'^/pmobile' : ''},
			logLevel: 'debug'
		},
		"/eweb":"http://192.168.1.142:8080/"
		// 张增光 142:8080
	}
};
