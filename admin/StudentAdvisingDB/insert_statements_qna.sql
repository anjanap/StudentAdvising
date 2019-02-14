use advising_current_students;

SET @answer ='Students receiving a grade of C-, D+, D, D-, F, IC or WU may repeat a course through Grade Forgiveness (only a certain number of units may be forgiven, and may only be done once per course). This process will replace the previous grade in your GPA calculation, but will still show up on your transcript.';
insert into Answers(answer, answer_hash, updated_on) values(@answer, md5(@answer), now());

SET @answer ='Help with your mySJSU account may be obtained from the IT Help Desk.';
insert into Answers(answer, answer_hash, updated_on) values(@answer, md5(@answer), now());

SET @answer ='After the last day of advanced registration, all waitlists are dropped, and you must attend the first day of class to see if the instructor will let you add the course. Make sure you add a back up class that you can definitely register for, in case you cannot add the waitlisted course. See the schedule of classes for more information about waitlisting. If you put a class on the waitlist but no longer want it, be sure to remove it from your cart.';
insert into Answers(answer, answer_hash, updated_on) values(@answer, md5(@answer), now());

SET @answer ='You may put yourself on the waitlist during advance registration by registering for the class and checking the waitlist checkbox. If someone drops the course, the first person on the waitlist will be enrolled in the course. (The waitlist cannot add if there is a time conflict, if you are already enrolled in another section of the class, if adding would exceed the unit limit, etc.) However, once advance registration ends, the waitlist will disappear and you will need to attend the first day of class to see if the instructor is able to let you add the course.';
insert into Answers(answer, answer_hash, updated_on) values(@answer, md5(@answer), now());

SET @answer ='You may add and drop courses during advance registration. A few days before the semester starts, you will not be able to add anymore courses, and you must attend the first day of classes and obtain add codes from your instructor to enroll in the course. Be mindful of the add and drop deadlines each semester. These can be found on a calendar on the Registrar''s website.';
insert into Answers(answer, answer_hash, updated_on) values(@answer, md5(@answer), now());

SET @answer ='Currently during advance registration, undergraduate students may add up to 16 units through most of advance registration. During the last few weeks of advance registration, continuing students in good standing may add up to 19 units. However, graduating seniors with an Application for Graduation on file by the posted deadlines (see http://www.sjsu.edu/registrar/docs/grad_app.pdf) may add 18 units during advanced registration and up to 21 units toward the end of registration. You can get the most up to date "Excess Units Petition" at the Office of the Registrar''s form webpage just before the beginning of the semester.';
insert into Answers(answer, answer_hash, updated_on) values(@answer, md5(@answer), now());

SET @answer ='Generally speaking, the last day to drop a course is the end of the 2nd week of classes. The add deadline is generally the last day of the third week of classes. You may find the official dates at the Academic Calendar webpage. Click on the current academic year.';
insert into Answers(answer, answer_hash, updated_on) values(@answer, md5(@answer), now());


insert into Questions(question,question_hash,category_id, answer_id) values('Can I take a class over again if I did poorly the first time?',MD5('Can I take a class over again if I did poorly the first time?'),5, 1);
insert into Questions(question,question_hash,category_id,answer_id) values('I can''t login to MySJSU account, or something is not showing up. Who do I contact?',MD5('I can''t login to MySJSU account, or something is not showing up. Who do I contact?'),5, 2);
insert into Questions(question,question_hash,category_id, answer_id) values('I was waitlisted at spot number XX, now it''s not on my schedule anymore. What happened?',MD5('I was waitlisted at spot number XX, now it''s not on my schedule anymore. What happened?'),5, 3);
insert into Questions(question,question_hash,category_id, answer_id) values('What if all the classes I want are closed or waitlisted?',MD5('What if all the classes I want are closed or waitlisted?'),5,4);
insert into Questions(question,question_hash,category_id, answer_id) values('What if I change my mind about the courses I want to take before the semester starts?',MD5('What if I change my mind about the courses I want to take before the semester starts?'),5,5);
insert into Questions(question,question_hash,category_id, answer_id) values('What is the max number of units I can take?',MD5('What is the max number of units I can take?'),5,6);
insert into Questions(question,question_hash,category_id, answer_id) values('When is the last date to add or drop a class?',MD5('When is the last date to add or drop a class?'),5, 7);

select CAST(question AS CHAR(10000) CHARACTER SET utf8) from Questions;

select CAST(answer AS CHAR(10000) CHARACTER SET utf8) from Answers;