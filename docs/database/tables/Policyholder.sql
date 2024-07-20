CREATE TABLE `TestQ`.`Policyholder` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `CreateDate` datetime DEFAULT NULL,
  `CreateUser` varchar(100) DEFAULT NULL,
  `UpdateDate` datetime DEFAULT NULL,
  `UpdateUser` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;