const express = require('express');
var mysql = require('mysql');
const app = express();
const port = 3000;

const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(expressLayouts);

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

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const sql = `SELECT * FROM contacts`;
    con.query(sql, function(err, contacts){
        res.render('dashboard', {
            title: 'Dashboard',
            layout: 'layouts/main',
            contacts
        });
    });
});
app.delete('/contact', (req, res) => {
    const sql = `DELETE FROM contacts where id = ${req.body.id}`;
    con.query(sql, function(err, result) {
        res.redirect('/');
    });
});

app.post('/contact', (req, res) => {
    const sql = `INSERT INTO contacts (id, nama, email, nohp, jabatan) VALUES (NULL, '${req.body.nama}', '${req.body.email}', '${req.body.nohp}', '${req.body.jabatan}')`;
    con.query(sql, function(error, result) {
        res.redirect('/');
    });
    // res.send(sql);
});

app.put('/contact', (req,res) => {
    const sql = `UPDATE contacts SET
    nama = '${req.body.nama}',
    email = '${req.body.email}',
    nohp = '${req.body.nohp}',
    jabatan = '${req.body.jabatan}'
    WHERE contacts.id = ${req.body.id}`
    con.query(sql, function(error, result) {
        res.redirect('/');
    });
});

app.post('/cari', (req, res) => {
    const sql = `SELECT * FROM contacts WHERE nama like '%${req.body.nama}%'`;
    con.query(sql, function(error, contacts) {
        res.render('dashboard', {
            title: 'Dashboard',
            layout: 'layouts/main',
            contacts
        });
    });
    // res.send(sql);
});

app.get('/contact/:id', (req, res) => {
    const sql = `SELECT * FROM contacts WHERE id = ${req.params.id}`;
    con.query(sql, function(error, contact) {
        res.render('detail', {
            title: 'Detail Kontak',
            layout: 'layouts/main',
            contact
        });
    });
});

app.listen(port, (req, res) => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`);
});