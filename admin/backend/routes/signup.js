let mysqlDB=require('./mysqldb');
let usefulFunctions = require('./usefulFunctions');

exports.signup= function(req,res) {

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let emailAddress = req.body.emailAddress;
  let password = req.body.password;
  let countryCode = req.body.countryCode;
  let phoneNumber = req.body.phoneNumber;
  let isActive = req.body.isActive;
  let loginUsingPhone = req.body.loginUsingPhone;

  let con=mysqlDB.getConnection();
  let sqlQuery="select * from login where email_address='"+emailAddress+"';";

    usefulFunctions.fetchData(function(err,results){
    if(err){
      throw err;
    }
    else
    {
      if(results.length > 0){
          console.log("user exists");
          res.status(201).json({status: -1});
      }
      else {
          let sqlinsert = "INSERT INTO login(first_name, last_name, password, email_address, country_code, phone_number, is_active, login_using_phone) " +
              "VALUES('"+firstName+"','"+lastName+"','"+password+"','"+emailAddress+"','"+countryCode+"','"+phoneNumber+"','"+isActive+"','"+loginUsingPhone+"');";

          con.query(sqlinsert, function (err, result) {
              if (err) throw err;
              else{
              console.log("1 record inserted");
              res.status(201).json({status: 1});
            }
          });
      }
    }
  },sqlQuery);
};
