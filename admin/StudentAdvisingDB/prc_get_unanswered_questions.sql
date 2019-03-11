USE advising;

-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2019
-- Description:  Add question and answer
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_get_unanswered_questions;

DELIMITER $$
CREATE PROCEDURE prc_get_unanswered_questions (
) 
BEGIN
		SELECT  CONCAT(
    '[', JSON_OBJECT(
			'id', id,
			'question', CAST(question AS CHAR(10000) CHARACTER SET utf8),
			'asked_on', asked_on
		),
    ']') as result
		FROM Unanswered;

END $$

DELIMITER ;