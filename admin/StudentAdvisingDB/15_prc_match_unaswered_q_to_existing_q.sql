
DROP PROCEDURE IF EXISTS prc_match_unaswered_q_to_existing_q;

DELIMITER $$
CREATE PROCEDURE prc_match_unaswered_q_to_existing_q(
				IN ques_id		           	int,
				OUT RetMsg				VARCHAR(50)
)
BEGIN
			DECLARE cnt INT;
            DECLARE ques TEXT;
             -- Exception Handing 
            DECLARE EXIT HANDLER FOR SQLEXCEPTION 
            BEGIN
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;
			
            START TRANSACTION;
					IF EXISTS(SELECT * FROM Unanswered where id = ques_id)
                    THEN
							SET ques = (select question from Unanswered where id = ques_id);
								IF EXISTS (SELECT * FROM(
								SELECT MATCH(question)  AGAINST (ques IN NATURAL LANGUAGE MODE) as score 
													FROM Answers a INNER JOIN Questions q ON q.Answer_id = a.id) res
													WHERE score >= 0.5 AND score < 2)
									THEN
												SELECT * FROM(
												SELECT question, answer, MATCH(question)  
												AGAINST (ques IN NATURAL LANGUAGE MODE) as score, c.category_name, ap.apply_to
												FROM Answers a INNER JOIN Questions q 
												ON q.Answer_id = a.id
												INNER JOIN  Categories c 
												ON q.category_id = c.id
												INNER JOIN Applies_To ap
												ON ap.id = q.apply_to_id
												) res
												WHERE score >= 0.5 AND score < 2
												ORDER BY score DESC;
									 SET RetMsg = 'match found';
											
								ELSE
									
								   SET RetMsg = 'No match found';
								END IF;
						ELSE
							 SET RetMsg = 'Invalid unaswered question id';
					END IF;
            COMMIT;
END$$
DELIMITER ;

