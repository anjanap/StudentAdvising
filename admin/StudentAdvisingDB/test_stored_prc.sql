
call advising_admin.prc_user_signup ('Aastha','Kumar','test123','aasthakumar1513@gmail.com','+1','4087805180',true,@result );
select @result;

-- without OTP
call advising_admin.prc_user_signin ('aasthakumar1513@gmail.com','test123',false,null,@result,@f_name, @l_name );
select @result,@f_name, @l_name;

-- with OTP 
call advising_admin.prc_user_signin ('aasthakumar1513@gmail.com','',true,123456,@result,@f_name, @l_name );
select @result,@f_name, @l_name;

-- select now()+INTERVAL 15 MINUTE

call advising.prc_select_question_answer();


call advising.prc_get_answer('Does Dr Brucks have office hours on friday?');

insert into advising.categories(category_name) values('Academic Standing');

call advising.prc_add_qna('Permission Codes, or Class Permission Numbers, are required to add a course that indicates Department Consent or Instructor Consent. These codes can be obtained from the appropriate department office or instructor. A permission code is needed after open registration has ended.',
'Where can I get a permission code?', 'Academic Standing',"Prospective Student", @result);
select @result;


call advising.prc_add_qna('a3','q3','General Advising',@result);
select@result;
select * from answers;


call advising.prc_add_qna('Yes','Does Dr Brucks have office hours on friday?','General Advising','Current Student', @result);
select @result;
call advising.prc_get_category();

call advising.prc_add_category('Changing Your Major',@result);
select @result;


call advising.prc_update_qna(1,1, 
'Permission Codes, or Class Permission Numbers, are required to add a course that indicates Department Consent or Instructor Consent. These codes can be obtained from the appropriate department office or instructor. A permission code is needed after open registration has ended.',
'Where can I get a permission code?',
'Academic Policy',
'Current Student',@result);
select @result;


call advising.prc_delete_qna(1,1,@result);
select @result;


    

