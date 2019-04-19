USE advising;

-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2019
-- Description:  Add question and answer
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_delete_qna;

DELIMITER $$
CREATE PROCEDURE prc_delete_qna (
				IN ques_id		            INT,
                IN ans_id                     INT,
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
					
                    IF EXISTS (SELECT * FROM Questions WHERE id = ques_id)
						THEN
                            IF  EXISTS (SELECT * FROM Answers WHERE id = ans_id)
								THEN
									 
                                     SET cnt = (SELECT COUNT(*) FROM Questions WHERE answer_id = ans_id);
                                     
                                     DELETE FROM Questions WHERE id = ques_id;
                                     
                                     IF cnt = 1 THEN
											DELETE FROM Answers WHERE id = ans_id;
                                            
                                    END IF;
									
									SET RetMsg = 'Data Deleted successfully';
                                    
								ELSE
										     SET RetMsg = 'Invalid answer id sent';
                                        
							END IF;   
                                
					ELSE
                        
                       SET RetMsg = 'Invalid question id sent.';
                        
              END IF;
            COMMIT;
END $$

DELIMITER ;