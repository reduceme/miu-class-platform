(function () {
    function getTimeTable() {
        $.ajax({
            method: 'get',
            url: '/class_record/user_has_class_record',
            success: function (data) {
                if (data.code === 0) {
                    var html = '';
                    var status = {
                        '1': '正常开课',
                        '3': '用户取消课程',
                        '4': '未满足开课条件',
                    }
                    for (var i = 0; i < data.data.length; i++) {
                        html += '<li class="mui-table-view-cell">'
                            + '<p class="navigate-left">' + data.data[i].time + '</p>'
                            + '<p class="navigate-center">' + data.data[i].classname + '</p>'
                            + '<p class="navigate-right">' + status[data.data[i].isEffective] + '</p>'
                            + '</li>'
                    }
                    $('#offCanvasContentScroll .mui-table-view').append(html);
                } else {
                    mui.alert(data.msg)
                }
            },
            error: function () {
                mui.alert('操作失败');
            }
        })
    }

    getTimeTable();
})();