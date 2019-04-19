let usefulFunctions = require('./usefulFunctions');

exports.signIn= function(req,res) {
    let emailAddress=req.body.emailAddress;
  	let password=req.body.password;

    let sqlSignIn= "CALL advising_admin.prc_user_signin('"+emailAddress+"','"+password+"',false,null, @result,@f_name, @l_name); select @result,@f_name, @l_name; ";

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
                req.session.emailAddress = req.body.emailAddress;
                req.session.firstName = results[1][0]['@f_name'];
                req.session.lastName = results[1][0]['@l_name'];
                req.session.save();

                res.status(201).json({status: 1,
                    "firstName": results[1][0]['@f_name'],
                    "lastName": results[1][0]['@l_name'],
                    "emailAddress": req.body.emailAddress});
            }
        }
    },sqlSignIn);
  };

exports.checkCredentials= function(req,res) {
    if(req.session.emailAddress){
        res.status(200).json({status: 1,
            "firstName": req.session.firstName,
            "lastName": req.session.lastName });
    } else{
        res.status(501).json({status:'501',message:'Sessions Error! Please sign in again!!'})
    }
};

exports.signOut= function(req,res) {
    if(req.session.destroy()){
        res.status(201).json({status: 1});
    }else{
        res.status(500).json({status: -1});
    }
};



