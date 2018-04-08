(function () {
    function createTimetableContainer() {
        var html = '<span class="class-name"></span><br/>' +
            '<span class="class-teacher"></span><br/>' +
            '<span class="class-max-student"></span><br/>' +
            '<span class="class-min-student"></span><br/>' +
            '<span class="class-swipe"></span><br/>' +
            '<span class="class-time"></span>';
        $('.class-info').append(html);
    }

    createTimetableContainer();

    //对象分组
    function objGroup(arr) {
        var map = {};
        var dest = [];
        for (var i = 0; i < arr.length; i++) {
            var ai = arr[i];
            if (!map[ai.week]) {
                dest.push({
                    week: ai.week,
                    data: [ai]
                });
                map[ai.week] = ai;
            } else {
                for (var j = 0; j < dest.length; j++) {
                    var dj = dest[j];
                    if (dj.week === ai.week) {
                        dj.data.push(ai);
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
                        '6': 'saturday-class'
                    };

                    //根据周次，对课程进行分组并根据time进行排序
                    var groupList = objGroup(data.data);
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

                    console.log(groupList);
                    if (groupList.length === 0) {
                        $('.class-info').attr('data-id', '').children().text('');
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

    $('.class-info').on('click', function () {
        $('.class-info').removeClass('active');
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

    function changeClassInfo() {
        var classId = $('.active').attr('data-id');
        if (classId) {
            $.ajax({
                method: 'post',
                url: '',
                data: {
                    classId: classId
                },
                success: function (data) {
                    if (data.code === 0) {

                    }
                },
                error: function (err) {
                    alert('请检查网络连接');
                }
            });
            console.log(classId);
        }
    }

    function deleteClassInfo() {
        var classId = $('.active').attr('data-id');
        if (classId) {
            console.log(classId);
        } else {
            alert('请选择要修改的课程');
        }
    }
})();