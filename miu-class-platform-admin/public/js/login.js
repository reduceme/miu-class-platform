(function () {
    $('#login').on('click', function () {
        $.ajax({
            method: 'post',
            url: '/users/login',
            data: {
                admin_id: $('#username').val(),
                password: $('#password').val()
            },
            success: function (data) {
                if (data.code === 0) {
                    sessionStorage.setItem("menuList", JSON.stringify(data.data));

                    window.location.href = '/user-list';
                } else {
                    $('#error').modal('show');
                }
            }
        })
    })
})();