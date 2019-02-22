USE advising_current_students;


-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2017
-- Description:  User SignIn Procedure
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_get_answer;

DELIMITER $$
CREATE PROCEDURE prc_get_answer (
IN ques VARCHAR(10000))
BEGIN
		DECLARE ques_hash VARCHAR(125);
        
        SET ques_hash = md5(ques);
        IF EXISTS (SELECT * FROM Questions WHERE question_hash = ques_hash)
        THEN
				SELECT  CONCAT(
			'[', JSON_OBJECT(
					'question', CAST(question AS CHAR(10000) CHARACTER SET utf8),
					'answer', CAST(answer AS CHAR(10000) CHARACTER SET utf8),
					'category', c.category_name
				),
			']') AS result
				FROM Questions q INNER JOIN Answers a ON q.answer_id = a.id
				INNER JOIN Categories c ON c.id = q.category_id
				WHERE q.question_hash = ques_hash;
		ELSE
			SELECT 'Question doesn''t exist' AS result;
		END IF;
END $$

DELIMITER ;


