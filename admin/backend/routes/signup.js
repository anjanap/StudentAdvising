let mysqlDB=require('./mysqldb');
let usefulFunctions = require('./usefulFunctions');

exports.signUp= function(req,res) {

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailAddress = req.body.emailAddress;
    let password = req.body.password;
    let countryCode = req.body.countryCode;
    let phoneNumber = req.body.phoneNumber;
    let isActive = 0;

    //let loginUsingPhone = req.body.loginUsingPhone;
    let loginUsingPhone = 0; //for development only

    let sqlQuery= "CALL advising_admin.prc_user_signup('"+firstName+"','"+lastName+"','"+password+"','"+emailAddress+"', '"+countryCode+"','"+phoneNumber+"', '"+loginUsingPhone+"', @result); select @result; ";

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
    },sqlQuery);
};
