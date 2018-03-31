(function () {
    var cardType = undefined;

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
                alert('获取卡种失败');
            }
        })
    }

    function getUserList(method, url, postData) {
        $.ajax({
            method: method,
            url: url,
            async: false,
            data: postData,
            success: function (data) {
                if (data.code === 0) {
                    var userList = data.data;

                    var html = '';
                    var classroom = {
                        '1': '光华逸家教室',
                        '2': '南湖逸家教室',
                        '3': '南阳锦城教室'
                    };
                    for (var i = 0; i < userList.length; i++) {
                        userList[i].cardType = cardType[userList[i].cardType];
                        var item = userList[i];
                        html += '<tr>' +
                            // '<td><input type="checkbox" class="select-member" value="'+item.userId+'"></td>' +
                            '<td><input type="radio" name="select-member" class="select-member" value="' + item.userId + '"></td>' +
                            '<td>' + (item.customerName || '') + '</td>' +
                            '<td>' + (item.username || '') + '</td>' +
                            '<td>' + (classroom[item.createRoom] || '') + '</td>' +
                            // '<td>' + (item.createTeacher || '') + '</td>' +
                            '<td>' + (item.cardType || '') + '</td>' +
                            '<td>' + (item.createTime || '') + '</td>' +
                            '<td>' + (item.openTime || '') + '</td>' +
                            '<td>' + (item.lastTime || '') + '</td>' +
                            '<td>' + (item.totalCount || '') + '</td>' +
                            '<td>' + (item.lastCount || '') + '</td>' +
                            '<td><span data-id="' + item.userId + '" class="class-detail">上课详情</span></td>' + '</tr>'
                    }
                    $('#userListTable').html(html);
                } else {
                    alert('获取会员列表失败');
                }
            },
            error: function () {
            }
        })
    };

    getCardTypeList();
    getUserList('get', '/users/get_user_list', '');

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

    $('#lastTime').daterangepicker({
        autoclose: true,
        singleDatePicker: true,
        startDate: moment(),
        "locale": {
            "format": "YYYY-MM-DD",
            "daysOfWeek": [
                "七",
                "一",
                "二",
                "三",
                "四",
                "五",
                "六"
            ],
            "monthNames": [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            "firstDay": 1
        }
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

    function createMember() {
        getCardList();
        getClassroom();
        getTeacherList();
        $('#createMemberModal').modal('show');
    }

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
                } else {
                    alert('卡种列表获取失败')
                }
            },
            error: function (err) {
                alert('网络连接失败')
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
                    $('#classRoom').html(html);
                } else {
                    alert('教室列表获取失败')
                }
            },
            error: function (err) {
                alert('网络连接失败')
            }
        })
    }

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
                        html += '<option value="' + teacherList[i].teacher_id + '">' + teacherList[i].teacher_name + '</option>'
                    }
                    $('#saler').html(html);
                } else {
                    alert('教室列表获取失败')
                }
            },
            error: function (err) {
                alert('网络连接失败')
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
            alert('请输入会员姓名');
            return;
        }
        if (postData.username === '' || postData.username.length !== 11) {
            alert('请验证会员联系方式是否正确');
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
                    alert('添加失败');
                }
            },
            error: function (err) {
                alert('网络连接失败');
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
            time: getSpeTime().fullDate
        };

        $.ajax({
            method: 'post',
            url: '/users/gift_count',
            data: postData,
            success: function (data) {
                if (data.code === 0) {
                    $('#giftModal').modal('hide').attr('data-id', '');
                    alert('赠送成功');
                    getUserList('get', '/users/get_user_list', '');
                } else {
                    alert('赠送失败');
                }
            },
            error: function (err) {
                alert('网络连接失败');
            }
        })
    })
})();