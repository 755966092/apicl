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
            rong.disconnect({
                isReceivePush: true
            }, function(ret, err) {
                if ('success' == ret.status) {
                    api.toast({
                        msg: '断开连接成功!'
                    });
                }
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

var apiSite = 'http://wozai.tonyliangli.cn/';

var apiHeader = {
    "api.version": "1",
    "cache-control": "no-cache",
    "postman-token": "8f7e53a3-2c1a-250f-1136-76896a79c3a2"
};

// 用户token，融云token


var userTokenAll = $api.getStorage('userToken');
var rongTokenAll = $api.getStorage('rongToken');


var rong,
    UISelector,
    UIChatTools,
    citySelector,
    UIListContacts,
    contacts;

function moduleInit() {
    // 融云模块
    rong = api.require('rongCloud2');
    //聊天界面模块
    UIChatTools = api.require('UIChatTools');
    //列表模块
    UISelector = api.require('UISelector');
    // 通讯录模块
    contacts = api.require('contacts');
    // 城市选择器
    citySelector = api.require('citySelector');
    // 通讯录列表
    UIListContacts = api.require('UIListContacts');

}

// 接入融云
function rongyun(rongToken) {

    rong.init(function(ret, err) {
        if (ret.status == 'error')
            api.toast({
                msg: err.code
            });

    });
    receiveMsg();
    rong.connect({
        // 用户1
        // token: 'aAoW4oalHGpvB6Hw89bG0XzZSHvx/Xm6zmi6cWDa3L4VyfNcz/KXDFQxtpoQ+os1nT0799sMXlXPvUAK3FnjIY94cnJzE+aT'
        // 用户2r
        // token: 'hjjQ018gh2aPKpdyjqhX0nzZSHvx/Xm6zmi6cWDa3L4VyfNcz/KXDDNYtoRSbb1+nT0799sMXlXSm1rb7lqSfY94cnJzE+aT'
        token: rongToken
    }, function(ret, err) {

        if (ret.status == 'success') {
            historicalNews();
        }
    });
}

// 查看历史消息
function historicalNews() {
    rong.getConversationList(function(ret, err) {
        api.sendEvent({
            name: 'historNews',
            extra: {
                data: ret.result
            }
        });
    })
}

// 接收消息
function receiveMsg() {
    rong.setOnReceiveMessageListener(function(ret, err) {
        // 接收消息监听器接收到消息后刷新列表
        historicalNews();
        api.sendEvent({
            name: 'receiveMsg',
            extra: {
                msg: ret.result.message.content.text
            }
        });
    })
}



// 计算时分秒
function changeTime(time) {
    // 获取的是毫秒数
    var time = new Date(time);
    // 秒数
    var sencond = time.getSeconds()
        // 分钟数
    var minute = time.getMinutes()
        // 小时数
    var hour = time.getHours()
        // 年
    var year = time.getFullYear()
        // 月
    var month = time.getMonth()
        // 日
    var day = time.getDay()
        // 星期
    var xingqu = time.getDate()
    return {

        sencond: sencond,
        minute: minute,
        hour: hour,
        year: year,
        month: month,
        day: day
    }
}