(function () {
    $('#login').on('click', function () {
        var userInfo = {
            username: $('#userid').val(),
            password: $('#password').val()
        };

        if (!userInfo.username) {
            mui.alert('用户名不能为空', '');
            return;
        }

        if (!$('#password').val()) {
            mui.alert('密码不能为空', '');
            return;
        }
        $.ajax({
            method: 'post',
            url: '/users/login',
            data: userInfo,
            success: function (data) {
                console.log(data);
                if (data.code === 1) {
                    console.log(data);
                    mui.alert(data.msg, '');
                } else {
                    console.log('success');
                    window.location.href = '/time-table';
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    })
})();