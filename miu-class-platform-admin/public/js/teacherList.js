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
                    for (var i = 0; i < teacherList.length; i++) {
                        var item = teacherList[i];
                        html += '<tr>' +
                            '<td><input type="radio" name="select-teacher" class="select-teacher" value="' + item.teacher_id + '"></td>' +
                            '<td>' + (item.teacher_name || '') + '</td>' +
                            '<td>' + (item.phone || '') + '</td>' +
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

    $('#searchInfo').on('change', function () {
        getTeacherList();
    });

    $('.form-inline').on('click', 'button', function () {
        var btnId = $(this).attr('id');
        switch (btnId) {
            case 'newTeacher':
                addTeacher();
                break;
            case 'setStatus':
                setUserStatus();
                break;
        }
    });

    function setUserStatus() {
        var userid = $('.select-teacher:radio[name="select-teacher"]:checked').val();
        if (userid) {
            $('#statusModal').modal('show').attr('data-id', userid);
        }
    }

    $('#statusBtn').on('click', function () {
        var item = {
            status: $('#status').val(),
            userid: $('#statusModal').attr('data-id')
        };

        $.ajax({
            method: 'post',
            url: '/teacher/set_teacher_status',
            data: item,
            success: function (data) {
                if (data.code === 0) {
                    getTeacherList();
                    $('#statusModal').modal('hide').attr('data-id', '');
                }
            }
        })
    });

    function addTeacher() {
        $('#createMemberModal').modal('show');
    }

    $('#createBtn').on('click', function () {
        var item = {
            name: $('#customerName').val(),
            phone: $('#phone').val(),
            status: $('#teacherStatus').val()
        };

        $.ajax({
            method: 'post',
            url: '/teacher/add_teacher',
            data: item,
            success: function (data) {
                if (data.code === 0) {

                }else {
                    alert('添加老师失败');
                }
            },
            error: function (err) {
                alert('网络连接失败');
            }
        })
    })
})();