(function () {
    var cardList = {};
    function getCardName() {
        $.ajax({
            method: 'get',
            url: '/card_record/get_card_record',
            async: false,
            success: function (data) {
                if (data.code === 0) {
                    cardList = data.data;
                } else {
                    showNotice('获取卡种失败');
                }
            },
            error: function () {
                showNotice('网络连接失败');
            }
        })
    }
    getCardName();

    function getGiftRecord(name) {
        $.ajax({
            method: 'post',
            url: '/card_record/get_card_record',
            data: {
                username: name
            },
            success: function (data) {
                if (data.code === 0) {
                    getCardName();
                    var html = '';
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        html += '<tr>' +
                            '<td>' + item.customerName + '</td>' +
                            '<td>' + item.username + '</td>' +
                            '<td>' + item.update_time + '</td>' +
                            '<td>' + cardList[item.prev_card_type] + '</td>' +
                            '<td>' + cardList[item.now_card_type] + '</td>' +
                            '<td>' + item.remark + '</td>' +
                            '<td>' + item.teacher_name + '</td>' +
                            '</tr>';
                    }
                    $('#cardRecordTable').html(html);
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