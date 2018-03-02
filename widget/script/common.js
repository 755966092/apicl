/**
 * Mr.Yuan was create in 2017.4.13
 */

//rem转换
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);



//关闭app
function exitApp() {
    api.addEventListener({
        name: "keyback"
    }, function (ret, err) {
        api.toast({
            msg: "再按一次退出程序",
            duration: 2000,
            location: "bottom"
        });
        api.addEventListener({
            name: "keyback"
        }, function (ret, err) {
            api.closeWidget({
                id: "A6947696977363", //这里改成自己的应用ID
                retData: {
                    name: "closeWidget"
                },
                silent: true
            });
            rong.disconnect({
                isReceivePush: false
            }, function (ret, err) {
                if ("success" == ret.status) {

                }
            });
            db.closeDatabase({
                name: "db_" + $api.getStorage("userToken")
            }, function (ret, err) {
                if (ret.status) {
                    // alert(JSON.stringify(ret));
                } else {
                    alert(JSON.stringify(err.msg));
                }
            });
        });
        setTimeout(function () {
            exitApp();
        }, 2000);
    });

}

//初始化
var header, headerH;

function fnInit() {
    header = $api.dom("header");
    $api.fixStatusBar(header);
    headerH = $api.offset(header).h;
}


// 七牛
var baseUrl = "img.iinnet.com";
//接口地址

// 测试环境
// var apiSite = 'https://wozai.tonyliangli.cn/api';
//
// 正式环境
var apiSite = "https://api.iinnet.com";

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
    clipBoard,
    wxPay,
    aliPay,
    ajpush,
    fs,
    FNImageClip,
    UIMediaScanner,
    SQLName;

function moduleInit() {
    // 图片剪切
    FNImageClip = api.require("FNImageClip");
    // 极光推送
    ajpush = api.require("ajpush");
    // 支付宝支付
    aliPay = api.require("aliPay");
    // 微信支付
    wxPay = api.require("wxPay");
    SQLName = "db_" + $api.getStorage("userToken");
    // 数据库模块
    db = api.require("db");
    // 融云模块
    rong = api.require("rongCloud2");
    // 文件模块
    fs = api.require("fs");
    //聊天界面模块
    UIChatBox = api.require("UIChatBox");
    //列表模块
    UISelector = api.require("UISelector");
    // 通讯录模块
    contacts = api.require("contacts");
    // 城市选择器
    citySelector = api.require("citySelector");
    // 通讯录列表
    UIListContacts = api.require("UIListContacts");
    // 现在使用
    listContact = api.require("listContact");

    // 百度地图
    bMap = api.require("bMap");
    // 选择器
    UIActionSelector = api.require("UIActionSelector");
    // 复制剪切板
    clipBoard = api.require("clipBoard");
    // 上传图片
    UIMediaScanner = api.require('UIMediaScanner');
}

// 接入融云
function rongyun(rongToken) {
    rong.init(function (ret, err) {
        if (ret.status == "error") {
            api.toast({
                msg: err.code
            });
        }
    });
    receiveMsg();
    rong.connect({
        token: rongToken
    }, function (ret, err) {
        if (ret.status == "success") {
            historicalNews();
        }
    });
}

// 查看历史消息
function historicalNews() {
    rong.getConversationList(function (ret, err) {
        api.sendEvent({
            name: "historNews",
            extra: {
                data: ret.result
            }
        });
    });
}

// 接收消息
function receiveMsg() {
    // 监听连接器变化
    rong.setConnectionStatusListener(function (ret, err) {
        // alert(JSON.stringify(ret.result.connectionStatus))
        if (ret.result.connectionStatus === "KICKED") {
            alert("您已在另一台设备登录");
            api.openWin({
                name: "me_login",
                url: "widget://html/enroll/me_login.html"
            });
            $api.clearStorage();
            $api.setStorage('guidePages', api.appVersion);
            api.closeWin({
                name: "main"
            });
        }
    });
    rong.setOnReceiveMessageListener(function (ret, err) {
        // 接收消息监听器接收到消息后刷新列表
        historicalNews();
        api.sendEvent({
            name: "receiveMsg",
            extra: {
                msg: ret.result.message.content.text,
                targetId: ret.result.message.senderUserId,
                msgContent: ret
            }
        });
    });
}

function dropOut() {
    // 退出戎云
    rong.disconnect({
        isReceivePush: false
    }, function (ret, err) {
        if ("success" == ret.status) {

        }
    });
    db.openDatabase({
        name: "db_" + $api.getStorage("userToken"),
    }, function (ret, err) {
        if (ret.status) {
            var tableArr = ["addressList", "tb_remarks_contact", "tb_remarks_other_contact", "tb_remarks_address", "tb_remarks_education", "tb_remarks_work", "tb_remarks_project", "tb_remarks_user_info", "tb_remarks_status", "addressList_simplify"];
            for (var i = 0; i < tableArr.length; i++) {
                db.executeSql({
                    name: "db_" + $api.getStorage("userToken"),
                    sql: "DROP TABLE IF EXISTS " + tableArr[i]
                }, function (ret, err) {
                    if (ret.status) {
                        // console.log('执行成功'+i)
                        api.ajax({
                            url: apiSite + "/settings/logout",
                            method: "post",
                            headers: apiHeader,
                            data: {
                                values: {
                                    token: $api.getStorage("userToken"),
                                }
                            }
                        }, function (ret, err) {
                            if (ret) {
                                $api.clearStorage();
                            } else {
                                alert(JSON.stringify(err));
                            }
                        });
                    } else {
                        alert(JSON.stringify(err));
                    }
                });
            }
        } else {
            alert(JSON.stringify(err));
        }
    });
    api.closeToWin({
        name: "loginPage"
    });
}



// 计算时分秒
function changeTime(time) {
    // 获取的是毫秒数
    var time = new Date(time);
    // 秒数
    var sencond = time.getSeconds();
    // 分钟数
    var minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    // 小时数
    var hour = time.getHours();
    // 年
    var year = time.getFullYear();
    // 月
    var month = time.getMonth() + 1;
    // 日
    var day = time.getDate();
    // 星期
    var xingqu = time.getDate();
    return {
        sencond: sencond,
        minute: minute,
        hour: hour,
        year: year,
        month: month,
        day: day
    };
}

// doT模版获取数据
function getData(data) {
    // 原生方法
    //  document.getElementsByClassName('resultList')[0].innerHTML = doT.template(document.getElementById('listT').innerHTML)(data)
    // console.log('渲染模版111')
    var listTText = $api.byId("listT").text;
    // console.log('渲染模版222')
    var fnListT = doT.template(listTText);
    // console.log('渲染模版333')
    var html = fnListT(data);
    // console.log('渲染模版444')
    // console.log(html+' at 304')
    var list = $api.dom(".resultList");
    // console.log('渲染模版555')
    // 替换resultList所有内容
    $api.html(list, html);
    // console.log('渲染完成')
    // alert('getData:' + JSON.stringify(data))
}

// 处理时间显示
function initTime(time) {
    var timeRep = time;
    time = time.replace(/-/g, ":").replace(" ", ":");
    time = time.split(":");
    var nowTime = new Date();
    var pageTime = new Date(time[0], (time[1] - 1), time[2], time[3], time[4], time[5]);
    if ((pageTime.getDate() != nowTime.getDate()) || (pageTime.getFullYear() != nowTime.getFullYear()) || ((pageTime.getMonth() + 1) != (nowTime.getMonth() + 1))) {
        // 不是今天
        return timeRep;
    } else {
        // 今天
        if (nowTime.getHours() != pageTime.getHours()) {
            return nowTime.getHours() - pageTime.getHours() + "小时之前";
        } else {
            var timeText = nowTime.getMinutes() - pageTime.getMinutes() == 0 ? "刚刚" : nowTime.getMinutes() - pageTime.getMinutes() + "分钟之前";
            // console.log(timeText)
            return nowTime.getMinutes() - pageTime.getMinutes() == 0 ? "刚刚" : nowTime.getMinutes() - pageTime.getMinutes() + "分钟之前";
        }
    }
}

// 轮播图
function swiperFun() {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 3000,
        // pagination: '.swiper-pagination',
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        // pagination: {
        //     el: '.swiper-pagination',
        // },
    });
}
/**
 * 
 * @param {*去重的键名} key 
 */
Array.prototype.filterObjKey = function (key) {
    for (var i = 0, temp = {}, result = [], ci; ci = this[i++];) {
        var ordid = ci[key];
        if (temp[ordid]) {
            continue;
        }
        temp[ordid] = true;
        result.push(ci);
    }
    return result;
};