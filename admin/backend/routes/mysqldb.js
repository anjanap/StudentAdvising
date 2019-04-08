let mysql=require('mysql');

//local connection
// function getConnection(){
// 	let con=mysql.createConnection({
// 		host:"localhost",
// 		user:"root",
// 		password:"12345",
// 		database:"advising_admin",
// 		multipleStatements: true
// 			});
// 	return con;
// }

//aws connection
function getConnection(){
	let con=mysql.createConnection({
		host:"studentadvising.ctahqekfkony.us-east-1.rds.amazonaws.com",
		user:"sjsu",
		password:"11223344",
		database:"SJSU_Advising",
		multipleStatements: true
	});
	return con;
}

exports.getConnection=getConnection;
