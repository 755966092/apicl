var contactArr = {
    "status": true,
    "pages": 3,
    "contacts": [],
    "total": 6987
};
// 获取手机通讯录
function queryContactByPage(page) {
    // console.log('公共js');
    $api.css($api.dom('.loading'), 'display: block');
    var contacts = api.require('contacts');
    if (api.systemType=='ios') {
        // console.log('ios获取');
        contacts.allContacts({
        }, function (ret, err) {
            if (ret) {
                openDb(ret)
            } else {
                alert(JSON.stringify(err));
            }
        });
        // if ("undefined" == typeof page) {
        //     var page = 0;
        // }
        // contacts.queryByPage({
        //     count: 1000,
        //     pageIndex: page
        // }, function (ret, err) {
        //     if (ret.status) {
        //         contactArr.contacts = contactArr.contacts.concat(ret.contacts);
        //         if (page < (ret.pages - 1)) {
        //             queryContactByPage(page + 1);
        //         } else {
                    
        //             openDb(contactArr)
        //         }
        //     } else {
        //         api.toast({
        //             msg: '请在系统的设置-隐私-通讯录界面允许我在访问您的通讯录'
        //         });
        //     }
        // });
    } else {
        if ("undefined" == typeof page) {
            var page = 0;
        }
        contacts.queryByPage({
            count: 1000,
            pageIndex: page
        }, function (ret, err) {
            if (ret.status) {
                contactArr.contacts = contactArr.contacts.concat(ret.contacts);
                if (page < (ret.pages - 1)) {
                    queryContactByPage(page + 1);
                } else {
                    openDb(contactArr)
                }
            } else {
                api.toast({
                    msg: '请在系统的设置-隐私-通讯录界面允许我在访问您的通讯录'
                });
            }
        });
    }
  
}
// 创建数据库
function openDb(retContacts) {
    // console.log('创建数据库');
    db.openDatabase({
        name: 'db_' + $api.getStorage('userToken'),
    },function(ret,err){
        if (ret.status) {
            db.executeSql({
                name: 'db_' + $api.getStorage('userToken'),
                sql: 'CREATE TABLE IF NOT EXISTS addressList_simplify(user_id int PRIMARY KEY NOT NULL, title varchar(255),img varchar(255), subTitle varchar(255), current_contact varchar(255), flag varchar(255), type int,path_direction int)'
            }, function (ret, err) {
                if (ret.status) {
                    // console.log('新建addressList_simplify成功');
                    
                    db.executeSql({
                        name: 'db_' + $api.getStorage('userToken'),
                        sql: 'CREATE TABLE IF NOT EXISTS addressList(user_id int PRIMARY KEY NOT NULL, nickname varchar(255),real_name varchar(255), head_img_url varchar(255), current_position varchar(255), current_company varchar(255), current_degree varchar(255), current_contact varchar(255), titleSize int, title varchar(255), img varchar(255), flag varchar(255), litter varchar(255), type int, sex varchat(10), remark_nickname varchar(255),  remark_real_name varchar(255) , remark_head_img_url varchar(255) , remark_sex varchar(255) , remark_birthday varchar(255) , remark_hometown varchar(255) , remark_current_company varchar(255) , remark_current_position varchar(255) , remark_current_degree varchar(255), remark_current_contact varchar(255), current_status varchar(255))'
                    }, function (ret, err) {
                        if (ret.status) {
                            // console.log('新建addressList成功');
                            
                            db.executeSql({
                                name: 'db_' + $api.getStorage('userToken'),
                                sql: 'DELETE FROM addressList '
                            }, function (retData, err) {
                                if (retData.status) {
                                    // console.log('删除addressList成功');
                                    
                                    db.executeSql({
                                        name: 'db_' + $api.getStorage('userToken'),
                                        sql: 'DELETE FROM addressList_simplify '
                                    }, function (retDataList, err) {
                                        if (retDataList.status) {
                                            // console.log('删除addressList_simplify成功');
                                            contactUpdate(retContacts);
                                        } else {
                                            // console.log(JSON.stringify(err));
                                        }
                                    });
                                } else {
                                    alert('新建表错误:' + JSON.stringify(err));
                                }
                            });
                            
                        } else {
                            // console.log(JSON.stringify(err));
                        }
                    });
                } else {
                    // console.log(JSON.stringify(err));
                }
            });


           
        }else {
            // console.log(JSON.stringify(err));
        }
    });
   
    
}
// 同步通讯录2 上传数据
function contactUpdate(retData) {
    // console.log('上传数据');
    
    api.ajax({
        url: apiSite + '/contact/sync',
        method: 'post',
        headers: apiHeader,
        timeout: 300,
        data: {
            values: {
                token: $api.getStorage('userToken'),
                contact_json: retData
            }
        }
    }, function (ret, err) {
        // 同步通讯录成功
        if (ret) {
            // 请求同步的数据，存到本地数据库
            if (ret.code == 200) {
                requestData();
            } else {
                alert(ret.msg)
            }
        } else {
            alert(JSON.stringify(err.msg))
        }
    })
}

// 同步通讯录3 请求数据

function requestData() {
    // console.log('请求数据');
    
    api.ajax({
        url: apiSite + '/contact/index',
        method: 'post',
        headers: apiHeader,
        data: {
            values: {
                token: $api.getStorage('userToken'),
            }
        }
    }, function (ret, err) {
        if (ret) {
            if (ret.code == 200) {
                api.ajax({
                    url: apiSite + '/contact/friend',
                    method: 'post',
                    headers: apiHeader,
                    data: {
                        values: {
                            token: $api.getStorage('userToken'),
                        }
                    }
                   
                }, function (retFriend, err) {
                    if (retFriend) {
                        if (retFriend.code == 200) {
                            flagFlag = 1;
                            disData(ret.data.friend_list.concat(retFriend.data.list), 4)
                            // 相识好友 1 我认识他 2 他认识我
                            disData(ret.data.single_list, 1, 'single_list')
                            disData(ret.data.both_list, 2)
                            disData(ret.data.unavailable_list, 3);
                        }

                    } else {
                        alert(JSON.stringify(err))
                    }
                })

            } else {
                alert(ret.msg)
            }
        } else {
            alert(JSON.stringify(err))
        }
    })

}

function f_check_uppercase(obj) {
    if (/[A-Za-z]/.test(obj)) {
        return true;
    }
    return false;
}
var  flag = 0;
// 同步通讯录4 处理数据
function disData(data, type) {
    // console.log('处理数据');
    
    flag += 1;
    if (data != '') {
        for (var i = 0; i < data.length; i++) {
            // single_list
            // both_list
            // friend_list
            // 去除空格
            data[i].nickname = $api.trimAll(data[i].nickname)
            if (data[i].remark_nickname) {
                if (f_check_uppercase(PinyinHelper.getShortPinyin(data[i].remark_nickname))) {
                    data[i].litter = PinyinHelper.getShortPinyin(data[i].remark_nickname).toUpperCase();
                } else {
                    data[i].litter = "#"
                }
            } else {
                if (f_check_uppercase(PinyinHelper.getShortPinyin(data[i].nickname))) {

                    data[i].litter = PinyinHelper.getShortPinyin(data[i].nickname).toUpperCase();
                } else {
                    data[i].litter = "#"
                }
            }
            // data[i].litter = PinyinHelper.getShortPinyin(data[i].nickname).toUpperCase();
            data[i].title = data[i].nickname;
            data[i].img = data[i].head_img_url;
            data[i].titleSize = 15;
            if (data[i].current_position == null) {
                data[i].current_position = '';
            }
            if (data[i].current_company == null) {
                data[i].current_company = '';
            }
        }
        // 模块数据格式
        litterSort(data, type)
    }
}
// 同步通讯录5 排序
function litterSort(data, type) {
    // console.log('排序');
    
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (data[i].litter < data[j].litter) {
                var temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    sqlSyntax(data, type);
}
var a = 0;
// 同步通讯录6 拼数据库语法字符串
function sqlSyntax(data1, type) {
    // console.log('拼数据库语法字符串');
    
    for (var i = 0; i < data1.length; i++) {
        data1[i].flag = data1[i].litter[0];
    }
    var SQLName = 'db_' + $api.getStorage('userToken');
    var SQL = 'INSERT OR REPLACE INTO addressList(user_id,nickname,head_img_url,current_company,current_position,current_contact,current_degree, titleSize,title,img,flag,litter,type, sex, remark_nickname, remark_real_name, remark_head_img_url, remark_sex, remark_birthday, remark_hometown, remark_current_company, remark_current_position, remark_current_degree, remark_current_contact) VALUES '
    var SQL2 = 'INSERT OR REPLACE INTO addressList_simplify(user_id,title,img,subTitle,current_contact, flag,type,path_direction) VALUES ';
    for (var i = 0; i < data1.length; i++) {
        var subTitleStr = '',
            contactStr = '';
        SQL += '(' + data1[i].user_id + ',"' + data1[i].nickname + '","' + data1[i].head_img_url + '","' + (data1[i].current_company || "") + '","' + (data1[i].current_position || "") + '","' + (data1[i].current_contact || "") + '","' + (data1[i].current_degree || "") + '","' + data1[i].titleSize + '","' + data1[i].title + '","' + data1[i].img + '","' + data1[i].flag + '","' + data1[i].litter + '","' + type + '","' + (data1[i].sex || 1) + '","' + (data1[i].remark_nickname || "") + '","' + (data1[i].remark_real_name || "") + '","' + (data1[i].remark_head_img_url || "") + '","' + (data1[i].remark_sex || "") + '","' + (data1[i].remark_birthday || "") + '","' + (data1[i].remark_hometown || "") + '","' + (data1[i].remark_current_company || "") + '","' + (data1[i].remark_current_position || "") + '","' + (data1[i].remark_current_degree || "") + '","' + (data1[i].remark_current_contact || "") + '"),';
        if (data1[i].remark_current_company) {
            subTitleStr += data1[i].remark_current_company + " "
        } else if (data1[i].current_company) {
            subTitleStr += data1[i].current_company + " "
        } else {

        }
        if (data1[i].remark_current_position) {
            subTitleStr += data1[i].remark_current_position + " "
        } else if (data1[i].current_position) {
            subTitleStr += data1[i].current_position + " "
        } else {

        }
        if (data1[i].remark_current_degree) {
            subTitleStr += data1[i].remark_current_degree + " "
        } else if (data1[i].current_degree) {
            subTitleStr += data1[i].current_degree + " "
        } else {

        }
        if (data1[i].remark_current_contact) {
            contactStr = data1[i].remark_current_contact;
        } else if (data1[i].current_contact) {
            contactStr = data1[i].current_contact
        } else {

        }
        // subTitleStr
        SQL2 += '(' + data1[i].user_id + ',"' + (data1[i].remark_nickname || data1[i].nickname) + '","' + (data1[i].remark_head_img_url || data1[i].head_img_url) + '","' + subTitleStr + '","' + contactStr + '","' + data1[i].flag + '","' + type + '","' + (data1[i].path_direction || 0) + '"),';
    }
    SQL = SQL.substring(0, SQL.length - 1) + ';'
    SQL2 = SQL2.substring(0, SQL2.length - 1) + ';'
    //         sql: 'CREATE TABLE IF NOT EXISTS addressList_simplify(user_id int PRIMARY KEY NOT NULL, nickname varchar(255),head_img_url varchar(255), current_position varchar(255), current_company varchar(255), current_degree varchar(255), flag varchar(255), type int)'

    db.executeSql({
        name: SQLName,
        sql: SQL2
    }, function (ret, err) {
        if (ret.status) {
            $api.setStorage('apiversion', 'true');
        } else {
            alert(JSON.stringify(err));
        }
    });

    db.executeSql({
        name: SQLName,
        sql: SQL
    }, function (ret, err) {
        if (ret.status) {
            if (flag == 4) {
                $api.rmStorage('noAccessToContacts');
                $api.css($api.dom('.loading'), 'display: none');
                api.toast({
                    msg: '更新通讯录成功',
                    duration: 2000,
                    location: 'bottom'
                });
                $api.rmStorage('contactCount');
                api.sendEvent({
                    name: 'editUserInfoUpdateList'
                });
                flag = 0;
            }
        } else {
        }
    });
}