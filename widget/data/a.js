var name, targetRongId;
apiready = function() {
	moduleInit();
	targetRongId = api.pageParam.targetRongId;
	nickname = api.pageParam.nickname;
	clearState(targetRongId);
	var a = document.getElementById("title");
	$api.html(a, nickname);
	fnInit();
	api.setWinAttr({
		softInputMode: "resize",
	});
	api.openFrame({
		name: "chattContent",
		url: "./chatContent.html",
		softInputMode: "resize",
		rect: {
			x: 0,
			y: headerH,
			w: "auto",
			h: "auto"
		},
		pageParam: {
			nickname: nickname,
			targetRongId: targetRongId,
			userHeadImg: api.pageParam.userHeadImg,
			supplyName: api.pageParam.supplyName,
			priceUint: api.pageParam.priceUint,
		},
		bounces: true
	});
	api.execScript({
		name: "main",
		script: "getTotalCount();"
	})
};

function clearState(a) {
	rong.clearMessagesUnreadStatus({
		conversationType: "PRIVATE",
		targetId: a
	}, function(b, c) {})
}

function chatTools() {
	UIChatBox.open({
		placeholder: "请输入内容",
		maxRows: 6,
		autoFocus: true,
		emotionPath: "widget://res/img/emotion",
		texts: {
			recordBtn: {
				normalTitle: "按住说话",
				activeTitle: "松开结束"
			},
			sendBtn: {
				title: "发送"
			}
		},
		styles: {
			inputBar: {
				borderColor: "#d9d9d9",
				bgColor: "#f2f2f2"
			},
			inputBox: {
				borderColor: "#B3B3B3",
				bgColor: "#FFFFFF"
			},
			emotionBtn: {
				normalImg: "widget://image/chatPage/face1.png"
			},
			extrasBtn: {
				normalImg: "widget://image/chatPage/add1.png"
			},
			keyboardBtn: {
				normalImg: "widget://image/chatPage/key1.png"
			},
			speechBtn: {
				normalImg: "widget://image/chatPage/cam1.png"
			},
			recordBtn: {
				normalBg: "#c4c4c4",
				activeBg: "#999999",
				color: "#000",
				size: 14
			},
			indicator: {
				target: "both",
				color: "#c4c4c4",
				activeColor: "#9e9e9e"
			},
			sendBtn: {
				titleColor: "#fff",
				bg: "#4cc518",
				activeBg: "#46a91e",
				titleSize: 14
			}
		},
		extras: {
			titleSize: 10,
			titleColor: "#a3a3a3",
			btns: [{
				title: "图片",
				normalImg: "widget://image/chatPage/album1.png",
				activeImg: "widget://image/chatPage/album2.png"
			}, {
				title: "拍照",
				normalImg: "widget://image/chatPage/loc1.png",
				activeImg: "widget://image/chatPage/loc2.png"
			}, {
				title: "位置",
				normalImg: "widget://image/chatPage/loc1.png",
				activeImg: "widget://image/chatPage/loc2.png"
			}]
		}
	}, function(a, b) {
		if (a) {
			if (a.eventType === "send") {
				sendMsg(a.msg)
			}
			if (a.eventType === "clickExtras") {
				alert("点击了第" + a.index + "个附加按钮")
			}
		} else {
			alert(JSON.stringify(b.msg))
		}
	})
}

function sendMsg(b) {
	var a;
	rong.sendTextMessage({
		conversationType: "PRIVATE",
		targetId: targetRongId,
		text: b,
		extra: ""
	}, function(c, d) {
		if (c.status == "prepare") {
			a = c.result.message.content.text
		} else {
			if (c.status == "success") {
				api.sendEvent({
					name: "sendMsg",
					extra: {
						msg: a
					}
				})
			} else {
				if (c.status == "error") {
					api.alert({
						title: "title",
						msg: "第三个message" + d.code,
					}, function(e, f) {
						if (e) {
							alert(JSON.stringify(e))
						} else {
							alert(JSON.stringify(f.msg))
						}
					})
				}
			}
		}
	})
};