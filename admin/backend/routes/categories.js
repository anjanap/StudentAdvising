let usefulFunctions = require('./usefulFunctions');

exports.getAllCategories= function(req,res) {

    let sqlGetAllQuestions = "call advising_current_students.prc_get_category();";

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