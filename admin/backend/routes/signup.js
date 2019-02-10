let mysqlDB=require('./mysqldb');
let usefulFunctions = require('./usefulFunctions');

exports.signup= function(req,res) {
  let firstname=req.body.firstname;
  let lastname=req.body.lastname;
  let email=req.body.email;
  let password=req.body.password;
  console.log(firstname+" "+lastname+" "+" "+email+" "+password);

  let con=mysqlDB.getConnection();
  let sqlQuery="select * from admin where email='"+email+"';";

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
          let sqlinsert = "INSERT INTO admin(firstname, lastname, email, password) VALUES('"+firstname+"','"+lastname+"','"+email+"','"+password+"');";
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
