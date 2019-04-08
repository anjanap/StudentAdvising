USE advising;

-- =============================================
-- Author:      Ujjval Soni
-- Create date:  April, 7, 2019
-- Description:  Get Applies to
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_get_applies_to;

DELIMITER $$
CREATE PROCEDURE prc_get_applies_to()
BEGIN
            SELECT Applies_To.apply_to FROM advising.Applies_To;
END $$

DELIMITER ;