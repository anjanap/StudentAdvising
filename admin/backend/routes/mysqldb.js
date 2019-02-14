let ejs=require('ejs');
let mysql=require('mysql');

function getConnection(){
	let con=mysql.createConnection({
		host:"localhost",
		user:"root",
		password:"12345",
		database:"advising_admin",
		multipleStatements: true
			});
	return con;
}



exports.getConnection=getConnection;
