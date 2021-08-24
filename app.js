const express = require('express');   // Importation d'express

const mongoose = require('mongoose'); // Plugin Mongoose pour se connecter à la data base Mongo Db
const path = require('path');         // Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier

// utilisation du module 'helmet' pour la sécurité en protégeant l'application des failles XSS ciblant les cookies
// il sécurise nos requêtes HTTP, sécurise les en-têtes, contrôle la prélecture DNS du navigateur, empêche le détournement de clics
// et ajoute une protection XSS mineure et protège contre le reniflement de TYPE MIME
// cross-site scripting, sniffing et clickjacking
const helmet = require('helmet');    

const session = require('cookie-session');    // 
const nocache = require('nocache');           //

//Déclarations des routes pour chaque élément
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();

//comment faire sans mongoose?
// Connection à la base de données MongoDB avec la sécurité vers le fichier .env pour cacher le mot de passe
// L'un des avantages que nous avons à utiliser Mongoose pour gérer notre base de données MongoDB est que nous pouvons implémenter des schémas de données stricts
// qui permettent de rendre notre application plus robuste
mongoose.connect(process.env.CO_MONGO,
  { useCreateIndex: true,  //
    useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de l'application express
const app = express();

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  //les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  //on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //on autorise ce serveur à fournir des scripts pour la page visitée
  res.setHeader('Content-Security-Policy', "default-src 'self'");  //
  next();
});

// Parametrage d'une date d'expiration pour les cookies de session
const expiryDate = new Date(Date.now() + 3600000); // 1 heure (60 * 60 * 1000)
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  secret: process.env.SEC_SES,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: expiryDate
  }
}));

//bodyParser etant deprecated, on utilise directement la méthode express.json
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(helmet());       

//Désactive la mise en cache du navigateur
app.use(nocache());
// Midleware permettant de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

//app.use('/api/new-sauce', stuffRoutes); //?
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;