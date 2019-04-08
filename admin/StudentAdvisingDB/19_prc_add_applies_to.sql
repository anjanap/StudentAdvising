USE advising;

-- =============================================
-- Author:      Ujjval Soni
-- Create date:  April, 7, 2019
-- Description:  Set Applies to
-- Version: 0.1
-- =============================================

DROP PROCEDURE IF EXISTS prc_add_applies_to;

DELIMITER $$
CREATE PROCEDURE prc_add_applies_to(
				IN applies_to_name 						VARCHAR(100),
                OUT RetMsg						        VARCHAR(50)
)
BEGIN
             -- Exception Handing

			DECLARE EXIT HANDLER FOR SQLEXCEPTION
            BEGIN
				ROLLBACK;  -- rollback any changes made in the transaction
                RESIGNAL;
			END;

            START TRANSACTION;

					IF NOT EXISTS (SELECT * FROM Applies_To WHERE apply_to = applies_to_name)
						THEN

							INSERT INTO Applies_To(apply_to)
							VALUES
																(applies_to_name);

                         SET RetMsg = 'AppliesTo Added Successfully';

              ELSE

                        SET RetMsg = 'AppliesTo Already Exist';

              END IF;
            COMMIT;
END $$

DELIMITER ;


