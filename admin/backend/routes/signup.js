let usefulFunctions = require('./usefulFunctions');

exports.signUp= function(req,res) {

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailAddress = req.body.emailAddress;
    let password = req.body.password;
    let countryCode = req.body.countryCode;
    let phoneNumber = req.body.phoneNumber;

    password = password.replace("'", "\\'");

    //let loginUsingPhone = req.body.loginUsingPhone;
    let loginUsingPhone = 0; //for development only

    let sqlSignUp= "CALL advising_admin.prc_user_signup('"+firstName+"','"+lastName+"','"+password+"','"+emailAddress+"', '"+countryCode+"','"+phoneNumber+"', '"+loginUsingPhone+"', @result); select @result; ";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results[1][0]['@result'] === 'User Successfully Added'){
                res.status(201).json({status: 1});
            }
            else if(results[1][0]['@result'] === 'User Already Exist'){
                res.status(201).json({status: -1});
            }
        }
    },sqlSignUp);
};

exports.approveUser = function(req,res) {

    let userId=req.body.userId;
    let userActionFromClient=req.body.userActionFromClient;
    let userAction="";
    let makeSuperAdmin=req.body.makeSuperAdmin;

    if(userActionFromClient === 1){
        userAction = 'approve';
    } else {
        userAction = 'disapprove';
    }

    let sqlApproveUser = "call advising_admin.prc_user_update_signup("+userId+",'"+userAction+"','"+makeSuperAdmin+"',@RetMsg); select @RetMsg;";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results[1][0]['@RetMsg'] === 'User Active now'){
                res.status(201).json({status: 1, message: "User Active now"});
            }
            else if(results[1][0]['@RetMsg'] === "User is still inactive as it was not approved by admin"){
                res.status(201).json({status: 1, message: "User is still inactive as it was not approved by admin"});
            }
            else if(results[1][0]['@RetMsg'] === "User does not exist"){
                res.status(201).json({status: 0, message: "User does not exist"});
            }
        }
    },sqlApproveUser);
};

exports.getAllInactiveUsers = function(req,res) {

    let sqlGetAllInactiveUsers = "call advising_admin.prc_get_all_inactive_users();";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                let inActiveUsers = [];
                results[0].forEach(function(element) {
                    let jsonObj = {
                        id                  :element.id,
                        firstName           :element.first_name,
                        lastName            :element.last_name,
                        email               :element.email_address,
                        isActive            :element.is_active,
                        countryCode         :element.country_code,
                        phoneNumber         :element.phone_number,
                        loginUsingPhone     :element.login_using_phone,
                        approvalComment     :element.approval_comment
                    };

                    inActiveUsers.push(jsonObj);
                });

                res.status(201).json({status: 1,inActiveUsers:inActiveUsers});
            }
            else {
                console.log("No InActive Users Found!");
                res.status(201).json({status: -1});
            }
        }

    },sqlGetAllInactiveUsers);
};
