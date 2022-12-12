const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
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
  var passKey =  req.body.email+Math.floor(1000 + Math.random() * 9000);
  var sql1 = `insert into users (name,email,age,joiningdate) values (?,?,?,?);`;
  var age = parseInt(req.body.age);
  var join = new Date(req.body.joiningDate);
  con.query(
    sql1,
    [req.body.username,passKey, age, join],
    function (err, result) {
      if (err) throw err;
      console.log("inserted.");
    }
  );
  var sql2 = `insert into batchdetail (email,batch,changeddate) values (?,?,?)`;
  con.query(
    sql2,
    [passKey,req.body.batch,join],
    function (err, result) {
      if (err) throw err;
      console.log("inserted.");
    }
  );
  res.send({data:passKey});
});
app.post("/api/profile", (req, res) => {
  console.log(req.body);
  var sql = `select * from users inner join batchdetail on users.email=batchdetail.email where users.email=?`;
  con.query(sql, [req.body.email], function (err, result) {
    if (err) throw err;
    console.log(typeof result);
    res.send({ result });
  });
});
app.put("/api/changeBatch", (req, res) => {
  var sql = `update batchdetail set batch=? where email=?`;
  con.query(sql, [req.body.batch, req.body.email], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ batch: req.body.batch });
  });
  var sql1 = `update batchdetail set changeddate=? where email=?`;
  con.query(sql1, [new Date(), req.body.email], function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ batch: req.body.batch });
  });
});
app.delete("/api/delete", (req, res) => {
  var sql = `delete from users where email=?`;
  con.query(sql, [req.body.email], function (err, result) {
    if (err) throw err;
    res.send({ data: "ok" });
  });
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname,"build","index.html"));
});
app.listen((process.env.PORT || 8000 ), () => {
  console.log("Server Running....");
});
