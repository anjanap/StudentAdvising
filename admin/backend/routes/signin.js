let usefulFunctions = require('./usefulFunctions');

exports.signIn= function(req,res) {
    let emailAddress=req.body.emailAddress;
  	let password=req.body.password;
    //console.log(emailAddress);
    //console.log(password);

    let sqlQuery= "CALL advising_admin.prc_user_signin('"+emailAddress+"','"+password+"',false,null, @result,@f_name, @l_name); select @result,@f_name, @l_name; ";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            console.log(results[1][0]['@result']);
            if(results[1][0]['@result'] === 'Incorrect UserName Password'){
                res.status(201).json({status: -1});
            }
            else{
                res.status(201).json({status: 1,"firstName": results[1][0]['@f_name'],"lastName": results[1][0]['@l_name'] });
            }
        }
    },sqlQuery);
  };



