let mysqlDB=require('./mysqldb');
let usefulFunctions = require('./usefulFunctions');

exports.setQuestion= function(req,res) {
    let question=req.body.question;
    let answer=req.body.answer;
    //console.log(question);
    //console.log(answer);

    let sqlInsert = "INSERT INTO qna(question, answer) VALUES('"+question+"','"+answer+"');";
    let con=mysqlDB.getConnection();

    con.query(sqlInsert, function (err, result) {
        if (err) throw err;
        else{
            res.status(201).json({
                status:     1,
                message:    "Question and Answer successfully inserted at index " + result.insertId + "."
            });
        }
    });
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

    let sqlGetAllQuestions = "SELECT * from qna WHERE deleted = 0;";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
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
    },sqlGetAllQuestions);
};

exports.getAllDeletedQuestions= function(req,res) {

    let sqlGetAllDeletedQuestions = "SELECT * from qna WHERE deleted = 1;";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
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

