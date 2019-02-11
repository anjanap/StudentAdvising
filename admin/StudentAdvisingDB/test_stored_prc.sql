use advising_admin;


call prc_user_signup ('Aastha','Kumar','test123','aasthakumar1513@gmail.com','+1','4087805180',true,@result );
select @result;

insert into OTP values(1, 123456, now(), now()+INTERVAL 15 MINUTE);

-- without OTP
call prc_user_signin ('aasthakumar1513@gmail.com','test123',false,null,@result );
select @result;

-- with OTP 
call prc_user_signin ('aasthakumar1513@gmail.com','',true,123456,@result );
select @result;

-- select now()+INTERVAL 15 MINUTE