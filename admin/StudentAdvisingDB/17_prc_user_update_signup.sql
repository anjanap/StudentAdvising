
DROP PROCEDURE IF EXISTS prc_user_update_signup;

DELIMITER $$
CREATE PROCEDURE prc_user_update_signup(
				IN user_id 							INT,
                OUT RetMsg						VARCHAR(50)
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
                        
							UPDATE Login SET is_active = true where id = user_id;
                         
                         SET RetMsg = 'User Active now';
                         
              ELSE
						
                        SET RetMsg = 'User doesn''t exist';
                        
              END IF;
            COMMIT;
END$$
DELIMITER ;
