# tp-node-express-s3

Description

Ce projet est un monorepository qui utilise une stack moderne composée de TypeScript, Express.js, Drizzle ORM pour l'accès aux bases de données et Zod pour la validation des données. L'objectif du projet est de fournir une architecture modulaire et extensible permettant de gérer des utilisateurs, des commandes, et des produits.

Technologies

- TypeScript : Langage de programmation typé pour une meilleure maintenance et une intégration plus facile avec les outils modernes.
- Express.js : Framework minimaliste pour construire des API RESTful.
- Drizzle ORM : Un ORM léger et performant pour interagir avec des bases de données PostgreSQL.
- Zod : Librairie pour la validation de schémas de données avec un support complet pour TypeScript.

Fonctionnalités
- Gestion des utilisateurs : Inscription, connexion, et déconnexion des utilisateurs avec JWT.
- Gestion des commandes : Créer, récupérer, et gérer les commandes, avec des vérifications d'intégrité des données.
- Gestion des produits : Ajouter, supprimer, et modifier les produits dans la base de données.

Prérequis
Avant de commencer, assurez-vous d'avoir les outils suivants installés :

- Node.js (version 16 ou supérieure)
- pnpm (gestionnaire de paquets)
- PostgreSQL (ou toute autre base de données compatible avec Drizzle)


Installation

1. Cloner le dépôt
Clonez ce repository sur votre machine locale :

git clone https://github.com/votre-utilisateur/monorepo-project.git
cd monorepo-project

2. Installer les dépendances
Utilisez pnpm (ou npm) pour installer les dépendances de votre projet.

Si vous utilisez pnpm :

pnpm install


3. Configuration de la base de données
Configurez votre base de données PostgreSQL et créez un fichier .env à la racine du projet avec les informations suivantes :

DATABASE_URL=postgres://username:password@localhost:5432/yourdatabase
JWT_SECRET=your-jwt-secret

4. Générer les migrations avec Drizzle
Si vous utilisez Drizzle ORM pour la gestion des migrations, vous pouvez les générer en exécutant :

pnpm run generate

5. Lancer l'application
Lancez le serveur de développement avec pnpm ou npm :

Si vous utilisez pnpm :

pnpm run dev

Cela démarre le serveur sur http://localhost:3000.


Utilisation

Routes principales

Voici un aperçu des principales routes API disponibles dans ce projet.


Authentification

- POST /register : Enregistrement d'un utilisateur.
- POST /login : Connexion d'un utilisateur.
- POST /logout : Déconnexion de l'utilisateur actuel.


Utilisateurs

- GET /users : Récupérer tous les utilisateurs.
- GET /users/:id : Récupérer un utilisateur par ID.


Commandes

- POST /orders : Créer une nouvelle commande.
- GET /orders : Récupérer toutes les commandes.
- GET /orders/:id : Récupérer une commande par ID.


Produits

- POST /products : Ajouter un nouveau produit.
- GET /products : Récupérer tous les produits.
- GET /products/:id : Récupérer un produit par ID.
- PATCH /products/:id : Modifier un produit.
- DELETE /products/:id : Supprimer un produit.