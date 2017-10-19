Could not create a template
function: var out = ' ';
}
else if (it.length > 0) {
	out += ' ';
	for (var i = 0; i < it.length; i++) {
		out += ' <div class="warp" onclick="event.stopPropagation();"> <div class="main_no1 flex-def flex-cCenter"> <img src="' + (it[i].head_img_url) + '?imageView2/1/w/150/h/150/interlace/1/q/100|imageslim" data-id="' + (it[i].user_id) + '" onclick="openUserId(this)"> <div class="flex-item flex-def flex-cCenter flex-zBetween"> <div class="flex-def flex-cCenter"> <span>' + (it[i].nickname) + '</span> ';
		if (it[i].current_company == '') {
			out += ' ';
		} else if (it[i].current_position == '') {
			out += ' <span class="textHidden">(' + (it[i].current_company) + ')</span> ';
		} else if (it[i].current_position == '' && it[i].current_company == '') {
			out += ' ';
		} else {
			out += ' <span class="textHidden">(' + (it[i].current_company) + ' ' + (it[i].current_position) + ')</span> ';
		}
		out += ' </div> <!-- <i></i> --> <span class="status">' + (it[i].status) + '</span> </div> </div> <div class="list"  > <div class="borderb" data-id="' + (it[i].order_id) + '" tapmode onclick="openInfo(this)" data-val=\'info\'> <div class="main_no2 flex-def flex-cCenter"> <div class="img"> ';
		if (it[i].image_json[0] == null) {
			out += ' <img src="../../image/noimage.jpg"> ';
		} else {
			out += ' <img src="' + (it[i].image_json[0]) + '?imageView2/1/w/200/h/200/q/75|imageslim"> ';
		}
		out += ' </div> <div class="title flex-item"> <div class="flex-def flex-cCenter"> ';
		if (it[i].type == 1) {
			out += ' <span class="label">[个人]</span> ';
		} else {
			out += ' <span class="label">[公司]</span> ';
		}
		out += ' <h3 class="">' + (it[i].title) + '</h3> </div> <p>' + (it[i].description) + '</p> </div> <div class="jl_right flex-cEnd flex-zTopBottom flex-def"> <p> <span class="money">' + (it[i].price) + '元/' + (it[i].unit) + '</span> </p> <p class="bearFruit ydz"> <span class="count">x' + (it[i].amount) + '</span> </p> </div> </div> </div> <div class="main_no3"> <div class="price"> <p class="wrap"> <span>合计: </span>￥' + (it[i].total_money) + '元 </p> </div> <p class="appraise flex-def flex-cCenter flex-zEnd" tapmode=\'hover\' onclick="event.stopPropagation();"> ';
		for (var j = 0; j < it[i].button.buttonArr.length; j++) {
			out += ' <span data-title="' + (it[i].title) + '" data-reasonList=\'' + (JSON.stringify(it[i].reason_list)) + '\' data-moeny=\'' + (it[i].total_money) + '\' data-id=\'' + (it[i].order_id) + '\' data-supply=\'' + (it[i].supply_id) + '\'  tapmode=\'hover\' onclick="oriderOperate(this)" class="btn" data-url=\'' + (it[i].button.buttonArr[j].url) + '\'>' + (it[i].button.buttonArr[j].key) + '</span> ';
		};
		out += ' </p> </div> </div> </div> ';
	};
	out += ' ';
} else {
	out += ' <div class="nomain flex-def flex-cCenter flex-zCenter"> <div class="wrap"> <div class="icon"> </div> <p>空空如也 ~</p> <!-- <p class="jump" tapmode onclick="openCreateCirclePage()">快去参与喜欢的圈子吧...</p> --> </div> </div> ';
}
return out;
at doT.min.js: 109