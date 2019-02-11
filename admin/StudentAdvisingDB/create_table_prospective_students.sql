USE advising_prospective_students;

SET sql_notes = 0;

DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Answers;
DROP TABLE IF EXISTS History;

CREATE TABLE Categories
(
  id				 					INT	AUTO_INCREMENT   NOT NULL,
  category_name 			VARCHAR(100) 					NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Answers
(
id										INT AUTO_INCREMENT   NOT NULL,
answer							BLOB NOT NULL,
answer_hash					VARCHAR(255) NOT NULL,
updated_on						DateTime NOT NULL,
PRIMARY KEY(id,updated_on),
UNIQUE KEY(answer_hash)
);

CREATE TABLE Questions
(
id										INT AUTO_INCREMENT   NOT NULL,
question							BLOB NOT NULL,
question_hash					VARCHAR(255) NOT NULL,
category_id						INT	NOT NULL,
answer_id						INT NOT NULL,
FOREIGN KEY(category_id) REFERENCES Categories(id),
FOREIGN KEY(answer_id) REFERENCES Answers(id),
PRIMARY KEY(id),
UNIQUE KEY(question_hash)
);

CREATE TABLE Bot_Type
(
id							INT AUTO_INCREMENT   NOT NULL,
type						INT NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE History
(
id										INT AUTO_INCREMENT   NOT NULL,
question_id						INT NOT NULL,
if_answered						BOOLEAN	NOT NULL,
answer_id						INT NULL,
bot_type_id						INT NOT NULL,
asked_on						DATETIME	NOT NULL,
FOREIGN KEY(bot_type_id) REFERENCES Bot_Type(id),
FOREIGN KEY(answer_id) REFERENCES Answers(id),
FOREIGN KEY(question_id) REFERENCES Questions(id),
PRIMARY KEY(id)
);