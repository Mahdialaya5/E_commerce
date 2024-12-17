const mysql = require("mysql2");
const connectiondb = mysql.createConnection({
  host: process.env.host,
  user: process.env.Database_user,
  database: process.env.Database,
  password: process.env.password,
  }).promise()
connectiondb.connect((err) =>
  err ? console.log(err) : console.log("database is alive")
);
module.exports =  connectiondb ;