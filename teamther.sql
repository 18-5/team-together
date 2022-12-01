--
-- Table structure for table `user`
--
 
 
CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `userEmail` varchar(200) DEFAULT NULL, 
  `userHomepage`varchar(200) DEFAULT NULL, 
  `userSchool`varchar(100) DEFAULT NULL, 
  `userBio`varchar(100) DEFAULT NULL, 
  PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;
 
--
-- Dumping data for table `user`
--
 
-- INSERT INTO `author` VALUES (1,'egoing','developer');
-- INSERT INTO `author` VALUES (2,'duru','database administrator');
-- INSERT INTO `author` VALUES (3,'taeho','data scientist, developer');

--
-- Table structure for table `message`
--
 
 
CREATE TABLE `message` (
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `messageId` int(11) NOT NULL,
  `content`text NOT NULL,
  `createdAt`datetime NOT NULL, 
  `unread` tinyint(1) default 1, 
  `lastReadAt` datetime, 
  PRIMARY KEY (`senderId`, `receiverId`, `messageId`), 
  FOREIGN KEY (`senderId`) REFERENCES `user` (`userId`), 
  FOREIGN KEY (`receiverId`) REFERENCES `user` (`userId`)
) DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

--
-- Table structure for table `skillList`
--
 
CREATE TABLE `skillList` (
  `skillId` int(11) NOT NULL,
  `skillName` varchar(30) NOT NULL,
  PRIMARY KEY (`skillId`)
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

--
-- Table structure for table `skill`
--
 
CREATE TABLE `skill` (
  `userId` int(11) NOT NULL,
  `skillId` int(11) NOT NULL,
  PRIMARY KEY (`userId`, `skillId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`), 
  FOREIGN KEY (`skillId`) REFERENCES `skillList` (`skillId`) 
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;
 
--
-- Table structure for table `project`
--
 
CREATE TABLE `project` (
  `projectId` int(11) NOT NULL,
  `projectName` varchar(30) NOT NULL,
  `description` text,
  `projectCreated` datetime NOT NULL,
  PRIMARY KEY (`projectId`)
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;
 
--
-- Dumping data for table `project`
--
 
-- INSERT INTO `topic` VALUES (1,'MySQL','MySQL is...','2018-01-01 12:10:11',1);
-- INSERT INTO `topic` VALUES (2,'Oracle','Oracle is ...','2018-01-03 13:01:10',1);
-- INSERT INTO `topic` VALUES (3,'SQL Server','SQL Server is ...','2018-01-20 11:01:10',2);
-- INSERT INTO `topic` VALUES (4,'PostgreSQL','PostgreSQL is ...','2018-01-23 01:03:03',3);
-- INSERT INTO `topic` VALUES (5,'MongoDB','MongoDB is ...','2018-01-30 12:31:03',1);

--
-- Table structure for table `team`
--
 
CREATE TABLE `team` (
  `teamId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  PRIMARY KEY (`teamId`, `projectId`), 
  FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`) 
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

--
-- Table structure for table `applicant`
--
 
CREATE TABLE `applicant` (
  `teamId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`teamId`, `projectId`, `userId`), 
  FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`), 
  FOREIGN KEY (`teamId`) REFERENCES `team` (`teamId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

--
-- Table structure for table `member`
--
 
CREATE TABLE `member` (
  `teamId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`teamId`, `projectId`, `userId`), 
  FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`), 
  FOREIGN KEY (`teamId`) REFERENCES `team` (`teamId`), 
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

--
-- Table structure for table `evaluation`
--
 
CREATE TABLE `evaluation` (
  `evaluaterTeamId` int(11) NOT NULL,
  `evaluaterProjectId` int(11) NOT NULL,
  `evaluaterUserId` int(11) NOT NULL,
  `evaluatedTeamId` int(11) NOT NULL,
  `evaluatedProjectId` int(11) NOT NULL,
  `evaluatedUserId` int(11) NOT NULL,
  `qualitative` int(3) NOT NULL,
  `quantitative` int(3) NOT NULL,
  `attitued` int(3) NOT NULL,
  `responsibility` int(3) NOT NULL,
  `compatibility` int(3) NOT NULL,
  PRIMARY KEY (`evaluaterTeamId`, `evaluaterProjectId`, `evaluaterUserId`, `evaluatedTeamId`, `evaluatedProjectId`, `evaluatedUserId`), 
  FOREIGN KEY (`evaluaterProjectId`) REFERENCES `project` (`projectId`), 
  FOREIGN KEY (`evaluaterTeamId`) REFERENCES `team` (`teamId`), 
  FOREIGN KEY (`evaluaterUserId`) REFERENCES `user` (`userId`), 
  FOREIGN KEY (`evaluatedProjectId`) REFERENCES `project` (`projectId`), 
  FOREIGN KEY (`evaluatedTeamId`) REFERENCES `team` (`teamId`), 
  FOREIGN KEY (`evaluatedUserId`) REFERENCES `user` (`userId`)
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

--
-- Table structure for table `states`
--
 
CREATE TABLE `states` (
  `stateId` int(11) NOT NULL,
  `stateName` varchar(30) NOT NULL,
  PRIMARY KEY (`stateId`)
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

--
-- Table structure for table `projectState`
--
 
CREATE TABLE `projectState` (
  `projectId` int(11) NOT NULL,
  `stateId` int(11) NOT NULL,
  PRIMARY KEY (`projectId`, `stateId`), 
  FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`), 
  FOREIGN KEY (`stateId`) REFERENCES `states` (`stateId`)
)DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;