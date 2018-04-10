(function () {
    function getGiftRecord(name) {
        $.ajax({
            method: 'post',
            url: '/gift_info/get_gift_record',
            data: {
                username: name
            },
            success: function (data) {
                if (data.code === 0) {
                    console.log(data.data);
                    var html = '';
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        html += '<tr>' +
                            '<td>' + item.customerName + '</td>' +
                            '<td>' + item.username + '</td>' +
                            '<td>' + item.gift_time + '</td>' +
                            '<td>' + item.gift_count + '</td>' +
                            '<td>' + item.gift_remark + '</td>' +
                            '<td>' + item.teacher_name + '</td>' +
                            '</tr>';
                    }
                    $('#giftDetailTable').html(html);
                } else {
                    showNotice('获取赠送记录失败');
                }
            },
            error: function () {
                showNotice('网络连接失败');
            }
        })
    }

    getGiftRecord('');

    $('#search').on('click', function () {
        getGiftRecord($('#username').val());
    })
})();