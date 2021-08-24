const jwt = require('jsonwebtoken');

console.log("hello");

module.exports = (req, res, next) => {
  try {


    const token = req.headers.authorization.split(' ')[1];          //on extrait le token du header "autorization" et on prend la partie située apres l'espace
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;


    console.log("hello");
    console.log(token);
    console.log(decodedToken);
    console.log(userId);


    if (req.body.userId && req.body.userId !== userId) {            //si la demande contient un id, on le compare à celui extrait du token
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};