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
            console.log(result);
            res.status(201).json({
                status:     1,
                message:    "Question and Answer successfully inserted at index " + result.insertId + "."
            });
        }
    });
};

