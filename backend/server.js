const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors());


const db = mysql.createConnection({
user: "root",
host: "127.0.0.1",
port: 3307,
password: "",
database: "kozutak",
});

app.get("/", (req, res) => {
res.send("Fut a backend!");
})

app.get("/regiok", (req, res) => {
  const sql = "SELECT * FROM `regiok`";
    db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result)})
})
app.get("/eszak", (req, res) => {
    const sql = "SELECT * FROM `regiok` WHERE regionev LIKE 'Észak%'";
      db.query(sql, (err, result) => {
      if (err) return res.json(err);
      return res.json(result)})
  })
app.get("/>2", (req, res) => {
    const sql = "SELECT * FROM `regiok` WHERE Rid >= 2";
      db.query(sql, (err, result) => {
      if (err) return res.json(err);
      return res.json(result)})
  })
app.get("/tipus", (req, res) => {
    const sql = "SELECT * FROM `regiok` WHERE regio_tipusa = 'régió'";
      db.query(sql, (err, result) => {
      if (err) return res.json(err);
      return res.json(result)})
  })

app.listen(3001, () => {
console.log("Server is running on port 3001");
});