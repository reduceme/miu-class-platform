(function () {
    var cardType = undefined;

    $('.order-td').mouseover(function () {
        $(this).children('.order-ul').show();
    }).mouseout(function () {
        $(this).children('.order-ul').hide();
    });

    function getCardTypeList() {
        $.ajax({
            method: 'get',
            url: '/users/get_card_type_list',
            async: false,
            success: function (data) {
                if (data.code === 0) {
                    cardType = data.data;
                }
            },
            error: function () {
                showNotice('获取卡种失败');
            }
        })
    };

    function getUserList(method, url, postData) {
        $.ajax({
            method: method,
            url: url,
            async: false,
            data: postData,
            success: function (data) {
                if (data.code === 0) {
                    var userList = data.data;
                    var html = createList(userList);
                    $('#userListTable').html(html);
                    //排序
                    orderUserList(userList);
                } else {
                    showNotice('获取会员列表失败');
                }
            },
            error: function () {
            }
        })
    };

    getCardTypeList();
    getUserList('get', '/users/get_user_list', '');

    function orderUserList(userList) {
        $('input[name="orderRadio"]').on('click', function () {
            var orderData = $(this).val();
            var orderDirect = $(this).attr('data-value');
            userList.sort(compare(orderData, orderDirect));
            var html = createList(userList);
            $('#userListTable').html(html);
        });
    }

    function compare(propertyName, orderDirect) {
        return function (object1, object2) {
            var value1 = object1[propertyName];
            var value2 = object2[propertyName];
            if (orderDirect === 'desc') {
                if (value1 > value2) {
                    return 1;
                } else if (value1 < value2) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                if (value1 < value2) {
                    return 1;
                } else if (value1 > value2) {
                    return -1;
                } else {
                    return 0;
                }
            }
        };
    }

    function createList(userList) {
        var html = '';
        var classroom = {
            '1': '光华逸家教室',
            '2': '南湖逸家教室',
            '3': '南阳锦城教室'
        };
        for (var i = 0; i < userList.length; i++) {
            var item = userList[i];
            html += '<tr>' +
                '<td><input type="radio" name="select-member" class="select-member" data-lasttime="' + (item.lastTime || '') + '" data-card="' + (item.cardType || '') + '" data-name="' + (item.customerName || '') + '" value="' + item.userId + '"></td>' +
                '<td>' + (item.customerName || '') + '</td>' +
                '<td>' + (item.username || '') + '</td>' +
                '<td>' + (classroom[item.createRoom] || '') + '</td>' +
                '<td>' + (cardType[item.cardType] || '') + '</td>' +
                '<td>' + (item.createTime || '') + '</td>' +
                '<td>' + (item.openTime || '') + '</td>' +
                '<td>' + (item.lastTime || '') + '</td>' +
                '<td>' + (item.totalCount || '') + '</td>' +
                '<td>' + (item.lastCount || '') + '</td>' +
                '<td><span data-id="' + item.userId + '" class="class-detail">上课详情</span></td>' +
                '<td><span data-name="' + item.customerName + '" data-id="' + item.userId + '" class="user-body-info">体测信息</span></td>' + '</tr>'
        }
        return html;
    }

    $('#userListTable').on('click', '.class-detail', function () {
        var userId = $(this).attr('data-id');
        $.ajax({
            method: 'post',
            url: '/users/get_user_class_detail',
            data: {
                userId: userId
            },
            success: function (data) {
                if (data.code === 0) {
                    $('#classDetailModal').modal('show');
                    var html = '';
                    var status = {
                        '1': '正常开课',
                        '3': '用户取消',
                        '4': '系统取消'
                    };
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        html += '<tr>' +
                            '<td>' + item.time + ' ' + item.t_t_minute + '</td>' +
                            '<td>' + item.classname + '</td>' +
                            '<td>' + status[item.isEffective] + '</td>' +
                            '</tr>'
                    }

                    $('#classDetailTable').html(html);
                }
            }
        })
    });

    $('#userListTable').on('click', '.user-body-info', function () {
        var userId = $(this).attr('data-id');
        var cusName = $(this).attr('data-name');
        $.ajax({
            method: 'post',
            url: '/users/select_body_info',
            data: {
                userid: userId
            },
            success: function (data) {
                if (data.code === 0) {
                    var html = '';
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        html += '<tr>' +
                            '<td>' + cusName + '</td>' +
                            '<td>' + item.time + '</td>' +
                            '<td>' + item.weight + '</td>' +
                            '<td>' + item.fat_percentage + '</td>' +
                            '<td>' + item.water + '</td>' +
                            '<td>' + item.metabolism + '</td>' +
                            '<td>' + item.haslet_fat + '</td>' +
                            '<td>' + item.haslet_fat_index + '</td>' +
                            '<td>' + item.body_age + '</td>' +
                            '<td>' + item.bottom_bust + '</td>' +
                            '<td>' + item.waist + '</td>' +
                            '<td>' + item.butt + '</td>' +
                            '<td>' + item.thigh + '</td>' +
                            // '<td>' + item.manage_id + '</td>' +
                            '</tr>'
                    }
                    $('#userBodyInfoTable').html(html);
                    $('#userBodyInfo').modal('show');
                } else {
                    showNotice('查询失败');
                }
            },
            error: function () {
                showNotice('网络连接失败');
            }
        })
    });

    $('.time').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        weekStart: 1,
        format: 'yyyy-mm-dd',
        minView: 2,
        maxView: 1
    });

    //各种点击事件
    $('.form-group').on('click', 'button', function () {
        var btnId = $(this).attr('id');
        switch (btnId) {
            case 'search':
                searchMember();
                break;
            case 'newMember':
                createMember();
                break;
            case 'gift':
                giftCount();
                break;
            case 'update':
                updateUserCard();
                $('#changeBtn').off().on('click', function () {
                    changeFn('/users/update_customer_card');
                });
                break;
            case 'cardUpdate':
                updateUserCard();
                $('#changeBtn').off().on('click', function () {
                    changeFn('/users/card_update_info');
                });
                break;
            case 'addBodyInfo':
                addBodyInfoFn();
                break;
        }
    });

    function searchMember() {
        var item = {
            username: $('#searchInfo').val(),
            customerName: $('#searchInfo').val(),
            lastTime: $('#lastTime').val()
        };
        if (item.username || item.customerName || item.lastTime) {
            getUserList('post', '/users/get_special_user', item);
        } else {
            getUserList('get', '/users/get_user_list', '');
        }
    }

    $('.select-classroom-detail').on('change', function () {
        var isEffective = $('#isEffective').val();
        var item = {
            createRoom: $('#createRoom').val(),
            lastTime: ''
        };
        if (isEffective === '1') {
            item.lastTime = getSpeTime().date;
        }
        getUserList('post', '/users/get_special_classroom_user', item);
    });

    function createMember() {
        getTeacherList();
        $('#createMemberModal').modal('show');
    }

    getCardList();

    //获取卡种列表
    function getCardList() {
        $.ajax({
            method: 'get',
            url: '/users/get_card_type_for_create_member',
            success: function (data) {
                if (data.code === 0) {
                    var cardList = data.data;
                    var html = '';
                    for (var i = 0; i < cardList.length; i++) {
                        html += '<option data-count="' + cardList[i].cardCount + '" value="' + cardList[i].cardTypeId + '">' + cardList[i].cardName + '</option>'
                    }
                    $('#cardType').html(html);
                    $('#changeCardType').html(html);
                } else {
                    showNotice('卡种列表获取失败')
                }
            },
            error: function (err) {
                showNotice('网络连接失败')
            }
        })
    }

    //获取教室列表
    function getClassroom() {
        $.ajax({
            method: 'get',
            url: '/users/get_classroom',
            success: function (data) {
                if (data.code === 0) {
                    var classroom = data.data;
                    var html = '';
                    for (var i = 0; i < classroom.length; i++) {
                        html += '<option value="' + classroom[i].roomId + '">' + classroom[i].classroom + '</option>'
                    }
                    $('#createRoom').append(html);
                    $('#classRoom').html(html);
                } else {
                    showNotice('教室列表获取失败')
                }
            },
            error: function (err) {
                showNotice('网络连接失败')
            }
        })
    }

    getClassroom();

    //获取售卡人员列表
    function getTeacherList() {
        $.ajax({
            method: 'get',
            url: '/users/get_teacher_list',
            success: function (data) {
                if (data.code === 0) {
                    var teacherList = data.data;
                    var html = '';
                    for (var i = 0; i < teacherList.length; i++) {
                        html += '<option value="' + teacherList[i].admin_id + '">' + teacherList[i].teacher_name + '</option>'
                    }
                    $('#saler').html(html);
                } else {
                    showNotice('教室列表获取失败')
                }
            },
            error: function (err) {
                showNotice('网络连接失败')
            }
        })
    }

    //会员数据
    function getMemberData() {
        var username = $('#username').val();
        var postData = {
            customerName: $('#customerName').val(),
            username: username,
            cardType: $('#cardType').val(),
            totalCount: $('#cardType option:selected').attr('data-count'),
            password: username.slice(5, 11),
            createTime: getSpeTime().date,
            createRoom: $('#classRoom').val(),
            createTeacher: $('#saler').val()
        };
        return postData;
    }

    function getSpeTime() {
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var day = time.getDate();

        var hour = time.getHours();
        var minute = time.getMinutes();
        var date = year + '-' + format(month) + '-' + format(day);
        var fullDate = year + '-' + format(month) + '-' + format(day) + ' ' + format(hour) + ':' + format(minute);
        return {
            date: date,
            fullDate: fullDate
        };
    }

    function format(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

    //创建会员
    function addMember() {
        var postData = getMemberData();
        if (postData.customerName === '') {
            showNotice('请输入会员姓名');
            return;
        }
        if (postData.username === '' || postData.username.length !== 11) {
            showNotice('请验证会员联系方式是否正确');
            return;
        }

        $.ajax({
            method: 'post',
            url: '/users/create_member',
            data: postData,
            success: function (data) {
                if (data.code === 0) {
                    $('#customerName').val('');
                    $('#username').val('');
                    $('#createMemberModal').modal('hide');
                    getUserList('get', '/users/get_user_list', '');
                } else {
                    showNotice('添加失败');
                }
            },
            error: function (err) {
                showNotice('网络连接失败');
            }
        })
    }

    $('#createBtn').on('click', function () {
        addMember();
    });

    //赠送次数
    function giftCount() {
        var userid = $('.select-member:radio[name="select-member"]:checked').val();
        if (userid) {
            $('#giftModal').modal('show').attr('data-id', userid);
        }
    }

    $('#giftBtn').on('click', function () {
        var postData = {
            userid: $('#giftModal').attr('data-id'),
            count: $('#giftNumber').val(),
            time: getSpeTime().fullDate,
            remark: $('#giftReamrk').val()
        };

        if (postData.count && postData.remark) {
            $.ajax({
                method: 'post',
                url: '/users/gift_count',
                data: postData,
                success: function (data) {
                    if (data.code === 0) {
                        $('#giftModal').modal('hide').attr('data-id', '');
                        showNotice('赠送成功');
                        $('.gift-info').val('');
                        getUserList('get', '/users/get_user_list', '');
                    } else {
                        showNotice('赠送失败');
                    }
                },
                error: function (err) {
                    showNotice('网络连接失败');
                }
            })
        } else {
            showNotice('请完善赠送信息');
        }
    });

    //修改
    function updateUserCard() {
        var checked = $('.select-member:radio[name="select-member"]:checked');
        var userid = checked.val();
        var cardid = checked.attr('data-card');
        var username = checked.attr('data-name');
        var lastTime = checked.attr('data-lasttime');
        if (userid) {
            $('#changeCardModal').modal('show').attr('data-id', userid).attr('data-last-card-type', cardid);
            $('#name').val(username + ' ' + (lastTime) + '（失效日期）');
            $('#changeCardType').val(cardid);
            $('#changeLastTime').val(lastTime);
        }
    }

    function changeFn(url) {
        var postData = {
            userid: $('#changeCardModal').attr('data-id'),
            time: getSpeTime().fullDate,
            prevType: $('#changeCardModal').attr('data-last-card-type'),
            nowType: $('#changeCardType').val(),
            remark: $('#remark').val(),
            totalCount: $('#changeCardType option:selected').attr('data-count'),
            lastTime: $('#changeLastTime').val()
        };

        if (!$('#changeLastTime').val()) {
            showNotice('请完善相关信息');
            return
        }

        if (postData.remark) {
            $.ajax({
                method: 'post',
                // url: '/users/update_customer_card',
                url: url,
                data: postData,
                success: function (data) {
                    if (data.code === 0) {
                        showNotice('修改成功');
                        $('#changeCardModal').modal('hide').attr('data-id', '').attr('data-last-card-type', '');
                        $('.change-info').val('');
                        getUserList('get', '/users/get_user_list', '');
                    } else {
                        showNotice('修改失败');
                    }
                },
                error: function (err) {
                    showNotice('网络连接失败');
                }
            })
        } else {
            showNotice('请填写备注信息');
        }
    }

    function addBodyInfoFn() {
        var checked = $('.select-member:radio[name="select-member"]:checked');
        var userid = checked.val();
        if (userid) {
            $('#addBodyInfoModal').modal('show').attr('userid', userid);
        }
    }

    $('#addBodyInfoBtn').on('click', function () {
        var inputList = $('#addBodyInfoModal .form-control');
        var postData = {};
        for (var i = 0; i < inputList.length; i++) {
            var keyList = (inputList.eq(i).attr('id'));
            var valueList = (inputList.eq(i).val());
            if (!valueList) {
                showNotice('请完善体侧信息');
                return;
            }
            postData[keyList] = valueList;
        }
        postData.userid = $('#addBodyInfoModal').attr('userid');
        postData.time = getSpeTime().fullDate;

        $.ajax({
            method: 'post',
            url: '/users/insert_body_info',
            data: postData,
            success: function (data) {
                if (data.code === 0) {
                    showNotice('添加成功');
                    inputList.val('');
                    $('#addBodyInfoModal').modal('hide');
                } else {
                    showNotice('添加失败');
                }
            },
            error: function (data) {
                showNotice('网络连接失败');
            }
        })
    })
})();