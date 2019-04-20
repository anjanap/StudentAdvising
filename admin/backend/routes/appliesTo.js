let usefulFunctions = require('./usefulFunctions');

exports.getAllAppliesTo= function(req,res) {

    let sqlGetAllAppliesTo = "call advising.prc_get_applies_to();";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                let appliesTo = [];
                results[0].forEach(function(element) {
                    appliesTo.push(element.apply_to);
                });

                res.status(201).json({status: 1, appliesTo: appliesTo});
            }
            else {
                console.log("No AppliesTo Found!");
                res.status(201).json({status: -1});
            }
        }
    },sqlGetAllAppliesTo);
};

exports.setAppliesTo= function(req,res) {

    let appliesTo=req.body.appliesTo;

    appliesTo = appliesTo.replace("'", "\\'");

    let sqlSetAppliesTo = "call advising.prc_add_applies_to('"+appliesTo+"',@RetMsg); select @RetMsg;";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results[1][0]['@RetMsg'] === 'AppliesTo Added Successfully'){
                res.status(201).json({status: 1});
            }
            else if(results[1][0]['@RetMsg'] === 'AppliesTo Already Exist'){
                res.status(201).json({status: -1});
            }
        }
    },sqlSetAppliesTo);
};