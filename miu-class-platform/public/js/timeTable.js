(function () {
        // mui.init();

        var classroomPicker = new mui.PopPicker();
        classroomPicker.setData([{
            value: '1',
            text: 'Miuyoga瑜伽工作室（南阳锦城）'
        }, {
            value: '2',
            text: 'Miuyoga瑜伽工作室（益州国际）'
        }, {
            value: '3',
            text: 'Miuyoga瑜伽工作室（光华逸家）'
        }, {
            value: '4',
            text: 'Miuyoga瑜伽工作室（南湖逸家）'
        }]);

        document.getElementById('showClassroomPicker').addEventListener('tap', function () {
            classroomPicker.show(function (items) {
                $('#showClassroomPicker').text(items[0].text).attr('data-value', items[0].value);
            })
        });

        $('.date-tab').on('click', '.nav-time', function () {
            $(this).addClass('active').siblings('.nav-time').removeClass('active');
        })

        var weekday = {
            '0': '周日',
            '1': '周一',
            '2': '周二',
            '3': '周三',
            '4': '周四',
            '5': '周五',
            '6': '周六',
        };

        //获取指定的日期
        function getTime(date, num) {
            var oneDay = 24 * 60 * 60 * 1000;
            date.setTime(date.getTime() + num * oneDay);

            var month = date.getMonth() + 1;
            var day = date.getDate();
            var week = date.getDay();

            var time = formatTime(month) + "-" + formatTime(day) + ' ' + weekday[week];
            return time;
        }

        //格式化时间
        function formatTime(num) {
            if (num < 10) {
                num = '0' + num;
            }
            return num;
        }

        //获取星期几
        function getWeek(date, index) {
            var oneDay = 24 * 60 * 60 * 1000;
            date.setTime(date.getTime() + index * oneDay);
            var week = date.getDay();
            return week;
        }

        //循环生成选项卡里面的文字
        $('.nav-time').each(function (index) {
            $(this).text(getTime(new Date(), index)).attr('date-week', getWeek(new Date(), index));
        });

        //时间
        document.getElementById('datePicker').addEventListener('tap', function () {
            var _self = this;
            if (_self.picker) {
                _self.picker.show(function (rs) {
                    result.innerText = '选择结果: ' + rs.text;
                    _self.picker.dispose();
                    _self.picker = null;
                });
            } else {
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
                        $(this).text(getTime(new Date(rs.text), index)).attr('date-week', getWeek(new Date(rs.text), index));;
                    });

                    _self.picker.dispose();
                    _self.picker = null;
                });
            }

        }, false);
    })();