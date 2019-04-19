USE advising_admin;

-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2017
-- Description:  User SignIn Procedure
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_user_signin;

DELIMITER $$
CREATE PROCEDURE prc_user_signin (
				IN email_addr 					VARCHAR(50),
				IN pswd 							VARCHAR(128),
                IN login_using_phone 	BOOLEAN,
                IN temp_pswd					INT,
                OUT User_ID					Varchar(50),
                OUT fst_name				Varchar(50),
                OUT lst_name				Varchar(50),
                OUT super_admin	 BOOLEAN
) 
BEGIN
			  Declare curr_time datetime;
			 -- Exception Handing 
			  DECLARE EXIT HANDLER FOR SQLEXCEPTION SELECT 'SQLException encountered';
			 
			 SET curr_time = now();
             IF NOT login_using_phone is true 
				THEN
						IF NOT Exists(
								SELECT id FROM	Login	WHERE	email_address = email_addr AND Password = MD5(Pswd)) 
						THEN
							SET User_ID ='Incorrect UserName Password';
			
						ELSE
							-- SET msg = 'Successful Login';
							SELECT id, first_name, last_name, is_super_admin INTO User_ID,fst_name, lst_name, super_admin FROM Login WHERE email_address = email_addr AND Password = MD5(Pswd);
                        END If;
			ELSE
						IF NOT Exists(
								SELECT id FROM Login l join OTP o on l.id = o.login_id   WHERE l.email_address = email_addr AND o.OTP = temp_pswd 
                                 AND o.valid_from <= curr_time and o.valid_till >= curr_time) 
						THEN
							SET User_ID ='Incorrect UserName Password';
			
						ELSE
							-- SET msg = 'Successful Login';
							SELECT l.id, first_name, last_name,is_super_admin INTO User_ID,fst_name, lst_name, super_admin FROM Login l join OTP o on l.id = o.login_id   WHERE email_address = email_addr AND o.OTP = temp_pswd
							AND o.valid_from <= curr_time and o.valid_till >= curr_time limit 1;
						END If;
		  END IF;
END $$

DELIMITER ;


