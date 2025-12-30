\# People-System



\*\*People-System\*\* est une application simple qui illustre l'utilisation des API JAX-RS avec Hibernate pour la gestion des personnes, accompagnée d'un frontend React + Vite. 



---



\## 🛠️ Technologies utilisées



\- \*\*Backend :\*\*

&nbsp; - Java 17

&nbsp; - JAX-RS (REST APIs)

&nbsp; - Hibernate ORM

&nbsp; - MySQL (ou toute autre base compatible)

&nbsp; - CORS activé pour permettre les requêtes depuis le frontend en développement



\- \*\*Frontend :\*\*

&nbsp; - React

&nbsp; - Vite

&nbsp; - Axios pour simplifier les appels API



---



\## ⚡ Fonctionnalités



\- Création, lecture, mise à jour et suppression (CRUD) de personnes via l'API REST

\- Frontend simple permettant de visualiser et interagir avec les données

\- Gestion des appels API avec Axios

\- Support du développement en local grâce à CORS



---



\## 🚀 Installation et lancement



\### Backend

1\. Cloner le dépôt :

```bash

git clone https://github.com/votre-utilisateur/people-system.git

```

2\. Configurer la base de données dans le fichier persistence.xml comme vous voulez (ici j'utilise postgres).

3\. Lancer le serveur JAX-RS via Eclipse.

\### Frontend

1\. Lancer 'npm install' pour installer les dépendances.

2\. Lancer le serveur de développement Vite (react) à travers 'npm run dev' et naviguer à l'application depuis votre navigateur (http://localhost:5173 par défaut).



---



\## Remarques

* Les deux parties (frontend et backend) sont encore en développement.



* CORS est activé pour permettre au frontend Vite de communiquer avec le backend.



* Axios est utilisé pour simplifier les requêtes HTTP vers l'API.



