USE advising;

-- =============================================
-- Author:      Aastha Kumar
-- Create date:  Feb, 10, 2019
-- Description:  Get Category Name
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_get_category;

DELIMITER $$
CREATE PROCEDURE prc_get_category() 
BEGIN
           SELECT category_name from Categories;
END $$

DELIMITER ;