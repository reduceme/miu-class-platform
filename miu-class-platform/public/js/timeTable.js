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

        var hours = date.getHours();
        var minute = date.getMinutes();

        var fullYear = year + '-' + formatTime(month) + '-' + formatTime(day);
        var completeTime = year + '-' + formatTime(month) + '-' + formatTime(day) + ' ' + formatTime(hours) + ':' + formatTime(minute);

        var time = formatTime(month) + "-" + formatTime(day) + ' ' + weekday[week];
        var format = {
            //2018-03-09
            fullYear: fullYear,
            //2018-03-09 14:00
            completeTime: completeTime,
            //03-09 周五
            time: time,
            //5
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
            beforeSend: function () {
                $('.loading').show()
            },
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
                            '<h5 class="time" data-complate-time="' + classInfo.time + ' ' + item.time + '">' + item.time + '</h5>' +
                            '</td>' +

                            '<td class="schedule-second-col">' +
                            '<h5 class="title">' + item.classname + '</h5>' +
                            '<p class="info">' +
                            '<a class="teacher" href="#">' + item.teacher + '</a>' +
                            '<span class="people-number" style="padding-left: 10px" data-max="' + item.maxCount + '" data-min="' + item.minCount + '" data-classid="' + item.classId + '"></span>' +
                            '</p>' +
                            '</td>' +

                            '<td class="schedule-third-col" data-card-count="' + item.swipeNumber + '">' +
                            '<button class="class-btn" data-classid="' + item.classId + '">预约</button>' +
                            '</td>' +
                            '</tr>';

                        classInfo.classIdList.push(item.classId);
                    });

                    if (html === '') {
                        html += '<tr class="schedule-tr" style="background: #FCFCFC">' +
                            '<td><div class="has-no-class">暂时没有课程</div></td>' +
                            '</tr>'
                    }

                    $('#tableContent').html(html);
                    getReservedCount(classInfo);
                } else {

                }
            },
            error: function (err) {
            }
        });
    }

    //获取课程的预约人次
    function getReservedCount(classInfo) {
        var time = $('.date-tab .active').attr('data-year');

        var minute = getTime(new Date(), 0).completeTime;

        if (classInfo.time >= time) {
            $.ajax({
                method: 'post',
                url: '/users/get_reserved_count',
                data: JSON.stringify(classInfo),
                contentType: "application/json;charset=utf-8",
                complete: function () {
                    $('.loading').hide()
                },
                success: function (data) {
                    if (data.code === 0) {
                        //生成预约信息
                        for (var i = 0; i < data.data.length; i++) {
                            $('.people-number').each(function (index) {
                                var dataId = $(this).attr('data-classid');

                                var classTime = $('.time').eq(index).html();
                                classTime = time + ' ' + classTime;

                                if (Number(dataId) === data.data[i].classId && classTime > minute) {
                                    var string = '已预约' + data.data[i].count + '人';
                                    $(this).attr('data-has-count', data.data[i].count);
                                    var minCount = $(this).attr('data-min');
                                    string += '；' + minCount + '人开课';
                                    $(this).text(string);
                                }
                            });

                            var item = data.data[i].hasReservation;
                            if (item === 1) {
                                $('.class-btn[data-classid="' + data.data[i].classId + '"]').text('取消').addClass('cancle-btn');
                            }
                        }

                        //课程开始一小时前停止约课
                        $('.schedule-third-col').each(function (index) {
                            var classMinute = $('.time').eq(index).html();
                            var minCount = $('.people-number').eq(index).attr('data-min');
                            var nowCount = $('.people-number').eq(index).attr('data-has-count');

                            var classTime = time + ' ' + classMinute;
                            classTime = new Date(classTime);
                            minute = new Date(minute);
                            var result = classTime.getTime() - minute.getTime();
                            var anHour = 60 * 60 * 1000;

                            if (nowCount >= minCount) {
                                return;
                            }

                            if (anHour > result) {
                                var html = '<span class="stop-class">停止约课</span>';
                                $(this).empty().html(html);
                            }
                        })
                    }
                },
                error: function () {
                }
            })
        } else {
            $('.schedule-third-col').each(function () {
                var html = '<span class="stop-class">停止约课</span>';
                $(this).empty().html(html);
            })
        }

    }

    $('#tableContent').on('click', '.class-btn', function () {
        var isCancle = $(this).hasClass('cancle-btn');

        var classId = $(this).attr('data-classid');
        var time = $('.date-tab .active').attr('data-year');
        var swipeNumber = $(this).parent('.schedule-third-col').attr('data-card-count');

        var postData = {
            classId: classId,
            time: time,
            swipeNumber: swipeNumber
        };

        if (!isCancle) {
            var nowTime = getTime(new Date(), 0).fullYear;
            var timeDiffer = Number((postData.time).split('-')[2]) - Number(nowTime.split('-')[2]);
            if(timeDiffer <= 7){
                reservClass(postData);
            }else {
                mui.alert('只能预约未来7天的课程');
            }
        } else {
            cancleClass(postData, this);
        }
    });

    function reservClass(data) {
        $.ajax({
            method: 'post',
            url: '/users/user_reservation_class',
            data: data,
            success: function (data) {
                if (data.code === 0) {
                    mui.alert('预约成功！', '');
                    getTimeTable();
                } else {
                    mui.alert(data.msg, '');
                }
            },
            error: function (err) {
            }
        })
    }

    function cancleClass(data, _this) {
        var nowTime = getTime(new Date(), 0).completeTime;
        nowTime = timeToNumber(nowTime);

        var classTime = $(_this).parent('.schedule-third-col').siblings('.schedule-first-col').children('h5').attr('data-complate-time');
        classTime = timeToNumber(classTime);

        var timeFlag = 1.5 * 60 * 60 * 1000;
        var timeDiscrepancy = classTime - nowTime;

        if (timeDiscrepancy < timeFlag) {
            mui.alert('开课前90分钟内不能取消预约', '');
            return;
        }

        $.ajax({
            method: 'post',
            url: '/users/cancle_class',
            data: data,
            success: function (data) {
                if (data.code === 0) {
                    mui.alert('取消成功', '');
                    getTimeTable();
                } else {
                    mui.alert(data.msg, '');
                }
            },
            error: function (err) {
            }
        })
    }

    function timeToNumber(time) {
        time = new Date(time);
        time = Number(time.getTime());
        return time;
    }
})();