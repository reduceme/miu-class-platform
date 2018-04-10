(function () {
    //选择时间后获取课程
    $('#time').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        weekStart: 1,
        format: 'yyyy-mm-dd',
        minView: 2,
        maxView: 1,
    }).on('changeDate', function (ev) {
        var week = ev.date.getDay();
        $.ajax({
            method: 'post',
            url: '/reser-record/get_reser_record_class',
            data: {
                week: week
            },
            success: function (data) {
                if (data.code === 0) {
                    console.log(data.data);
                    var html = '';
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        html += '<option value="' + item.classId + '">' + item.classname + '</option>'
                    }
                    $('#classSelect').html(html);
                } else {
                    showNotice('获取课程信息失败');
                }
            },
            error: function () {
                showNotice('网络连接失败');
            }
        })
    });

    $('#addCard').on('click', function () {
        $.ajax({
            method: 'post',
            url: '/reser-record/get_user_class_info',
            data: {
                time: $('#time').val(),
                classId: $('#classSelect').val()
            },
            success: function (data) {
                if (data.code === 0) {
                    var html = '';
                    var isEffective = {
                        '1': '开课',
                        '2': '不满足开课条件，系统自动取消课程',
                        '3': '用户取消课程'
                    };
                    for (var i = 0; i < data.data.length; i++) {
                        var item = data.data[i];
                        html += '<tr>' +
                            '<td>' + item.customerName + '</td>' +
                            '<td>' + item.classname + '</td>' +
                            '<td>' + item.time + '</td>' +
                            '<td>' + isEffective[item.isEffective] + '</td>' +
                            '</tr>';
                    }

                    $('#userListTable').html(html);
                } else {
                    showNotice('获取约课信息失败');
                }
            },
            error: function () {
                showNotice('网络连接失败');
            }
        })
    })
})();