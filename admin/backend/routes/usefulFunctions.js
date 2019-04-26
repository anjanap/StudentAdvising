var mysqlDB=require('./mysqldb');

function fetchData(callback,sqlQuery){
    var con=mysqlDB.getConnection();
    con.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else{
            callback(err, rows);
        }
    });
    con.end();
}
exports.fetchData=fetchData;


function validateSessions(req, res, next){
    if(req.session.emailAddress){
        next();
    }else{
        res.status(501).json({status:'501',message:'Sessions Error! Please sign in again!!'});
    }
}
exports.validateSessions=validateSessions;

function validateSessionForAdmin(req, res, next){
    if(req.session.isAdmin){
        next();
    }else{
        res.status(501).json({status:'501',message:'Admin Sessions Error! Please sign in as an admin and Try again!!'});
    }
}
exports.validateSessionForAdmin=validateSessionForAdmin;