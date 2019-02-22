USE advising_current_students;

-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2019
-- Description:  Add Category Name
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_add_category;

DELIMITER $$
CREATE PROCEDURE prc_add_category(
				IN cat_name 						VARCHAR(100),
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
            
					IF NOT EXISTS (SELECT * FROM Categories WHERE category_name = cat_name)
						THEN
                        
							INSERT INTO Categories(category_name)
							VALUES
																(cat_name);
                         
                         SET RetMsg = 'Category Added Successfully';
                         
              ELSE
						
                        SET RetMsg = 'Category Already Exist';
                        
              END IF;
            COMMIT;
END $$

DELIMITER ;


