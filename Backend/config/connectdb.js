const mysql = require("mysql2");
const connectiondb = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "E-commerce",
  authPlugins: {
    mysql_clear_password: () => Buffer.from(process.env.password)
  }
}).promise()
connectiondb.connect((err) =>
  err ? console.log(err) : console.log("database is alive")
);
module.exports =  connectiondb ;