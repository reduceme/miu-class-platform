var sql = {
    login: 'SELECT * FROM user_info where username = ',
    classRoom: 'SELECT * FROM class_room',
    timeTable: 'SELECT * FROM timetable where `roomId` = ? and `week` = ? and status = "true"',
    get_reserved_count: 'SELECT * FROM user_class_info WHERE `roomId` = ? and `time` = ? and `classId` in (?)'
};

module.exports = sql;