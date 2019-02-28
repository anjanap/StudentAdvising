let usefulFunctions = require('./usefulFunctions');

exports.setQuestionAndAnswer = function(req,res) {
    let question=req.body.question;
    let answer=req.body.answer;
    let category=req.body.category;
    let applyTo=req.body.applyTo;
    console.log(req.body);

    let sqlSetQuestionAndAnswer= "CALL advising.prc_add_qna('"+answer+"','"+question+"','"+category+"','"+applyTo+"',@RetMsg); select @RetMsg; ";

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
    },sqlSetQuestionAndAnswer);
};

exports.editQuestionAndAnswer = function(req,res) {

    let questionId=req.body.questionId;
    let answerId=req.body.answerId;
    let answer=req.body.answer;
    let question=req.body.question;
    let category=req.body.category;
    let applyTo=req.body.applyTo;
console.log(req.body);
    let sqlEditQuestionAndAnswer = "CALL advising.prc_update_qna("+questionId+","+answerId+",'"+answer+"','"+question+"','"+category+"','"+applyTo+"',@RetMsg); select @RetMsg; ";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results[2][0]['@RetMsg'] === 'Data updated successfully'){
                res.status(201).json({status: 1});
            }
            else if(results[1][0]['@RetMsg'] === 'Invalid answer id sent' || results[1][0]['@RetMsg'] === 'Invalid question id sent.'){
                res.status(201).json({status: -1});
            }
        }
    },sqlEditQuestionAndAnswer);
};

exports.deleteQuestionAndAnswer = function(req,res) {

    let questionId=req.body.questionId;
    let answerId=req.body.answerId;

    let sqlDeleteQuestionAndAnswer= "CALL advising.prc_delete_qna("+answerId+","+questionId+",@RetMsg); select @RetMsg; ";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results[2][0]['@RetMsg'] === 'Data Deleted successfully'){
                res.status(201).json({status: 1});
            }
            else if(results[1][0]['@RetMsg'] === 'Invalid answer id sent' || results[1][0]['@RetMsg'] === 'Invalid question id sent.'){
                res.status(201).json({status: -1});
            }
        }
    },sqlDeleteQuestionAndAnswer);
};


exports.getAllQuestionsAndAnswers = function(req,res) {

    let sqlGetAllQuestionsAndAnswers = "call advising.prc_select_question_answer();";

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
                        question    : JSON.parse(element.result)[0].question,
                        answer      : JSON.parse(element.result)[0].answer,
                        category    : JSON.parse(element.result)[0].category,
                        applyTo     : JSON.parse(element.result)[0].apply_to,
                        questionId  : JSON.parse(element.result)[0].ques_id,
                        answerId    : JSON.parse(element.result)[0].ans_id,
                        categoryId  : JSON.parse(element.result)[0].cat_id,
                        applyToID   : JSON.parse(element.result)[0].applies_to_id
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
    },sqlGetAllQuestionsAndAnswers);
};

exports.getAnswer = function(req,res) {

    let question=req.body.question;

    let sqlGetAnswer = "call advising.prc_get_answer('"+question+"');";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                let questionAndAnswer = [];
                let jsonObj = {
                    question    : JSON.parse(results[0][0].result)[0].question,
                    answer      : JSON.parse(results[0][0].result)[0].answer,
                    category    : JSON.parse(results[0][0].result)[0].category,
                    applyTo     : JSON.parse(results[0][0].result)[0].apply_to,
                    questionId  : JSON.parse(results[0][0].result)[0].ques_id,
                    answerId    : JSON.parse(results[0][0].result)[0].ans_id,
                    categoryId  : JSON.parse(results[0][0].result)[0].cat_id,
                    applyToID   : JSON.parse(results[0][0].result)[0].applies_to_id
                };
                    questionAndAnswer.push(jsonObj);

                res.status(201).json({status: 1,questionAndAnswer:questionAndAnswer});
            }
            else {
                console.log("No Questions Found!");
                res.status(201).json({status: -1});
            }
        }
    },sqlGetAnswer);
};

exports.getAllDeletedQuestions = function(req,res) {

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
