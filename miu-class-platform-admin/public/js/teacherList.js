(function () {
    function getTeacherList() {
        $.ajax({
            method: 'post',
            url: '/teacher/get_teacher_list',
            data: {
                status: $('#searchInfo').val()
            },
            success: function (data) {
                if (data.code === 0) {
                    var html = '';
                    var teacherList = data.data;
                    var leave = {
                        '1': '超级管理员'
                    }
                    for (var i = 0; i < teacherList.length; i++) {
                        var item = teacherList[i];
                        html += '<tr>' +
                            '<td><input type="radio" name="select-teacher" class="select-teacher" value="' + item.teacher_id + '"></td>' +
                            '<td>' + (item.teacher_name || '') + '</td>' +
                            '<td>' + (item.phone || '') + '</td>' +
                            '<td>' + (item.teacher_leave || '') + '</td>' +
                            '</tr>'
                    }

                    $('#teacherListTable').html(html);
                } else {
                    alert('获取教师列表失败');
                }
            },
            error: function (err) {
                alert('网络连接失败');
            }
        })
    }

    getTeacherList();
})();