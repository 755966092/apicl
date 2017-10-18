Could not create a template
function: var out = ' ';
if (it.length > 0) {
	out += ' ';
	for (var i = 0; i < it.length; i++) {
		out += ' <div class="wrap"> <div class="item"> <div class="user flex-cCenter flex-def" data-id="' + (it[i].user_id) + '" tapmode onclick="openUserInfo(this)"> <div class="img"> ';
		if (it[i].head_img_url) {
			out += ' <img src="' + (it[i].head_img_url) + '"> ';
		} else {
			out += ' <img src="../../image/noimage.jpg"> ';
		}
		out += ' </div> <div class="text flex-def flex-cCenter"> <h3>' + (it[i].nickname) + '</h3> ';
		if (it[i].current_company == null) {
			out += ' ';
			if (it[i].current_company == '') {
				out += ' ';
			} else if (it[i].current_position == '') {
				out += ' <p>(' + (it[i].current_company) + ')</p> ';
			} else if (it[i].current_company != '' && it[i].current_position != '') {
				out += ' <p>(' + (it[i].current_company) + ' ' + (it[i].current_position) + ')</p> ';
			} else {
				out += ' ';
			}
			out += ' </div> </div> <div class="info flex-cCenter flex-def"  tapmode onclick="openInfo(this)" data-id="' + (it[i].demand_id) + '"> <div class="img"> ';
			if (it[i].image_json[0]) {
				out += ' <img src="' + (it[i].image_json[0]) + '"> ';
			} else {
				out += ' <img src="../../image/noimage.jpg"> ';
			}
			out += ' </div> <div class="text flex-item"> <div class="top flex-def flex-zBetween flex-cCenter"> <div class="div flex-def flex-cCenter"> ';
			if (it[i].type == 1) {
				out += ' <span class="label">[个人]</span> ';
			} else {
				out += ' <span class="label">[公司]</span> ';
			}
			out += ' <span class="title">' + (it[i].title) + '</span> </div> <span class="price">' + (it[i].reward) + '元</span> </div> <div class="bottom flex-def flex-zBetween"> <div class="left"> ' + (it[i].description) + ' </div> <div class="right"> ' + (it[i].create_time) + ' </div> </div> </div> </div> </div> </div> ';
		}
		out += ' ';
	} else {
		out += ' <p class="no_data">暂无数据</p> ';
	}
	out += ' ';
	return out;
	at doT.min.js: 109