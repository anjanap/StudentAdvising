USE advising_admin;

DROP PROCEDURE IF EXISTS prc_user_update_signup;

DELIMITER $$
CREATE PROCEDURE prc_user_update_signup(
				IN user_id 							INT,
                IN user_action						VARCHAR(50),
                IN make_super_admin		BOOLEAN,
                OUT RetMsg						VARCHAR(100)
)
BEGIN
             -- Exception Handing 
			  
			DECLARE EXIT HANDLER FOR SQLEXCEPTION 
            BEGIN
				SET RetMsg = 'An error occurred while activating a user. Please try again later';
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;
			
            START TRANSACTION;
            
					IF EXISTS (SELECT * FROM Login WHERE id = user_id)
						THEN
							IF LOWER(user_action) = 'approve'
								THEN
										UPDATE Login SET is_active = true, approval_comment ='User approved by admin', is_super_admin = make_super_admin  where id = user_id;
                                         SET RetMsg = 'User Active now';
							ELSE
									UPDATE Login SET is_active = false, approval_comment ='User not approved by admin' where id = user_id;
                                    SET RetMsg = 'User is still inactive as it was not approved by admin';
							END IF;
                         
              ELSE
						
                        SET RetMsg = 'User does not exist';
                        
              END IF;
            COMMIT;
END$$
DELIMITER ;
