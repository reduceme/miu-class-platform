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
                    for (var i = 0; i < userList.length; i++) {
                        userList[i].cardType = cardType[userList[i].cardType];
                        var item = userList[i];
                        html += '<tr>' +
                            '<td>' + item.customerName + '</td>' +
                            '<td>' + item.username + '</td>' +
                            '<td>' + item.createRoom + '</td>' +
                            '<td>' + item.createTeacher + '</td>' +
                            '<td>' + item.cardType + '</td>' +
                            '<td>' + item.createTime + '</td>' +
                            '<td>' + item.openTime + '</td>' +
                            '<td>' + item.lastTime + '</td>' +
                            '<td>' + item.totalCount + '</td>' +
                            '<td>' + item.totalCount + '</td>' +
                            '<td><span data-id="' + item.userId + '" class="class-detail">上课详情</span></td>' + '</tr>'
                    }
                    $('#userListTable').html(html);
                } else {

                }
            },
            error: function () {
            }
        })
    }

    getCardTypeList();
    getUserList('get', '/users/get_user_list', '');

    $('#search').on('click', function () {
        var item = {
            username: $('#searchInfo').val(),
            customerName: $('#searchInfo').val()
        };
        getUserList('post', '/users/get_special_user', item);
    });

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
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        html += '<tr>' +
                            '<td>' + item.time + ' ' + item.t_t_minute + '</td>' +
                            '<td>' + item.classname + '</td>' +
                            '</tr>'
                    }

                    $('#classDetailTable').html(html);
                }
            }
        })
    });


})();