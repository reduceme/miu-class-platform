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

        var month = date.getMonth() + 1;
        var day = date.getDate();
        var week = date.getDay();

        var time = formatTime(month) + "-" + formatTime(day) + ' ' + weekday[week];
        var format = {
            time: time,
            week: week
        }
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
        $(this).text(time.time).attr('data-week', time.week);
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
                $(this).text(time.time).attr('date-week', time.week);
            });

            $('.nav-time').eq(0).addClass('active').siblings('.nav-time').removeClass('active');

            _self.picker.dispose();
            _self.picker = null;
        });

    }, false);

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
                console.log(data);
                if (data.code === 0) {
                    console.log(data.data);
                }
            },
            error: function (err) {
            }
        });
    }

    var tableTimeList = [{
        time: '10:00',
        classname: '空中瑜伽',
        teacher: '妙妙老师',
        hasReservation: '1',
        lastReservation: '2',
        classId: '1'
    }, {
        time: '15:00',
        classname: '产后修复',
        teacher: '妙妙老师',
        hasReservation: '1',
        lastReservation: '2',
        classId: '2'
    }, {
        time: '18:30',
        classname: '初级瑜伽',
        teacher: '妙妙老师',
        hasReservation: '1',
        lastReservation: '2',
        classId: '3'
    }]
})();