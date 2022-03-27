# Openclassrooms_Projet_6
## Backend d'un site E-commerce (Node.js) - Formation Développeur web

### P6-Piquante
Projet 6 du parcours DW avec OpenClassrooms: construire une API sécurisée pour une appli d'avis gastronomiques. 
Compétences évaluées : 
- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée

### Frontend: 
Le frontend était fourni dans le cadre de ce projet. Le projet a été généré avec Angular CLI version 7.0.2. Pour faire fonctionner le projet, vous devez installer node-sass à part. Démarrer ng serve pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:3000/. L'application va se recharger automatiquement si vous modifiez un fichier source.

### Backend:
Les technologies utilisées pour le back: un server NodeJS, une base de données MongoDB, le framework Express et le pack Mongoose. Implémenter le fichier .env du dossier mongoDb_connect fourni à la racine du dossier backend pour la connexion à la base de données MongoDB. Démarrer avec 
> node server 

ou 
> nodemon server

### Connexion:
L'utilisateur pour s'inscrire sur l'application doit fournir un email ainsi qu'un mot de passe contenant min 8 caractères (min 1 majuscule, 1 minuscule, 1 chiffre, pas de symboles, espaces autorisés).

Note: MaskData a été utilisé dans une optique de respect du RGPD. Il empeche cependant la lecture clair des mails utilisateurs, c'est pourquoi une branche sans MaskData est disponible.
