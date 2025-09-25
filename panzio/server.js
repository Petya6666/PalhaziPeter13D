
// Importáltam a szükséges csomagokat
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(cors());

// Adatbázis kapcsolat létrehozása
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    port: "3307",
    database: "fogado"
});

// Alapértelmezett útvonal
app.get("/", (req, res) => {
    res.send("Fut a backend!");
});

// Szobák lekérdezése
app.get("/fogado", (req, res) => {
    const sql = "SELECT * FROM `szobak`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})
// Vendégek lekérdezése
app.get("/kihasznaltsag", (req, res) => {
    const sql = "SELECT szoba, COUNT(vendeg) AS vendegek, SUM(DATEDIFF(tav, erk)) AS vendegejszakak FROM foglalasok GROUP BY szoba ORDER BY vendegejszakak ASC, vendegek ASC;";
    db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result)
    })
});
// Foglaltság lekérdezése
app.get("/foglaltsag", (req, res) => {
    const sql = `
        SELECT vnev AS név, erk AS érkezés, tav AS távozás 
        FROM foglalasok 
        JOIN vendegek  ON vendeg = vsorsz
        WHERE szoba IN (SELECT szoba FROM szobak) 
        ORDER BY vnev ASC;
    `;
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});



// Szerver indítása a 3001-es porton
app.listen(3001, () => {
    console.log("Fut a szerver 3001-en");
})