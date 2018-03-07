(function () {
    var classroomPicker = new mui.PopPicker();

    function getClassroom() {
        $.ajax({
            method: 'get',
            url: '/users/get_class_room',
            success: function (data) {
                if (data.code === 0) {
                    var classroom = [];
                    data.data.forEach(function (item) {
                        classroom.push({
                            value: item.roomId,
                            text: item.classroom
                        })
                    });
                    $('#showClassroomPicker').text(classroom[0].text).attr('data-value', classroom[0].value);
                    classroomPicker.setData(classroom);
                    getTimeTable()
                }

            },
            error: {}
        })
    }

    getClassroom();

    document.getElementById('showClassroomPicker').addEventListener('tap', function () {
        classroomPicker.show(function (items) {
            $('#showClassroomPicker').text(items[0].text).attr('data-value', items[0].value);
            getTimeTable();
        })
    });

    $('.date-tab').on('click', '.nav-time', function () {
        $(this).addClass('active').siblings('.nav-time').removeClass('active');
        getTimeTable();
    });

    var weekday = {
        '0': '周日',
        '1': '周一',
        '2': '周二',
        '3': '周三',
        '4': '周四',
        '5': '周五',
        '6': '周六'
    };

    //获取指定的日期
    function getTime(date, num) {
        var oneDay = 24 * 60 * 60 * 1000;
        date.setTime(date.getTime() + num * oneDay);

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        var day = date.getDate();
        var week = date.getDay();

        var fullYear = year + '-' + formatTime(month) + '-' + formatTime(day);
        var time = formatTime(month) + "-" + formatTime(day) + ' ' + weekday[week];
        var format = {
            fullYear: fullYear,
            time: time,
            week: week
        };
        return format;
    }

    //格式化时间
    function formatTime(num) {
        if (num < 10) {
            num = '0' + num;
        }
        return num;
    }

    //循环生成选项卡里面的文字
    $('.nav-time').each(function (index) {
        var time = getTime(new Date(), index);
        $(this).text(time.time).attr('data-week', time.week).attr('data-year', time.fullYear);
    });

    //时间
    document.getElementById('datePicker').addEventListener('tap', function () {
        var _self = this;
        var optionsJson = this.getAttribute('data-options') || '{}';
        var options = JSON.parse(optionsJson);
        var id = this.getAttribute('id');
        _self.picker = new mui.DtPicker(options);
        _self.picker.show(function (rs) {
            /*
             * rs.value 拼合后的 value
             * rs.text 拼合后的 text
             * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
             * rs.m 月，用法同年
             * rs.d 日，用法同年
             * rs.h 时，用法同年
             * rs.i 分（minutes 的第二个字母），用法同年
             */
            $('.nav-time').each(function (index) {
                var time = getTime(new Date(rs.text), index);
                $(this).text(time.time).attr('data-week', time.week).attr('data-year', time.fullYear);
            }).eq(0).addClass('active').siblings('.nav-time').removeClass('active');

            getTimeTable();

            _self.picker.dispose();
            _self.picker = null;
        });

    }, false);

    var timeTableList = [];
    //获取课表
    function getTimeTable() {
        var postData = {
            roomId: $('#showClassroomPicker').attr('data-value'),
            week: $('.date-tab .active').attr('data-week')
        };

        $.ajax({
            method: 'post',
            url: '/users/get_timetable',
            data: postData,
            success: function (data) {
                if (data.code === 0) {
                    timeTableList = data.data;
                    var html = '';

                    //课程信息，用来获取每节课当前预约人数
                    var classInfo = {
                        roomId: $('#showClassroomPicker').attr('data-value'),
                        classIdList: [],
                        time: $('.date-tab .active').attr('data-year')
                    };

                    timeTableList.forEach(function (item, index) {
                        var isOdd = index % 2 === 0 ? 'schedule-odd-row' : 'schedule-double-row';
                        html += '<tr class="' + isOdd + ' schedule-tr">' +
                            '<td class="schedule-first-col">' +
                            '<h5 class="time">' + item.time + '</h5>' +
                            '</td>' +

                            '<td class="schedule-second-col">' +
                            '<h5 class="title">' + item.classname + '</h5>' +
                            '<p class="info">' +
                            '<a class="teacher" href="#">' + item.teacher + '</a>' +
                            '<span class="people-number" style="padding-left: 10px" data-classid="' + item.classId + '"></span>' +
                            '</p>' +
                            '</td>' +

                            '<td class="schedule-third-col">' +
                            '<button class="class-btn" data-classid="' + item.classId + '">预约</button>' +
                            '</td>' +
                            '</tr>';

                        classInfo.classIdList.push(item.classId);
                    });

                    getReservedCount(classInfo);

                    if (html === '') {
                        html += '<tr class="schedule-tr" style="background: #FCFCFC">' +
                            '<td><div class="has-no-class">暂时没有课程</div></td>' +
                            '</tr>'
                    }
                    $('#tableContent').html(html);
                } else {

                }
            },
            error: function (err) {
            }
        });
    }

    function getReservedCount(classIdList) {
        $.ajax({
            method: 'post',
            url: '/users/get_reserved_count',
            data: JSON.stringify(classIdList),
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.code === 0) {
                    console.log(data);
                    for (var i = 0; i < data.data.length; i++) {
                        for(var j in data.data[i]){
                            $('.people-number').each(function (index) {
                                var dataId = $(this).attr('data-classid');
                                console.log(dataId);
                                console.log(i);
                                console.log(dataId === j);
                                if (dataId === j) {
                                    var string = '已预约' + data.data[i][j] + '人';
                                    $(this).text(string);
                                }
                            })
                        }

                    }
                }
            },
            error: function () {
            }
        })
    }
})();