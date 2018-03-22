(function () {
    function getUserBasicInfo() {
        $.ajax({
            method: 'get',
            url: '/user_basic/user_basic_info',
            success: function (data) {
                if (data.code === 0) {
                    console.log(data);
                    $('#username').text(data.data.customerName);
                    $('#cardType').text(data.data.cardType);
                    $('#lastCount').text(data.data.lastCount);
                    $('#lastTime').text(data.data.lastTime);
                }else {
                    mui.alert('获取用户信息失败');
                }
            },
            error: function () {
                mui.alert('操作失败');
            }
        })
    }
    getUserBasicInfo();
})();