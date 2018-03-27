(function () {
    function getUserList() {
        $.ajax({
            method: 'get',
            url: '/users/get_user_list',
            success: function (data) {
                if (data.code === 0) {
                    var userList = data.data.userList;
                    var cardType = data.data.cardType;

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

    getUserList();

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
                    console.log(data.data);
                }
            }
        })
    })
})();