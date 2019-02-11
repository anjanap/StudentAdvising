let ejs=require('ejs');
let mysql=require('mysql');

function getConnection(){
	let con=mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"12345",
		database:"cmpe295"
			});
	return con;
}



exports.getConnection=getConnection;
