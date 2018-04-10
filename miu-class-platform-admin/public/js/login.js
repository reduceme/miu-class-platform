(function () {
    $('#login').on('click', function () {
        $.ajax({
            method: 'post',
            url: '/users/login',
            data: {
                admin_id: $('#username').val(),
                password: $('#password').val()
            },
            async: false,
            success: function (data) {
                if (data.code === 0) {
                    sessionStorage.setItem("menuList", JSON.stringify(data.data));
                    window.location.href = '/user-list';
                } else {
                    showNotice('用户名或密码错误');
                }
            }
        })
    })
})();