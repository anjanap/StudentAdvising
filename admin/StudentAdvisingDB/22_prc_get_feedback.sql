
DROP PROCEDURE IF EXISTS prc_get_feedback;

DELIMITER $$
CREATE PROCEDURE prc_get_feedback()
BEGIN
             -- Exception Handing 
            DECLARE EXIT HANDLER FOR SQLEXCEPTION 
            BEGIN
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;
			
            START TRANSACTION;
					select * from advising.Feedback;
            COMMIT;
END$$
DELIMITER ;

