(function () {
    $('#time').datetimepicker({
        language: 'zh-CN',
        autoclose: true,
        weekStart: 1,
        todayBtn: 1,
        format: 'hh:ii',
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0
    });

    //课表容器
    function createTimetableContainer() {
        var html = '<span class="class-name"></span><br/>' +
            '<span class="class-teacher"></span><br/>' +
            '<span class="class-time"></span><br/>' +
            '<span class="class-max-student"></span><br/>' +
            '<span class="class-min-student"></span><br/>' +
            '<span class="class-swipe"></span><br/>';
        $('.class-info').append(html);
    }

    //对象分组
    function objGroup(arr) {
        var map = {};
        var dest = [];
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];
            if (!map[ai.week]) {
                dest.push({
                    week: ai.week,
                    data: [ai],
                    dataLength: 1
                });
                map[ai.week] = ai;
            } else {
                for (var j = 0; j < dest.length; j++) {
                    var dj = dest[j];
                    if (dj.week === ai.week) {
                        dj.data.push(ai);
                        dj.dataLength++;
                        break;
                    }
                }
            }
        }

        //根据time排序
        for (var i in dest) {
            var sidOrder = dest[i].data.sort(
                function (a, b) {
                    if (a.time < b.time) return -1;
                    if (a.time > b.time) return 1;
                    return 0;
                }
            );
            dest[i].data = sidOrder;
        }
        return dest;
    }

    function getTimetable(roomid) {
        $.ajax({
            method: 'post',
            url: '/timetable/get_timetable',
            data: {
                roomId: roomid
            },
            success: function (data) {
                if (data.code === 0) {
                    var classDic = {
                        '1': 'monday-class',
                        '2': 'tuesday-class',
                        '3': 'wednesday-class',
                        '4': 'thurday-class',
                        '5': 'friday-class',
                        '6': 'saturday-class',
                        '7': 'sunday-class'
                    };

                    //简历课表的行
                    var html = '<tr>' +
                        '<td class="monday-class class-info"></td>' +
                        '<td class="tuesday-class class-info"></td>' +
                        '<td class="wednesday-class class-info"></td>' +
                        '<td class="thurday-class class-info"></td>' +
                        '<td class="friday-class class-info"></td>' +
                        '<td class="saturday-class class-info"></td>' +
                        '<td class="sunday-class class-info"></td>' +
                        '</tr>';


                    //根据周次，对课程进行分组并根据time进行排序
                    var groupList = objGroup(data.data);

                    var maxLen = 0;
                    for (var j = 0, len = groupList.length; j < len; j++) {
                        if (maxLen < groupList[j].dataLength) {
                            maxLen = groupList[j].dataLength;
                        }
                    }

                    $('#timetableList').empty();
                    for (var l = 0; l < maxLen; l++) {
                        $('#timetableList').append(html);
                    }
                    createTimetableContainer();

                    $('.class-info').attr('data-id', '').children().text('');
                    for (var i = 0; i < groupList.length; i++) {
                        var classname = classDic[groupList[i].week];
                        $('.' + classname).each(function (index) {
                            var item = groupList[i].data[index];
                            if (item) {
                                $(this).attr('data-id', item.classId);
                                $(this).children('.class-name').text(item.classname);
                                $(this).children('.class-teacher').text(item.teacher);
                                $(this).children('.class-max-student').text('最多人次：' + item.maxCount);
                                $(this).children('.class-min-student').text('最少人次：' + item.minCount);
                                $(this).children('.class-swipe').text('刷卡次数：' + item.swipeNumber);
                                $(this).children('.class-time').text('上课时间：' + item.time);
                            }
                        });
                    }
                } else {
                    alert('获取课表失败');
                }
            },
            error: function (err) {
                alert('请检查网络连接');
            }
        })
    }

    getTimetable('1');

    //获取教室信息
    function getClassroom() {
        $.ajax({
            method: 'get',
            url: '/timetable/get_classroom',
            success: function (data) {
                if (data.code === 0) {
                    var classroomList = data.data;
                    var html = '';
                    for (var i = 0; i < classroomList.length; i++) {
                        html += '<option value="' + classroomList[i].roomId + '">' + classroomList[i].classroom + '</option>'
                    }
                    $('#roomSelect').html(html);
                    $('#roomId').html(html);
                } else {
                    alert('获取教室信息失败');
                }
            },
            error: function () {
                alert('请检查网络连接');
            }
        })
    }

    getClassroom();

    //获取教师列表
    function getTeacherList() {
        $.ajax({
            method: 'get',
            url: '/timetable/get_teacher_list',
            success: function (data) {
                if (data.code === 0) {
                    var html = '';
                    var teacherList = data.data;
                    for (var i = 0; i < teacherList.length; i++) {
                        var item = teacherList[i];
                        html += '<option value="' + item.teacher_name + '" data-id="' + item.admin_id + '">' + item.teacher_name + '</option>'
                    }
                    $('#teacher').html(html);
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

    $('#timetableList').on('click', '.class-info', function () {
        $('#timetableList tr .class-info').removeClass('active');
        $(this).addClass('active');
    });

    $('.form-inline').on('click', 'button', function () {
        var btnId = $(this).attr('id');
        switch (btnId) {
            case 'searchClass':
                getTimetable($('#roomSelect').val());
                break;
            case 'changeClass':
                changeClassInfo();
                break;
            case 'deleteClass':
                deleteClassInfo();
                break;
        }
    });

    //获取修改的课程的详细信息
    function changeClassInfo() {
        var classId = $('.active').attr('data-id');
        if (classId) {
            $.ajax({
                method: 'post',
                url: '/timetable/get_special_class',
                data: {
                    classId: classId
                },
                success: function (data) {
                    if (data.code === 0) {
                        $('#classInfoModal').modal('show').attr('data-classid', classId);
                        for (var i in data.data) {
                            $('#' + i).val(data.data[i]);
                        }
                    }
                },
                error: function (err) {
                    alert('请检查网络连接');
                }
            });
        } else {
            $('#classInfoModal').modal('show').attr('data-classid', '');
            $('.class-detail').val('');
        }
    }

    function getCreateInfo() {
        var postData = {
            classname: $('#classname').val(),
            roomId: $('#roomId').val(),
            teacher: $('#teacher').val(),
            week: $('#week').val(),
            time: $('#time').val(),
            classType: $('#classType').val(),
            maxCount: $('#maxCount').val(),
            minCount: $('#minCount').val(),
            swipeNumber: $('#swipeNumber').val(),
            classId: $('#classInfoModal').attr('data-classid')
        };

        return postData;
    }

    $('#createBtn').on('click', function () {
        var classInfo = getCreateInfo();

        var flag = true;
        $('.class-require').each(function () {
            if (!$(this).val()) {
                flag = false;
            }
        });

        if (flag) {
            $.ajax({
                method: 'post',
                url: '/timetable/insert_new_class',
                data: classInfo,
                success: function (data) {
                    if (data.code === 0) {
                        alert('修改成功');
                        $('#classInfoModal').modal('hide').attr('data-classid', '');
                        getTimetable($('#roomSelect').val());
                    } else {
                        alert('添加失败');
                    }
                },
                error: function () {
                    alert('网络连接失败');
                }
            })
        } else {
            alert('请完成课程详细信息;');
            return;
        }
    });

    function deleteClassInfo() {
        var classId = $('.active').attr('data-id');
        if (classId) {
            $.ajax({
                method: 'post',
                url: '/timetable/delete_class_info',
                data: {
                    classId: classId
                },
                success: function (data) {
                    if (data.code === 0) {
                        alert('删除成功');
                        getTimetable($('#roomSelect').val());
                    } else {
                        alert('删除失败')
                    }
                },
                error: function () {
                    alert('网络连接失败');
                }
            })
        } else {
            alert('请选择要修改的课程');
        }
    }
})();