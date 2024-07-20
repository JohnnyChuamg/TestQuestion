CREATE TABLE `TestQ`.`PolicyholderRelation` (
    `PolicyholderId` int(11) NOT NULL,
    `IntroducerId` int(11) NOT NULL,
    PRIMARY KEY (`PolicyholderId`) USING BTREE,
    KEY `fk_IntroducerId` (`IntroducerId`),
    CONSTRAINT `fk_IntroducerId` FOREIGN KEY (`IntroducerId`) REFERENCES `Policyholder` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;