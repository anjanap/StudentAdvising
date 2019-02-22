USE advising_current_students;

-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2019
-- Description:  Add question and answer
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_add_qna;

DELIMITER $$
CREATE PROCEDURE prc_add_qna (
				IN ans 					                VARCHAR(10000),
				IN ques 					            VARCHAR(10000),
				IN cat_name 						VARCHAR(100),
                OUT RetMsg						VARCHAR(50)
) 
BEGIN
             -- Exception Handing 
			DECLARE cur_time DATETIME;
			DECLARE ans_hash VARCHAR(255);
            DECLARE ques_hash VARCHAR(255);
            DECLARE last_id_inserted INT;
            DECLARE cat_id INT;
            
            DECLARE EXIT HANDLER FOR SQLEXCEPTION 
            BEGIN
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;
			
            START TRANSACTION;
					
                    SET cur_time = now();
					SET ans_hash = md5(ans);
                    SET ques_hash = md5(ques);
                    
					
                    IF NOT EXISTS (SELECT * FROM Questions WHERE question_hash = ques_hash)
						THEN
							
                            IF NOT EXISTS (SELECT * FROM Answers WHERE answer_hash = ans_hash)
								THEN
									 INSERT INTO Answers(answer,
																	   answer_hash,
																	   updated_on)
									VALUES
																		(ans,
																		 ans_hash, 
																		 cur_time);
									
									SELECT last_id_inserted = LAST_INSERT_ID();
                                  
                                  ELSE
                                  
										SELECT id INTO last_id_inserted from Answers WHERE answer_hash = ans_hash;
                                        
                                END IF;   
                                
                            SELECT id into cat_id FROM Categories where cat_name = category_name;
                            
                            INSERT INTO Questions(question,
																	question_hash,
                                                                    category_id,
                                                                    answer_id) 
							VALUES							(ques,
																	 ques_hash,
                                                                     cat_id,
                                                                     last_id_inserted);
							
                            SET RetMsg = 'Data inserted successfully';
                         
					ELSE
                        
                        SET RetMsg = 'Question already exist';
                        
              END IF;
            COMMIT;
END $$

DELIMITER ;