let mysqlDB=require('./mysqldb');
let usefulFunctions = require('./usefulFunctions');

exports.setQuestionAndAnswer= function(req,res) {
    let question=req.body.question;
    let answer=req.body.answer;
    let category=req.body.category;
    let appliesTo=req.body.appliesTo;
    //console.log(question);
    //console.log(answer);

    let sqlQuery= "CALL advising.prc_add_qna('"+answer+"','"+question+"','"+category+"','"+appliesTo+"',@RetMsg); select @RetMsg; ";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results[1][0]['@RetMsg'] === 'Data inserted successfully'){
                res.status(201).json({status: 1});
            }
            else if(results[1][0]['@RetMsg'] === 'Question already exist'){
                res.status(201).json({status: -1});
            }
        }
    },sqlQuery);
};

exports.editQuestion= function(req,res) {

    let id=req.body.id;
    let question=req.body.question;
    let answer=req.body.answer;
    //console.log(question);
    //console.log(answer);

    let sqlUpdate = "UPDATE qna SET question = '"+question+"', answer = '"+answer+"' WHERE id = " +id+ ";";
    let con=mysqlDB.getConnection();

    con.query(sqlUpdate, function (err, result) {
        if (err) throw err;
        else{
            //todo: update the status code.
            res.status(201).json({
                status:     1,
                message:    "Question and Answer successfully updated."
            });
        }
    });
};

exports.deleteQuestion= function(req,res) {

    let id=req.body.id;
    let sqlDelete = "UPDATE qna SET deleted = 1 WHERE id = " +id+ ";";
    let con=mysqlDB.getConnection();

    con.query(sqlDelete, function (err, result) {
        if (err) throw err;
        else{
            //todo: update the status code.
            res.status(201).json({
                status:     1,
                message:    "Question and Answer successfully deleted."
            });
        }
    });
};


exports.getAllQuestions= function(req,res) {

    let sqlGetAllQuestions = "call advising.prc_select_question_answer();";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                let questionAndAnswers = [];
                results[0].forEach(function(element) {
                    let jsonObj = {
                        question  : JSON.parse(element.result)[0].question,
                        answer  : JSON.parse(element.result)[0].answer,
                        category  : JSON.parse(element.result)[0].category,
                    };
                    questionAndAnswers.push(jsonObj);
                });

                res.status(201).json({status: 1,questionAndAnswers:questionAndAnswers});
            }
            else {
                console.log("No Questions Found!");
                res.status(201).json({status: -1});
            }
        }
    },sqlGetAllQuestions);
};

exports.getAllDeletedQuestions= function(req,res) {

    let sqlGetAllDeletedQuestions = "SELECT * from qna WHERE deleted = 1;";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            res.status(201).json({status: 0, message: "Server Error found: " + err});
        }
        else
        {
            if(results.length > 0){
                res.status(201).json({output:results, status: 1});
            }
            else {
                console.log("No Questions Found!");
                res.status(201).json({status: 0});
            }
        }
    },sqlGetAllDeletedQuestions);
};
