var mysqlDB=require('./mysqldb');

function fetchData(callback,sqlQuery){
    var con=mysqlDB.getConnection();
    con.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else{
            //console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });
    con.end();
}
exports.fetchData=fetchData;