use advising_admin;


call prc_user_signup ('Aastha','Kumar','test123','aasthakumar1513@gmail.com','+1','4087805180',true,@result );
select @result;

-- without OTP
call advising_admin.prc_user_signin ('aasthakumar1513@gmail.com','test123',false,null,@result,@f_name, @l_name );
select @result,@f_name, @l_name;

-- with OTP 
call prc_user_signin ('aasthakumar1513@gmail.com','',true,123456,@result,@f_name, @l_name );
select @result,@f_name, @l_name;

-- select now()+INTERVAL 15 MINUTE