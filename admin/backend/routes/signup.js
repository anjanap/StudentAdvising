var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqldb');
var signin = require('./signin');

exports.signup= function(req,res) {
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var email=req.body.email;
  var password=req.body.password;
  console.log(firstname+" "+lastname+" "+" "+email+" "+password);
  var con=mysqlDB.getConnection();
  var sqlQuery="select * from admin where email='"+email+"';";
    signin.fetchData(function(err,results){
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

// function fetchData(callback,sqlQuery){
//   var con=mysqlDB.getConnection();
//   con.query(sqlQuery, function(err, rows, fields) {
//     if(err){
//       console.log("ERROR: " + err.message);
//     }
//     else
//     {
//       console.log("DB Results:"+rows);
//       callback(err, rows);
//     }
//   });
//   console.log("\nConnection closed..");
//   con.end();
// }
