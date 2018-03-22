var sql = {
    //登录验证
    login: 'select * from user_info where username = ?',
    //初始化开卡时间和过期时间
    init_open_time_and_last_time: 'update user_info set `openTime` = ?, `lastTime` = ? where `userid` = ?',
    //查询卡种信息
    card_type: 'select cardTypeId,cardValidity from card_type_info',
    card_name: 'select cardTypeId,cardName from card_type_info',
    //查询所有教室
    classRoom: 'select * from class_room',
    //查询某个教室某一天的课表
    timeTable: 'select * from timetable where `roomId` = ? and `week` = ? and status = "true"',
    //查询每节课已经预约了的人数
    get_reserved_count: 'select * from user_class_info where `time` = ? and `classId` in (?)',
    //查询用户的卡是否有效
    select_user_card_valid: 'select cardType, openTime, lastCount from user_info where `userid` = ?',
    //查询某节课程的最小开课人数
    class_swipe_num: 'select * from timetable where `classId` = ?',
    //会员约课
    select_has_reservation: 'select userId from user_class_info where `userId` = ? and `classId` = ? and `time` = ?',
    update_has_reservation: 'update user_class_info set `isEffective` = 1 where `userId` = ? and `classId` = ? and `time` = ?',
    user_reservation_class: 'insert into user_class_info(userId, classId, time, cardCount, isEffective) values(?, ?, ?, ?, 1)',
    //会员取消课程
    cancle_class: 'update user_class_info set `isEffective` = 3 where `userId` = ? and `classId` = ? and `time` = ?',
    //查询指定的课程，用来判断约课人数
    select_classinfo_for_reservation: 'select * from timetable where `week` = ? and `time` = ?',
    //人数不满足最小预约人数时，取消
    delete_min_count: 'update user_class_info set `isEffective` = 4 where `classId` = ? and `time` = ?',
    //约课成功，扣除相应次数
    update_last_count: 'update user_info set `lastCount` = `lastCount` - ? where `userid` in (?)',
    //个人中心，获取用户信息
    get_user_basic_info: 'select customerName, cardType, lastCount, lastTime from user_info where `userid` = ?'
};

module.exports = sql;