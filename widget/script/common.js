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
            // rong.disconnect({
            //     isReceivePush: false
            // }, function(ret, err) {
            //     // if ('success' == ret.status) {
            //     //     api.toast({
            //     //         // msg: '断开连接成功!'
            //     //     });
            //     // }
            // });
            // 
            db.closeDatabase({
                name: 'test'
            }, function(ret, err) {
                if (ret.status) {
                    alert(JSON.stringify(ret));
                } else {
                    alert(JSON.stringify(err.msg));
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

var apiSite = 'https://wozai.tonyliangli.cn';

var apiHeader = {
    "api.version": "1",
    "cache-control": "no-cache",
    "postman-token": "8f7e53a3-2c1a-250f-1136-76896a79c3a2"
};

// 用户token，融云token



var rong,
    UISelector,
    UIChatBox,
    citySelector,
    UIListContacts,
    bMap,
    listContact,
    db,
    UIActionSelector,
    contacts,
    clipBoard;

function moduleInit() {
    // 数据库模块
    db = api.require('db');
    // 融云模块
    rong = api.require('rongCloud2');
    //聊天界面模块
    UIChatBox = api.require('UIChatBox');
    //列表模块
    UISelector = api.require('UISelector');
    // 通讯录模块
    contacts = api.require('contacts');
    // 城市选择器
    citySelector = api.require('citySelector');
    // 通讯录列表
    UIListContacts = api.require('UIListContacts');
    // 现在使用
    listContact = api.require('listContact');
    // 百度地图
    bMap = api.require('bMap');
    // 选择器
    UIActionSelector = api.require('UIActionSelector');
    // 复制剪切板
    clipBoard = api.require('clipBoard');

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
    // alert('开始发送事件')
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
    // 监听连接器变化
    rong.setConnectionStatusListener(function(ret, err) {
        // alert(JSON.stringify(ret.result.connectionStatus))
        if (ret.result.connectionStatus === 'KICKED') {
            alert('你以被顶下线');
        }
    });
    rong.setOnReceiveMessageListener(function(ret, err) {
        // 接收消息监听器接收到消息后刷新列表
        historicalNews();
        api.sendEvent({
            name: 'receiveMsg',
            extra: {
                msg: ret.result.message.content.text,
                targetId: ret.result.message.senderUserId
            }
        });
    })
}



// 计算时分秒
function changeTime(time) {
    // 获取的是毫秒数
    var time = new Date(time);
    // 秒数
    var sencond = time.getSeconds();
    // 分钟数
    var minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    // 小时数
    var hour = time.getHours();
    // 年
    var year = time.getFullYear();
    // 月
    var month = time.getMonth();
    // 日
    var day = time.getDay();
    // 星期
    var xingqu = time.getDate();
    return {
        sencond: sencond,
        minute: minute,
        hour: hour,
        year: year,
        month: month,
        day: day
    }
}

// doT模版获取数据
function getData(data) {
    console.log('渲染模版111')
    var listTText = $api.byId('listT').text;
    console.log('渲染模版222')
    var fnListT = doT.template(listTText);
    console.log('渲染模版333')
    var html = fnListT(data);
    console.log('渲染模版444')
    var list = $api.dom('.resultList');
    console.log('渲染模版555')
        // 替换resultList所有内容
    $api.html(list, html);
    console.log('渲染完成')
        // alert('getData:' + JSON.stringify(data))
}