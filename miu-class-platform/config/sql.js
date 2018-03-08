var sql = {
    login: 'SELECT * FROM user_info where username = ?',
    classRoom: 'SELECT * FROM class_room',
    timeTable: 'SELECT * FROM timetable where `roomId` = ? and `week` = ? and status = "true"',
    get_reserved_count: 'SELECT * FROM user_class_info WHERE `time` = ? and `classId` in (?)',
    user_reservation_class: 'insert into user_class_info(userId, classId, time) values(?, ?, ?)',
    cancle_class: 'delete from user_class_info where `userId` = ? and `classId` = ? and `time` = ?'
};

module.exports = sql;