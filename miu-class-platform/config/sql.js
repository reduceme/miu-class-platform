var sql = {
    login: 'SELECT * FROM user_info where username = ',
    classRoom: 'SELECT * FROM class_room',
    timeTable: 'SELECT * FROM time_table where `roomId` = ? and `week` = ?',
};

module.exports = sql;