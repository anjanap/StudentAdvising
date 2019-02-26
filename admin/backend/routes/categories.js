let usefulFunctions = require('./usefulFunctions');

exports.getAllCategories= function(req,res) {

    let sqlGetAllQuestions = "call advising.prc_get_category();";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                let categoryNames = [];
                results[0].forEach(function(element) {
                    categoryNames.push(element.category_name);
                });

                res.status(201).json({status: 1, categoryNames: categoryNames});
            }
            else {
                console.log("No Categories Found!");
                res.status(201).json({status: -1});
            }
        }
    },sqlGetAllQuestions);
};

exports.setCategory= function(req,res) {

    let category=req.body.category;

    let sqlGetAllQuestions = "call advising.prc_add_category('"+category+"',@RetMsg); select @RetMsg;";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results[1][0]['@RetMsg'] === 'Category Added Successfully'){
                res.status(201).json({status: 1});
            }
            else if(results[1][0]['@RetMsg'] === 'Category Already Exist'){
                res.status(201).json({status: -1});
            }
        }
    },sqlGetAllQuestions);
};