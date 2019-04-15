use advising_admin;

DROP PROCEDURE IF EXISTS prc_get_all_active_users;

DELIMITER $$
CREATE PROCEDURE prc_get_all_active_users()
BEGIN
             -- Exception Handing

			DECLARE EXIT HANDLER FOR SQLEXCEPTION
            BEGIN
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;


            Select * from Login WHERE is_active = 1 AND is_admin = 0;

END$$
DELIMITER ;
