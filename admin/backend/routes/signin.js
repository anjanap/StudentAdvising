var express=require('express');
var router=express.Router();
var mysql=require('mysql');
var mysqlDB=require('./mysqldb');

exports.signin= function(req,res) {
    var email=req.body.email;
  	var password=req.body.password;
    //console.log(email);
    //console.log(password);
  	var sqlQuery="select * from admin where email='"+email+"' and password='"+password+"';";
  	fetchData(function(err,results){
  		if(err){
  			throw err;
  		}
  		else
  		{
  			if(results.length > 0){
  			      console.log("success: "+results[0].firstname);
              res.status(201).json({output:results, status: 1});
  			}
  			else {
  				console.log("Results: Wrong login");
  				res.status(201).json({status: 0});
  			}
  		}
  	},sqlQuery);
  };

  function fetchData(callback,sqlQuery){
  	var con=mysqlDB.getConnection();
  	con.query(sqlQuery, function(err, rows, fields) {
  		if(err){
  			console.log("ERROR: " + err.message);
  		}
  		else
  		{
  			console.log("DB Results:"+rows);
  			callback(err, rows);
  		}
  	});
  	console.log("\nConnection closed..");
  	con.end();
  }
