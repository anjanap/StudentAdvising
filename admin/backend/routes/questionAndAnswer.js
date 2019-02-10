let mysqlDB=require('./mysqldb');

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

    let sqlInsert = "UPDATE qna SET question = '"+question+"', answer = '"+answer+"' WHERE id = " +id+ ";";
    let con=mysqlDB.getConnection();

    con.query(sqlInsert, function (err, result) {
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

    let sqlInsert = "UPDATE qna SET deleted = 1 WHERE id = " +id+ ";";
    let con=mysqlDB.getConnection();

    con.query(sqlInsert, function (err, result) {
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

