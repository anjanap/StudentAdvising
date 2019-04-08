USE advising;

DROP PROCEDURE IF EXISTS prc_match_unaswered_q_to_existing_q;

DELIMITER $$
CREATE PROCEDURE prc_match_unaswered_q_to_existing_q(
				IN ques		           		TEXT,
				OUT RetMsg				VARCHAR(50)
)
BEGIN
			DECLARE cnt INT;
             -- Exception Handing 
            DECLARE EXIT HANDLER FOR SQLEXCEPTION 
            BEGIN
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;
			
            START TRANSACTION;
					
                    IF EXISTS (SELECT * FROM(
                    SELECT MATCH(question)  AGAINST (ques IN NATURAL LANGUAGE MODE) as score 
										FROM Answers a INNER JOIN Questions q ON q.Answer_id = a.id) res
										WHERE score >= 0.5 AND score < 2)
						THEN
									SELECT * FROM(
									SELECT question, answer, MATCH(question)  
                                    AGAINST (ques IN NATURAL LANGUAGE MODE) as score 
									FROM Answers a INNER JOIN Questions q 
									ON q.Answer_id = a.id) res
                                    WHERE score >= 0.5 AND score < 2
									ORDER BY score DESC;
                                
					ELSE
                        
                       SET RetMsg = 'No match found';
                        
					END IF;
            COMMIT;
END$$
DELIMITER ;

