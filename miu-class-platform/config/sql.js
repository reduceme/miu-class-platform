var sql = {
    //登录验证
    login: 'select * from user_info where username = ?',
    //查询所有教室
    classRoom: 'select * from class_room',
    //查询某个教室某一天的课表
    timeTable: 'select * from timetable where `roomId` = ? and `week` = ? and status = "true"',
    //查询每节课已经预约了的人数
    get_reserved_count: 'select * from user_class_info WHERE `time` = ? and `classId` in (?)',
    //查询用户的卡是否有效
    select_user_card_valid: 'select * from user_info where `userid` = ?',
    //查询某节课程的最小开课人数
    class_swipe_num: 'select * from timetable where `classId` = ?',
    //会员约课
    user_reservation_class: 'insert into user_class_info(userId, classId, time, cardCount) values(?, ?, ?, ?)',
    //会员取消课程
    cancle_class: 'delete from user_class_info where `userId` = ? and `classId` = ? and `time` = ?',
    //查询指定的课程，用来判断约课人数
    select_classinfo_for_reservation: 'select * from timetable where `week` = ? and `time` = ?',
    //人数不满足最小预约人数时，取消
    delete_min_count: 'delete from user_class_info where `classId` = ? and `time` = ?',
    //约课成功，扣除相应次数
    update_last_count: 'update user_info set `lastCount` = `lastCount` - ? where `userid` in (?)'
};

module.exports = sql;