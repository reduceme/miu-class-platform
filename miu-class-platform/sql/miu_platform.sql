/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : miu_platform

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 08/03/2018 18:02:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for card_type_info
-- ----------------------------
DROP TABLE IF EXISTS `card_type_info`;
CREATE TABLE `card_type_info`  (
  `cardTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `cardName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cardCount` int(255) NOT NULL,
  `cardValidity` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`cardTypeId`) USING BTREE,
  INDEX `cardName`(`cardName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of card_type_info
-- ----------------------------
INSERT INTO `card_type_info` VALUES (1, '半年卡', 500, '6');
INSERT INTO `card_type_info` VALUES (2, '30次卡', 30, '6');
INSERT INTO `card_type_info` VALUES (3, '50次卡', 50, '8');
INSERT INTO `card_type_info` VALUES (4, '100次卡', 100, '12');

-- ----------------------------
-- Table structure for class_room
-- ----------------------------
DROP TABLE IF EXISTS `class_room`;
CREATE TABLE `class_room`  (
  `roomId` int(64) NOT NULL AUTO_INCREMENT,
  `classroom` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`roomId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class_room
-- ----------------------------
INSERT INTO `class_room` VALUES (1, 'Miuyoga瑜伽工作室（光华逸家）');
INSERT INTO `class_room` VALUES (2, 'Miuyoga瑜伽工作室（南湖逸家）');
INSERT INTO `class_room` VALUES (3, 'Miuyoga瑜伽工作室（南阳锦城）');

-- ----------------------------
-- Table structure for timetable
-- ----------------------------
DROP TABLE IF EXISTS `timetable`;
CREATE TABLE `timetable`  (
  `classId` int(11) NOT NULL AUTO_INCREMENT,
  `roomId` int(11) NOT NULL,
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacher` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `week` int(11) NOT NULL,
  `maxCount` int(11) NOT NULL,
  `minCount` int(11) NOT NULL,
  `classname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`classId`) USING BTREE,
  INDEX `for_roomid`(`roomId`) USING BTREE,
  CONSTRAINT `for_roomid` FOREIGN KEY (`roomId`) REFERENCES `class_room` (`roomId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of timetable
-- ----------------------------
INSERT INTO `timetable` VALUES (1, 1, '10:00', '毛毛老师', 1, 5, 2, '空中瑜伽', 'true');
INSERT INTO `timetable` VALUES (2, 1, '10:01', '毛毛老师', 2, 5, 2, '初级瑜伽', 'true');
INSERT INTO `timetable` VALUES (3, 1, '10:03', '毛毛老师', 3, 5, 2, '高温瑜珈', 'true');
INSERT INTO `timetable` VALUES (4, 1, '10:04', '毛毛老师', 4, 5, 2, '肩颈理疗', 'true');
INSERT INTO `timetable` VALUES (5, 1, '10:05', '毛毛老师', 5, 5, 2, '入门瑜伽', 'true');
INSERT INTO `timetable` VALUES (6, 1, '10:06', '毛毛老师', 6, 5, 2, '流瑜伽', 'true');
INSERT INTO `timetable` VALUES (8, 1, '19:30', '蛋蛋老师', 3, 5, 2, '拜日式', 'true');

-- ----------------------------
-- Table structure for user_class_info
-- ----------------------------
DROP TABLE IF EXISTS `user_class_info`;
CREATE TABLE `user_class_info`  (
  `userId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `time` date NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_class_info
-- ----------------------------
INSERT INTO `user_class_info` VALUES (1, 1, '2018-03-07');
INSERT INTO `user_class_info` VALUES (1, 3, '2018-03-07');
INSERT INTO `user_class_info` VALUES (2, 3, '2018-03-07');
INSERT INTO `user_class_info` VALUES (2, 8, '2018-03-07');
INSERT INTO `user_class_info` VALUES (2, 5, '2018-03-09');
INSERT INTO `user_class_info` VALUES (1, 5, '2018-03-08');
INSERT INTO `user_class_info` VALUES (1, 6, '2018-03-10');
INSERT INTO `user_class_info` VALUES (1, 1, '2018-03-12');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userid` int(255) NOT NULL AUTO_INCREMENT,
  `cardType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `totalCount` int(64) NULL DEFAULT NULL,
  `lastCount` int(64) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('13541147949', '123456', 1, '1', NULL, NULL);
INSERT INTO `user_info` VALUES ('18030850749', '123456', 2, '2', NULL, NULL);
INSERT INTO `user_info` VALUES ('15902827532', '123456', 3, '3', NULL, NULL);
INSERT INTO `user_info` VALUES ('13438968830', '123456', 4, '4', NULL, NULL);
INSERT INTO `user_info` VALUES ('13699097908', '123456', 5, '1', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
