let usefulFunctions = require('./usefulFunctions');

exports.signin= function(req,res) {
    let emailAddress=req.body.emailAddress;
  	let password=req.body.password;
    //console.log(email);
    //console.log(password);

  	//let sqlQuery="select * from admin where email='"+email+"' and password='"+password+"';";
    let sqlQuery= "CALL prc_user_signin('"+emailAddress+"','"+password+"',false,null, @result); select @result; ";

    usefulFunctions.fetchData(function(err,results){
  		if(err){
  			throw err;
  		}
  		else
  		{
  			if(results.length > 0){
  				//console.log("success: "+results);
  				res.status(201).json({output:results[1][0]['@result'], status: 1});
  			}
  			else {
  				console.log("Results: Wrong login");
  				res.status(201).json({status: 0,message: results});
  			}
  		}
  	},sqlQuery);
  };



