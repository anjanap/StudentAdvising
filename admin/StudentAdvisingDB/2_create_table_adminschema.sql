USE advising_admin;

SET sql_notes = 0;

DROP TABLE IF EXISTS OTP;
DROP TABLE IF EXISTS Login;


CREATE TABLE Login
(
  id				 					INT	AUTO_INCREMENT   NOT NULL,
  first_name 					VARCHAR(50) 					NULL,
  last_name 					VARCHAR(50) 					NOT NULL,
  password 						VARCHAR(128) 					NOT NULL,
  email_address 				VARCHAR(50) 					NOT NULL,
  is_active	 					BOOLEAN							NOT NULL,
  country_code 				VARCHAR(10)					NOT NULL,
  phone_number				VARCHAR(50)					NOT NULL,
  login_using_phone		BOOLEAN							NOT NULL,
  approval_comment		VARCHAR(50)					NULL,
  PRIMARY KEY (id),
  UNIQUE (email_address)
);

CREATE TABLE OTP
(
login_id							INT NOT NULL,
OTP									INT NOT NULL,
valid_from						DATETIME NOT NULL,
valid_till							DATETIME NOT NULL,
FOREIGN KEY(login_id) REFERENCES Login(id),
PRIMARY KEY(login_id, OTP, valid_till)
);

