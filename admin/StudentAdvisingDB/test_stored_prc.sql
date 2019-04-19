
call advising_admin.prc_user_signup ('Kanika','Kumar','test123','kk@gmail.com','+1','4087805180',true,@result );
select @result;

-- without OTP
call advising_admin.prc_user_signin ('aasthakumar1513@gmail.com','test123',false,null,@result,@f_name, @l_name,@admin );
select @result,@f_name, @l_name, @admin;

-- with OTP 
call advising_admin.prc_user_signin ('aasthakumar1513@gmail.com','',true,123456,@result,@f_name, @l_name,@admin );
select @result,@f_name, @l_name;

-- select now()+INTERVAL 15 MINUTE

call advising.prc_select_question_answer();


call advising.prc_get_answer('Does Dr Brucks have office hours on friday?');

insert into advising.Categories(category_name) values('Academic Standing');

call advising.prc_add_qna('Permission Codes, or Class Permission Numbers, are required to add a course that indicates Department Consent or Instructor Consent. These codes can be obtained from the appropriate department office or instructor. A permission code is needed after open registration has ended.',
'Where can I get a permission code?', 'Academic Standing',"Prospective Student", @result);
select @result;


call advising.prc_add_qna('a4','q4','General Advising',@result);
select@result;
select * from answers;


call advising.prc_add_qna('Yes','Does Dr Brucks have office hours on friday?','General Advising','Current Student', @result);
select @result;
call advising.prc_get_category();

call advising.prc_add_category('Changing Your Major',@result);
select @result;


call advising.prc_update_qna(4,4, 
'You may put yourself on the waitlist during advance registration by registering for the class and checking the waitlist checkbox. If someone drops the course, the first person on the waitlist will be enrolled in the course. (The waitlist cannot add if there is a time conflict, if you are already enrolled in another section of the class, if adding would exceed the unit limit, etc.) However, once advance registration ends, the waitlist will disappear and you will need to attend the first day of class to see if the instructor is able to let you add the course.Login',
'What if all the classes I want are closed or waitlisted?',
'Academic Policy',
'Current Student',@result);
select @result;




call advising.prc_delete_qna(9,10,@result);
select @result;

call advising.prc_get_unanswered_questions();

call advising.prc_delete_unaswered_q(1,@result);
select @result;


call advising_admin.prc_user_update_signup(8,'approve',1, @result);
select @result;

call advising_admin.prc_get_all_inactive_users;

