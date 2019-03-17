USE advising;

SET sql_notes = 0;

DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Applies_To;
DROP TABLE IF EXISTS Unanswered;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS Categories;


CREATE TABLE Categories
(
  id				 					INT	AUTO_INCREMENT   NOT NULL,
  category_name 			VARCHAR(100) 	NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY(category_name)
);

CREATE TABLE Answers
(
id										INT AUTO_INCREMENT   NOT NULL,
answer							TEXT NOT NULL,
answer_hash					VARCHAR(255) NOT NULL,
updated_on						DateTime NOT NULL,
PRIMARY KEY(id,updated_on),
UNIQUE KEY(answer_hash)
);

CREATE TABLE Applies_To
(
id							INT AUTO_INCREMENT   NOT NULL,
apply_to				VARCHAR(100) NOT NULL,
PRIMARY KEY(id),
UNIQUE KEY(apply_to)
);

CREATE TABLE Questions
(
id										INT AUTO_INCREMENT   NOT NULL,
question							TEXT NOT NULL,
question_hash					VARCHAR(255) NOT NULL,
category_id						INT	NOT NULL,
answer_id						INT NULL,
apply_to_id		                 INT NULL,
FOREIGN KEY(category_id) REFERENCES Categories(id),
FOREIGN KEY(answer_id) REFERENCES Answers(id),
FOREIGN KEY(apply_to_id) references Applies_To(id),
PRIMARY KEY(id),
UNIQUE KEY(question_hash)
);

CREATE TABLE Unanswered
(
id										INT AUTO_INCREMENT   NOT NULL,
question 							TEXT NOT NULL,
question_hash					VARCHAR(255) NOT NULL,
asked_on						DATETIME	NOT NULL,
PRIMARY KEY(id)
);


ALTER TABLE advising.Questions ADD FULLTEXT(question);


