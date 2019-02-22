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

    let sqlGetAllQuestions = "call advising_current_students.prc_select_question_answer();";

    usefulFunctions.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.length > 0){
                var final = [];
                results[0].forEach(function(element) {
                    var jsonObj = {
                        question  : JSON.parse(element.result)[0].question,
                        answer  : JSON.parse(element.result)[0].answer,
                        category  : JSON.parse(element.result)[0].category//,
                        //edit : '<MDBBtn color="warning" className="glyphicon glyphicon-pencil" size="sm"></MDBBtn>',
                        //deleteQues : '<MDBBtn color="danger" className="glyphicon glyphicon-trash" size="sm"></MDBBtn>'
                    };
                    final.push(jsonObj);
                });

                //res.send(JSON.parse(results[0][0].result)[0].answer);
                console.log(final);
                res.send(final);
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
