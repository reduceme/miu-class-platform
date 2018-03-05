(function () {
    // mui.init();

    var classroomPicker = new mui.PopPicker();
    classroomPicker.setData([{
        value: '1',
        text: '南阳锦城'
    }, {
        value: '2',
        text: '益州国际'
    }, {
        value: '3',
        text: '光华逸家'
    }, {
        name: '4',
        text: '南湖逸家'
    }]);

    document.getElementById('showClassroomPicker').addEventListener('tap', function () {
        classroomPicker.show(function (items) {
            $('#classRoom').text(JSON.stringify(items[0]));
        })
    });

})();