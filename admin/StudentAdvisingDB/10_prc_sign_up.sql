	USE advising_admin;

-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2019
-- Description:  User SignUp Procedure
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_user_signup;

DELIMITER $$
CREATE PROCEDURE prc_user_signup (
				IN First_Name 					VARCHAR(50),
				IN Last_Name 					VARCHAR(50),
				IN Password 						VARCHAR(128),
				IN Email_Addr						VARCHAR(50),
                IN Country_Code				Varchar(10),
                IN Phone_Number				BIGINT,
                IN Login_Using_Phone		BOOLEAN,
                OUT RetMsg						VARCHAR(50)
) 
BEGIN
             -- Exception Handing 
			  
			DECLARE EXIT HANDLER FOR SQLEXCEPTION 
            BEGIN
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;
			
            START TRANSACTION;
            
					IF NOT EXISTS (SELECT * FROM Login WHERE email_address = Email_Addr)
						THEN
                        
							INSERT INTO Login(first_name,
															   last_name ,
                                                               password ,
                                                               email_address ,
                                                               is_active ,
                                                               country_code ,
                                                               phone_number ,
                                                               login_using_phone,
                                                               is_super_admin)
							VALUES
																(First_Name,
                                                                 Last_Name, 
                                                                 MD5(Password), 
                                                                 Email_Addr,
                                                                 false,
                                                                 Country_Code,
                                                                 Phone_Number,
                                                                 Login_Using_Phone,
                                                                 0);
                         
                         SET RetMsg = 'User Successfully Added';
                         
              ELSE
						
                        SET RetMsg = 'User Already Exist';
                        
              END IF;
            COMMIT;
END $$

DELIMITER ;