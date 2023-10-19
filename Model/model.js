var mysql = require('mysql');
var connection = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    port:"3306",
    database:"gym_management_s"
})

connection.connect(function(err){
    if(err){
        console.log("error found...")
    }
    else{
        console.log("connection established......")
    }
})

module.exports = connection;