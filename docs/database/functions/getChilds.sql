CREATE FUNCTION `TestQ`.`getChilds`(rootId INT) RETURNS varchar(1000) CHARSET utf8mb4
BEGIN
	  DECLARE sTemp VARCHAR(1000);
    DECLARE sTempChd VARCHAR(1000);

    SET sTemp = '$';
    SET sTempChd = cast(rootId as CHAR);

    WHILE sTempChd is not null DO
    	SET sTemp = concat(sTemp,',',sTempChd);
SELECT group_concat(PolicyholderId) INTO sTempChd
FROM PolicyholderRelation
WHERE FIND_IN_SET(IntroducerId,sTempChd) > 0;
END WHILE;
RETURN sTemp;
END