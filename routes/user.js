var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "barsha"
});
router.post('/register', async function (req, res, next) {
try {
let { nom,prenom,age, email, password } = req.body;
const hashed_password = md5(password.toString())

const sql = `Insert Into users (nom, prenom, age, email, password) VALUES ( ?,?,?, ?, ? )`
con.query(
sql, [nom,prenom,age, email, hashed_password],
(err, result, fields) =>{
if(err){
res.send({ status: 0, data: err });
}else{
let token = jwt.sign({ data: result }, 'secret')
res.send({ status: 1, data: result, token : token });
}
})
} catch (error) {
res.send({ status: 0, error: error });
}
});
router.post('/login', async function (req, res, next) {
try {
let { email, password } = req.body;
const hashed_password = md5(password.toString())
const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
con.query(
sql, [email, hashed_password],
function(err, result, fields){

let token = jwt.sign({ data: result }, 'secret')
res.send({ status: 1, data: result, token: token });

})
} catch (error) {
res.send({ status: 0, error: error });
}
});
router.post('/list', async function (req, res, next) {
    try {
    const sql = `SELECT * FROM offre`
    con.query(
    sql,
    function(err, result, fields){
    
    console.log("data"+result);
    res.send({ status: 1, data:result});
    
    })
    } catch (error) {
    res.send({ status: 0, error: error });
    }
    });
    router.post('/calendrier', async function (req, res, next) {
        try {
        const sql = `SELECT * FROM calendrier`
        con.query(
        sql,
        function(err, result, fields){
        
        console.log("calendrier"+result);
        res.send({ status: 1, data:result});
        
        })
        } catch (error) {
        res.send({ status: 0, error: error });
        }
        });
module.exports = router;