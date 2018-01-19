/**
 * author myweal
 * 2018-1-17
 * get a random string for all incoming files
 */
const getRandomWord = function (len) {
    len = len || 10;
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var date = new Date().getTime();
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd+date;
};
module.exports=getRandomWord;
