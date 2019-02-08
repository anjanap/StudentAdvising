var ejs=require('ejs');
var mysql=require('mysql');

function getConnection(){
	var con=mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"12345",
		database:"cmpe295"
			});
	return con;
}



exports.getConnection=getConnection;
