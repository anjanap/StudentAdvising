var mysqlDB=require('./mysqldb');
var usefulFunctions = require('./usefulFunctions');

exports.signup= function(req,res) {
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var email=req.body.email;
  var password=req.body.password;
  console.log(firstname+" "+lastname+" "+" "+email+" "+password);

  var con=mysqlDB.getConnection();
  var sqlQuery="select * from admin where email='"+email+"';";

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
          var sqlinsert = "INSERT INTO admin(firstname, lastname, email, password) VALUES('"+firstname+"','"+lastname+"','"+email+"','"+password+"');";
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
