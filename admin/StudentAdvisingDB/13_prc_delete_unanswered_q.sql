USE advising;

-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2019
-- Description:  Add question and answer
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_delete_unaswered_q;

DELIMITER $$
CREATE PROCEDURE prc_delete_unaswered_q (
				IN ques_id		            INT,
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
					
                    IF EXISTS (SELECT * FROM Unanswered WHERE id = ques_id)
						THEN

									DELETE FROM Unanswered WHERE id = ques_id;
									
									SET RetMsg = 'Data Deleted successfully';
                                
					ELSE
                        
                       SET RetMsg = 'Invalid question id sent.';
                        
					END IF;
            COMMIT;
END $$

DELIMITER ;