var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session')

//config

app.listen(1313);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(morgan('combined')); // Active le middleware de logging
app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.use(bodyParser.urlencoded({ extended: false }));

logger.info('server start');

//connexion
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pictionnary'
});

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    //check(username, password);
});

app.get('/inscription', function(req, res){
    res.render('inscription');
});

app.post('/inscription', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var tel = req.body.tel;
	var website = req.body.website;
	var sexe = req.body.sexe;
	var birthdate = req.body.birthdate;
	var ville = req.body.ville;
	var taille = req.body.taille;
	var couleur = req.body.couleur;
	var profilepic = req.body.profilepic;
	logger.info(email, mdp, nom, prenom, tel, url, sexe, birthdate, ville, taille, couleur, profilepic);
	insertdb(req, body);
});

app.get('/profile', function(req, res){
    res.render('profile',{start:session.start, nom:session.nom, prenom:session.prenom, profilepic:session.profilepic});
});

function insertdb(info) {
    connection.query("INSERT INTO users (email, password, nom, prenom, tel, website, sexe, birthdate, ville, taille, couleur, profilepic) VALUES ('" + info.email + "','" + info.mdp + "','" + info.nom + "','" + info.prenom + "','" + info.tel + "','" + info.website + "','" + info.sexe + "', '" + info.birthdate + "','" + info.ville + "', " + info.taille + ",'" + info.couleur + "','" + info.profilepic + "')", function (err, result)
    {
        if (err) {
           logger.info('Erreur SQL !');
           throw err;
        }
        connection.close();
    });
}

/*function check(username,password){
    connection.connect();
    connection.query()("select email from users where email='" + email + "' AND password='" + password+ "'", function (err, rows, fields){

    }

}*/