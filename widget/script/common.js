/**
 * Mr.Yuan was create in 2017.4 .13
 */

//rem转换
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



//关闭app
function exitApp() {
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        api.toast({
            msg: '再按一次退出程序',
            duration: 2000,
            location: 'bottom'
        });
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
            api.closeWidget({
                id: 'A6947696977363', //这里改成自己的应用ID
                retData: {
                    name: 'closeWidget'
                },
                silent: true
            });
        });
        setTimeout(function() {
            exitApp();
        }, 2000)
    });
}

//初始化
var header, headerH;

function fnInit() {
    header = $api.dom('header');
    $api.fixStatusBar(header);
    headerH = $api.offset(header).h;
}

//接口地址

var apiSite = 'http://wozai.tonyliangli.cn';

var apiHeader = {
    "api.version": "1",
    "cache-control": "no-cache",
    "postman-token": "8f7e53a3-2c1a-250f-1136-76896a79c3a2"
};

// 用户token，融云token
var userTokenAll = 5,
    rongTokenAll;

var rong,
    UIChatTools;

function moduleInit() {
    // 融云模块
    rong = api.require('rongCloud2');
    //聊天界面模块
    UIChatTools = api.require('UIChatTools');
}