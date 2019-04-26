use advising_admin;

DROP PROCEDURE IF EXISTS prc_get_all_inactive_users;

DELIMITER $$
CREATE PROCEDURE prc_get_all_inactive_users()
BEGIN
             -- Exception Handing 
			  
			DECLARE EXIT HANDLER FOR SQLEXCEPTION 
            BEGIN
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;
			
            
            Select * from Login WHERE is_active = 0 and approval_comment is null;
            
END$$
DELIMITER ;
