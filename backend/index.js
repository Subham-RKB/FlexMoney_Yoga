const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build"));
const con = mysql
  .createConnection(
    "mysql://root:8WUZnZdk0CJfWF3gJE5f@containers-us-west-122.railway.app:5822/railway"
  );
con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});
app.post("/api/store", (req, res) => {
  console.log("Stored");
  var sql = `insert into users (name,email,age,joiningdate,batch) values (?,?,?,?,?);`;
  var age = parseInt(req.body.age);
  var join = new Date(req.body.joiningDate);
  con.query(
    sql,
    [req.body.username, req.body.email, age, join, req.body.batch],
    function (err, result) {
      if (err) throw err;
      console.log("inserted.");
    }
  );
  res.send({ data: "ok" });
});
app.post("/api/profile", (req, res) => {
  console.log(req.body);
  var sql = `select * from users where email=?`;
  con.query(sql, [req.body.email], function (err, result) {
    if (err) throw err;
    console.log(typeof result);
    res.send({ result });
  });
});
app.put("/api/changeBatch", (req, res) => {
  var sql = `update users set batch=? where email=?`;
  con.query(sql, [req.body.batch, req.body.email], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ batch: req.body.batch });
  });
});
app.delete("/api/delete", (req, res) => {
  var sql = `delete from flexmoney.users where email=?`;
  con.query(sql, [req.body.email], function (err, result) {
    if (err) throw err;
    res.send({ data: "ok" });
  });
});
app.get("/*", function (req, res) {
  res.sendFile("/index.html");
});
app.listen((process.env.PORT || 8000 ), () => {
  console.log("Server Running....");
});
