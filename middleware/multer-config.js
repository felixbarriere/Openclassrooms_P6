const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({            //on crée "storage" pour la passer ensuite a multer 
  destination: (req, file, callback) => {       //et lui indiquer où enregistrer les fichiers entrants
    callback(null, 'images');                   //"destination" indique qu'il faut enregistrer les fichiers dans le dossier "images"
  },
  filename: (req, file, callback) => {      
    let name = file.originalname.split(' ').join('_');    //nom de fichier: on enleve les espaces, on les remplace
    let extension = MIME_TYPES[file.mimetype];            //par des "_"; et on ajoute une date
    name = name.replace("." + extension, "_");
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');