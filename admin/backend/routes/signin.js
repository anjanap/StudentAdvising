var usefulFunctions = require('./usefulFunctions');

exports.signin= function(req,res) {
    var email=req.body.email;
  	var password=req.body.password;
    //console.log(email);
    //console.log(password);

  	var sqlQuery="select * from admin where email='"+email+"' and password='"+password+"';";

    usefulFunctions.fetchData(function(err,results){
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



