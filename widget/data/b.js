< !DOCTYPE html >
	<html >
<head>
    <meta charset="utf-8"><meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0" />
    <title>我在</title>
    <link rel="stylesheet" type="text/css" href="../css/api.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <style>
        .noNews {
            margin-top: .2rem;
            text-align: center;
            color: #999;
            font-size: .3rem;
            line-height: .5rem;
        }
        html,body {
                background: #EFEFF4;
                box-sizing: border-box;
        }
        .search {
            border-radius: .04rem;
            display: block;
            height: .5rem;
            line-height: .5rem;
            background-color: #fff;
            margin: .2rem .15rem;
            text-align: center;
            font-size: 0.24rem;
            color: #96969B;
            box-sizing: border-box;
            
        }
        .search .searchIcon {
            display: inline-block;
            width: .26rem;
            height: .5rem;
            background: url(../image/icon_supply/icon_search.png)no-repeat;
            -webkit-background-size: .25rem .26rem;
            background-size: .25rem .26rem;
            background-position: 0 center;
            vertical-align: top;
            box-sizing: border-box;
        }
        .search .searchText {
            font-size: .24rem;

        }
        .news {
            display: flex;
            flex-flow: column nowrap;
        }
        ul li {
            display: -webkit-box; 
            display: flex; 
            width: 7.5rem;
            height: 1.24rem;
            background-color: #fff;
            display: -webkit-box; 
            display: flex; 
            padding: 0 0 0 .17rem;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
        }
        ul li .slide {
            position: absolute;
            right: 0;
            font-size: 0rem;
            z-index: 1;
            display: inline-block;
            width: 3rem;
            line-height: 1.24rem;
            color: #fff;
        }
        .stamp {
            background-color: #C8C7CD;
            width: 1.8rem;
            font-size: .3rem;
            text-align: center;
        }
        .del {
            background-color: #E53933;
            width: 1.2rem;
            font-size: .3rem;
            text-align: center;
        }
        ul li .warp {
            position: relative;
            z-index: 20;
            display: -webkit-box; 
            display: flex; 
            -webkit-box-align:  center;
            align-items: center;
            padding-right: .17rem;
            box-sizing: border-box;
            width: 100%;
            background-color: #fff;

        }
         ul li .headImg {
            margin-right: .2rem;
            position: relative;
         }
        ul li .headImg .select {
            display: inline-block;
            width: .32rem;
            height: .32rem;
            background-color: #f00;
            border-radius: 50%;
            position: absolute;
            top: -.1rem;
            right: -.1rem;
            text-align: center;
            line-height: .32rem;
            color: #fff;
        }
        ul li .headImg img {
            width: .91rem;
            height: .91rem;
            border-radius: .12rem;
        }
        .contentRight .name{
             display: -webkit-box; 
             display: flex; 
             width: 6.05rem;
             -webkit-box-pack: justify;
            justify-content: space-between;
        }
        .contentRight .name h3 {
            font-size: .3rem;
            line-height: .4rem;
        }
        .contentRight .name .time {
            font-size: .22rem;
            color: #999;
        }
        .contentRight p {
            font-size: .28rem;
            color: #999;
            width: 5.24rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .warp {
            border-bottom: 0.6px solid #D9D9D9;
        }
    </style>
</head>

<body id="body" tapmode onclick="closeNews()">
    <div id="news_wrap" class="clearfix" tapmode onclick="closeNews()">
       <!-- 搜索框 -->
       <!--  <div class="search"   tapmode   onclick="openS()">
            <span class="searchIcon"></span>
            <span class="searchText">搜索</span>
        </div> -->


       <!--  <ul>
            <li class="{{=it[i].select}} chatList" data-targetId="{{=it[i].targetId}}" data-nickname="{{=it[i].nickname}}" ontouchstart=";event.stopPropagation();"   tapmode   onclick="openChat(this)">
                <div class="warp" ontouchstart="gtouchstart(this)" ontouchmove="gtouchmove(this)" ontouchend="gtouchend(this)">
                    <div class="headImg">
                        <img class="fl" src="../image/tx_4.jpg">
                    </div>
                    <div class="contentRight">
                        <div class="name">
                            <h3>{{=it[i].nickname}}</h3>
                            <span class="time">速度度速度度速度度</span>
                        </div>
                        <p>{{=i{{=it[i].latestMessagelatestMessagelatestMessagelatestMessagelatestMessagelatestMessagelatestMessage.text}}</p>
                    </div>
                </div>
                <span class="slide">
                    <span class="stamp">标为已读</span>
                    <span class="del" tapmode onclick="delNesItem(this);event.stopPropagation()">删除</span>
                </span>
            </li>
            <li class="{{=it[i].select}} chatList" data-targetId="{{=it[i].targetId}}" data-nickname="{{=it[i].nickname}}" ontouchstart=";event.stopPropagation();"  tapmode   onclick="openChat(this)">
                <div class="warp" ontouchstart="gtouchstart(this)" ontouchmove="gtouchmove(this)" ontouchend="gtouchend(this)">
                    <div class="headImg ">
                        <img class="fl" src="../image/tx_4.jpg">
                    </div>
                    <div class="contentRight">
                        <div class="name">
                            <h3>{{=it[i].nickname}}</h3>
                            <span class="time">速度度速度度速度度</span>
                        </div>
                        <p>{{=i{{=it[i].latestMessagelatestMessagelatestMessagelatestMessagelatestMessagelatestMessagelatestMessage.text}}</p>
                    </div>
                </div>
                <span class="slide">
                    <span class="stamp">标为已读</span>
                    <span class="del">删除</span>
                </span>
            </li>
        </ul> -->
        <!-- <ul class="resultList"> -->
            <!-- <li class="{{=it[i].select}} chatList" data-targetId="{{=it[i].targetId}}" data-nickname="{{=it[i].nickname}}" ontouchstart=";event.stopPropagation();"   tapmode   onclick="openChat(this)">
                <div class="warp">
                    <div class="headImg ">
                        <img class="fl" src="../image/tx_4.jpg">
                    </div>
                    <div class="contentRight">
                        <div class="name">
                            <h3>{{=it[i].nickname}}</h3>
                            <span class="time">速度度速度度速度度</span>
                        </div>
                        <p>{{=i{{=it[i].latestMessagelatestMessagelatestMessagelatestMessagelatestMessagelatestMessagelatestMessage.text}}</p>
                    </div>
                </div>
            </li> -->
        <!-- </ul> -->


        <ul class="resultList"></ul>
        <script type="text/x-dot-template" id="listT">
            {{?it.length > 0}}
                {{ for (var i = 0; i < it.length; i++) { }} 
                    <li class="{{=it[i].select}} chatList" data-targetId="{{=it[i].targetId}}" data-nickname="{{=it[i].nickname}}" data-remark_nickname="{{=it[i].remark_nickname}}" ontouchstart=";event.stopPropagation();"  data-userId="{{=it[i].user_id}}"  tapmode   onclick="openChat(this)">
                        <div class="warp" ontouchstart="gtouchstart(this)" ontouchmove="gtouchmove(this)" ontouchend="gtouchend(this)">
                            <div class="headImg">
                                {{?it[i].remark_head_img_url}}
                                 <img class="fl" src="{{=it[i].remark_head_img_url}}">
                                 {{??}}
                                 <img class="fl" src="{{=it[i].url}}">
                                 {{?}}
                                 {{?it[i].unreadMessageCount == 0 }}
                                 {{??}}
                                 <span class="select">{{=it[i].unreadMessageCount}}</span>
                                 {{?}}
                            </div>
                            <div class="contentRight">
                               <div class="name">
                                    {{?it[i].remark_nickname}}
                                    <h3>{{=it[i].remark_nickname}}</h3>
                                    {{??}}
                                    <h3>{{=it[i].nickname}}</h3>
                                    {{?}}
                                    <span class="time">{{=it[i].time.hour}}:{{=it[i].time.minute}}</span>
                               </div>
                                <p>{{=it[i].latestMessage.text}}</p>
                            </div>
                        </div>
                        <span class="slide">
                            <span class="stamp" data-targetId="{{=it[i].targetId}}" tapmode onclick="delNesItem(this,1);event.stopPropagation()">标为已读</span>
                            <span class="del" data-targetId="{{=it[i].targetId}}" tapmode onclick="delNesItem(this,0);event.stopPropagation()">删除</span>
                        </span>
                    </li>
                {{ }; }}
            {{??}}
                <p class="noNews">暂无消息</p>
            {{?}}
                
        </script>
        <!-- <ul>
            <li class="{{=it[i].select}} chatList" data-name="{{=it[i].targetId}}"   tapmode   onclick="openChat(this)">
                <img class="fl" src="../image/tx_5.jpg">
                <h3>testUser2</h3>
                 <h3>{{=it[i].targetId}}</h3> 
                <span class="fr">11：20</span>
                <p>{{=it[i].latestMessage.text}}</p>
                </li>
        </ul> -->
    </div>
    <script type="text/javascript" src="../script/common.js"></script>
    <script type="text/javascript" src="../script/api.js"></script>
    <script type="text/javascript" src="../script/doT.min.js"></script>
    <script type="text/javascript">
    var chatMessage;
     apiready = function() {
        moduleInit()
        // console.log($api.getStorage('userToken'))
        // 监听打开加好友窗口  
        monitorEvent();
        // 缓存个人信息
        requireData();
        // chatMessage = $api.getStorage('chatMessage');
        // if (chatMessage) {
        //     getData(chatMessage)
        //     console.log('使用缓存')
        //     historyNews();
        // } else {
        //     // 历史消息
        //     historyNews(cacheFieldName);    
        //     console.log('网络获取')
        // }
        // 滚动到底部触发的事件    
        // scrollBotton();
        contrastCache('chatMessage',historyNews);
        // 去除头像上的消息数量
        api.addEventListener({
            name: 'refurbish'
        }, function(ret, err) {
            historicalNews();
        });
    }
    function delNesItem(ele,n) {
        var targetId = $api.attr(ele, 'data-targetId');
        if (n) {
             // 之前调用 init 和 connect 的代码省略
            rong.clearMessagesUnreadStatus({
                conversationType: 'PRIVATE',
                targetId: targetId
            }, function(ret, err) {
                historicalNews();
            })
        } else {
            $api.remove($api.closest(ele, 'li'));
            rong.removeConversation({
                conversationType: 'PRIVATE',
                targetId: targetId
            }, function(ret, err) {
                // api.toast({ msg: ret.status });
            })
        }
    }
    var startX,startY;
    var endX,endY;
    function gtouchstart(ele){
        var e = window.event;
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        // console.log(startY)
    };   
    function gtouchmove(){   
        var e = window.event;
        endX = e.touches[0].pageX;
        endY = e.touches[0].pageY;  
    };   
    function gtouchend(ele) {
        var X = endX - startX,
        Y = Math.abs(endY - startY);  
        if ( X < -10 && Y < 100) {
            for (var i = 0; i < $api.domAll('.warp').length; i++) {
                $api.css($api.domAll('.warp')[i], 'left: 0rem ');
             } 　　　　　　
            $api.css(ele, 'left: -3rem ');
        } else if(X > 10 && Y < 10) {
            $api.css(ele, 'left: 0rem ');
        }   
    }

    function requireData() {
            api.ajax({
                url: apiSite + '/user_center/index',
                method: 'post',
                headers: apiHeader,
                data: {
                    values: { 
                        token: $api.getStorage('userToken')
                    }
                }
            }, function(ret, err) {
                if (ret) {
                    $api.setStorage('UserCenter', ret.data);
                    // console.log(JSON.stringify(ret))
                    userName = ret.data.info.nickname,
                    headImg = ret.data.info.head_img_url,
                    sex = ret.data.info.sex,
                    // 当前公司
                    currentCompany = ret.data.info.current_company, 
                    // 当前职位
                    currentPosition = ret.data.info.current_position;
                    // 设置本地缓存
                    $api.setStorage('userName', userName); 
                    $api.setStorage('userSex', sex); 
                    $api.setStorage('currentCompany', currentCompany); 
                    $api.setStorage('currentPosition', currentPosition);
                    // 图片缓存
                    api.imageCache({
                        url: headImg,
                        policy: 'cache_else_network'
                    }, function(ret, err) {
                        if (ret) {
                            $api.setStorage('imgCache', ret.url); 
                        } else {
                            alert(JSON.stringify(err.msg));
                        }
                    });
                } else {
                    alert(JSON.stringify(err.msg));
                }
            });
    }

    function contrastCache(cacheFieldName,  fn) {
        var cacheFieldName = $api.getStorage(cacheFieldName);
         if (cacheFieldName) {
            getData(cacheFieldName)
            fn(cacheFieldName);
        } else {
            // 历史消息
            fn(cacheFieldName);    
        }

    }

    // 监听打开加好友窗口
    function monitorEvent() {
        // 监听showNews事件，显示添加好友框     
        api.addEventListener({
            name: 'showNews'
        }, function() {
            // $api.addCls($api.dom('.addWin'), 'show');
            api.openFrame({
                name: 'frameName',
                url: './news/addFellowWin.html',
                rect: {
                    x: 0,
                    y: 0,
                    // w : api.winWidth,
                    // h : api.winHeight
                },
                bounces: false
            });
        });
    }
    // 历史消息
    function historyNews(cacheFieldName){
        // 历史消息列表
        rong.getConversationList(function(ret, err) {
                var targetRongIdArr = [];
                for (var i = 0; i < ret.result.length; i++) {
                    ret.result[i].time = changeTime(ret.result[i].receivedTime);
                    targetRongIdArr.push(ret.result[i].targetId);
                }
                api.execScript({
                  name: 'main',
                  // frameName: 'fram0',
                  script: 'getTotalCount();'
                });
                // 获取聊天对方信息
                getSideInfo(targetRongIdArr, ret.result, cacheFieldName);

        })
        // api.addEventListener({
        //     name: 'historNews'
        // }, function(ret, err) {
        //     if (ret) {
        //         console.log('获取历史消息'+JSON.stringify(ret))
        //         var targetRongIdArr = [];
        //         for (var i = 0; i < ret.value.data.length; i++) {
        //             ret.value.data[i].time = changeTime(ret.value.data[i].receivedTime);
        //             targetRongIdArr.push(ret.value.data[i].targetId);
        //         }
        //         api.execScript({
        //           name: 'main',
        //           // frameName: 'fram0',
        //           script: 'getTotalCount();'
        //         });
        //         // 获取聊天对方信息
        //         getSideInfo(targetRongIdArr, ret.value.data, cacheFieldName);
        //     } else {
        //         alert(JSON.stringify(err.msg));
        //     }
        // });
    }
     // 获取聊天对方信息
    function getSideInfo(rongUserId, data, cacheFieldName) {
       api.ajax({
           url: apiSite + '/user/chatUserInfo',
           method: 'post',
           headers: apiHeader,
           data: {
              values: { 
                  token: $api.getStorage('userToken'),
                  id_json: rongUserId
              }
           }
       }, function(ret, err) {
            if(ret) {
                // console.log('456:::'+JSON.stringify(ret))
                for (var i = 0; i < data.length; i++) {
                    data[i].url = ret.data.list[data[i].targetId].head_img_url;
                    data[i].nickname = ret.data.list[data[i].targetId].nickname;
                    data[i].user_id = ret.data.list[data[i].targetId].user_id;
                    data[i].remark_nickname = ret.data.list[data[i].targetId].remark_nickname;
                    data[i].remark_head_img_url = ret.data.list[data[i].targetId].remark_head_img_url;
                    if (data[i].objectName == 'RC:VcMsg') {
                        // 语音消息
                        data[i].latestMessage.text = '[语音]'
                    } else if (data[i].objectName == 'RC:ImgMsg')
                        data[i].latestMessage.text = '[图片]'

                    if (data[i].latestMessage.extra) {
                        if ($api.strToJson(data[i].latestMessage.extra).type === 4) {
                            if ($api.getStorage(data[i].latestMessage.extra) == 'value') {
                                // 以添加
                                // console.log('已加入本地酷')
                            } else {
                                // 未添加
                                $api.setStorage(data[i].latestMessage.extra, 'value');
                                // 一度人脉好友执行
                                // console.log('一度人脉好友执行')
                                api.execScript({
                                    name: 'listWin_txl_listWin',
                                    frameName: 'txl_listWin_frame',
                                    script: 'requireFriend();'
                                });
                            }
                        }
                    }
                }
                // 网络数据有更新 刷新数据 从新缓存数据
                if (cacheFieldName !== data) {
                    $api.setStorage('chatMessage', data);
                    // console.log('463:::'+JSON.stringify(data))
                    getData(data);
                } 
                
           } else {
               alert(JSON.stringify(err.msg))
           }
       })
    }
    // 滚动到底部触发的事件
    function scrollBotton() {
        // 滚动到底部触发的事件
        api.addEventListener({
            name:'scrolltobottom',
            extra:{
                threshold:0            //设置距离底部多少距离时触发，默认值为0，数字类型
            }
        }, function(ret, err){        
            // alert('已滚动到底部');
        });
    }
    
    // 打开搜索窗口
    function openS() {
        api.openWin({
            name: 'txl_fellowSearch',
            url: './addressList/txl_fellowSearch.html'
        });
    }


    // 关闭添加好友弹窗
    function closeNews() {
        for (var i = 0; i < $api.domAll('.warp').length; i++) {
            $api.css($api.domAll('.warp')[i], 'left: 0rem ');
        } 
        $api.removeCls($api.dom('.addWin'), 'show');
    }

    // doT模版获取数据
    function getData(data) {
        var listTText = $api.byId('listT').text;
        var fnListT = doT.template(listTText);
        var html = fnListT(data);
        var list = $api.dom('.resultList');
        // 替换resultList所有内容
        $api.html(list, html);
        // alert('getData:' + JSON.stringify(data))
    }

    // 打开聊天窗口
    function openChat(ele) {
        // var major_Name = $api.text(ele);
        var nickname = $api.attr(ele, 'data-nickname');
        var remark_nickname = $api.attr(ele, 'data-remark_nickname');
        var targetId = $api.attr(ele, 'data-targetId');
        var userId = $api.attr(ele, 'data-userId');
        var headImg = $api.attr($api.dom(ele, 'img'), 'src');
        if (remark_nickname) {
            nickname = remark_nickname;
        }
        api.openWin({
            name: 'chatWin',
            url: './news/chatPage.html',
            softInputMode: 'auto',
            pageParam: {
                // rongToken: rongToken,
                userId: userId,
                nickname: nickname,
                targetRongId: targetId,
                headImg: headImg
            }
        });
        
    }

    </script>
</body>

</html>