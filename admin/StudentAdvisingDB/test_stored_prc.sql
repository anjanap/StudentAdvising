use advising_admin;


call advising_admin.prc_user_signup ('Aastha','Kumar','test123','aasthakumar1513@gmail.com','+1','4087805180',true,@result );
select @result;

-- without OTP
call advising_admin.prc_user_signin ('aasthakumar1513@gmail.com','test123',false,null,@result,@f_name, @l_name );
select @result,@f_name, @l_name;

-- with OTP 
call prc_user_signin ('aasthakumar1513@gmail.com','',true,123456,@result,@f_name, @l_name );
select @result,@f_name, @l_name;

-- select now()+INTERVAL 15 MINUTE

call prc_select_question_answer();


insert into advising_current_students.categories(category_name) values('Academic Standing');

call advising_current_students.prc_add_qna('Permission Codes, or Class Permission Numbers, are required to add a course that indicates Department Consent or Instructor Consent. These codes can be obtained from the appropriate department office or instructor. A permission code is needed after open registration has ended.',
'Where can I get a permission code?',
'Academic Standing',@result);
select @result;


call advising_current_students.prc_add_qna('a3','q3','General Advising',@result);
select@result;
select * from answers;


call prc_add_qna('mon to fri 10 to 12','what are Dr Brucks office hours?','General Advising',@result);

call prc_get_category();

call advising_current_students.prc_add_category('Changing Your Major',@result);
select @result;