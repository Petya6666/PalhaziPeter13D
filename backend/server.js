const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
require('dotenv').config();


app.use(cors());


const db = mysql.createConnection({
user: process.env.DB_USER ,
host: process.env.DB_HOST,
port: process.env.DB_PORT,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
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


app.get("/2", (req, res) => {
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


app.delete("/torles/:id", (req, res) => {
    const sql = "DELETE FROM `regiok` WHERE Rid = ?";
    db.query(sql, [req.params.id], (err, result) => {
     if (err) return res.json(err);
     return res.json(result)
    })
})


app.listen(3001, () => {
console.log("Server is running on port 3001");
});