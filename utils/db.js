var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ayumicontact"
});

con.connect(function(err) {
  if (err) {
    console.log("Database belum diaktifkan");
  } else {
    console.log("Connected!");
  }
});