(function () {
    var userPicker = new $.PopPicker();
    userPicker.setData([{
        name: '南阳锦城',
        id: '1'
    }, {
        name: '益州国际',
        id: '2'
    }, {
        name: '光华逸家',
        id: '3'
    }, {
        name: '南湖逸家',
        id: '4'
    }]);

    $('#showClassroomPicker').on('tap', function(event) {
        userPicker.show(function(items) {
            $('#classRoom').text(JSON.stringify(items[0]));
            //返回 false 可以阻止选择框的关闭
            //return false;
        });
    }, false);
})();