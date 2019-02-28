USE advising;

-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2019
-- Description:  Add question and answer
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_update_qna;

DELIMITER $$
CREATE PROCEDURE prc_update_qna (
				IN old_ques_id		            INT,
                IN old_ans_id                      INT,
				IN ans 					                VARCHAR(10000),
				IN ques 					            VARCHAR(10000),
				IN cat_name 						VARCHAR(100),
                IN app_to							VARCHAR(50),
                OUT RetMsg						VARCHAR(50)
) 
BEGIN
             -- Exception Handing 
			DECLARE cur_time DATETIME;
			DECLARE ans_hash VARCHAR(255);
            DECLARE ques_hash VARCHAR(255);
            DECLARE last_id_inserted INT;
            DECLARE cat_id INT;
            DECLARE app_id INT;
            DECLARE cnt INT;
            DECLARE EXIT HANDLER FOR SQLEXCEPTION 
            BEGIN
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;
			
            START TRANSACTION;
					
                    SET cur_time = now();
					SET ans_hash = md5(ans);
                    SET ques_hash = md5(ques);
                    
                    
					
                    IF EXISTS (SELECT * FROM Questions WHERE id = old_ques_id)
						THEN
                            IF  EXISTS (SELECT * FROM Answers WHERE id = old_ans_id)
								THEN
                                
                                -- check that answer you are updating is not assigned to some other question
                                      IF NOT EXISTS(SELECT * FROM Answers WHERE answer_hash = ans_hash)
										THEN  
                                             SELECT COUNT(*) AS cnt FROM Questions WHERE answer_id = ans_id;
											 IF cnt = 1 
											 THEN
												
														 UPDATE  Answers SET answer = ans,
																						   answer_hash = ans_hash,
																						   updated_on = cur_time
														WHERE id = old_ans_id;
													
													
												ELSE
													
													INSERT INTO Answers(answer,
																				   answer_hash,
																				   updated_on)
													VALUES
																					(ans,
																					 ans_hash, 
																					 cur_time);
													SET old_ans_id = LAST_INSERT_ID();
												END IF;
											ELSE
														SELECT id as old_ans_id FROM Answers WHERE answer_hash = ans_hash;
											END IF;
											
                                    
                                    SELECT id into cat_id FROM Categories where category_name = cat_name;
									SELECT id into app_id from Applies_To where apply_to = app_to;
									
									UPDATE Questions SET question = ques,
																			question_hash = ques_hash,
																			category_id = cat_id,
																			answer_id = old_ans_id, 
																			apply_to_id = app_id
									WHERE id = old_ques_id;
									
									SET RetMsg = 'Data updated successfully';
                                    
								ELSE
										     SET RetMsg = 'Invalid answer id sent';
                                        
							END IF;   
                                
					ELSE
                        
                       SET RetMsg = 'Invalid question id sent.';
                        
              END IF;
            COMMIT;
END $$

DELIMITER ;