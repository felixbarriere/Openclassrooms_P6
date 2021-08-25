const bcrypt = require('bcrypt');  //hashage

const User = require('../model/User');
const jwt = require('jsonwebtoken');

const MaskData = require('maskdata');  //On utilise Mask Data pour masquer le mail
const emailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedCharactersAfterAt: 2,
  maskAtTheRate: false,
};

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)  //on execute 10 fois, suffisant et pas trop long
    .then(hash => {                     //méthode asynchrone (donc then/catch)
      const user = new User({
        email: MaskData.maskEmail2(req.body.email, emailMaskOptions),
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: MaskData.maskEmail2(req.body.email, emailMaskOptions)}) //on vérifie que l'email correspond à un user existant
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // on compare le mdp rentré avec le hash enregistré dans la bdd
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(            //la fonction "sign" encode un nouveau token
                { userId: user._id },   //le token contien l'id comme payload (données encodées)
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};