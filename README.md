# 🎁 TP : API Gestion de cadeaux d’anniversaire

Ce projet vous fait pratiquer :
- Connexion MySQL avec Node.js
- Requêtes préparées
- Validation des données avec Joi
- Gestion propre des erreurs avec middleware Express



## 🎯 Objectif du parcours
Créer une petite API REST qui permet de :
- Lister / ajouter / modifier / supprimer des idées cadeaux
- Valider les données en entrée
- Gérer proprement les erreurs
- Ajouter quelques fonctionnalités supplémentaires en bonus

---

# 🛠️ Partie 1 — Connexion à la base de données


### 📑 Étapes attendues :
- Crée un fichier `db.js` pour gérer la connexion MySQL dans le dossier `/config`.
- Utilise les variables d’environnement suivantes (via `.env`) :
    - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`, `DB_PORT`
- 📦 **Capture demandée** : une capture console montrant que la connexion réussit au lancement.

### 📑 Base de données :
- Exécutez le script SQL `init.sql` fourni pour créer la base de données `birthday_gifts` ainsi que la table `gifts`.

### 📌 Pour rappel : comment exécuter un fichier SQL

1. **Via la ligne de commande MySQL** :  
   - Ouvrez un terminal.  
   - Connectez-vous à MySQL en tapant :  
     ```bash
     mysql -u root -p
     ```  
     puis entrez votre mot de passe MySQL.  
   - Une fois dans le prompt MySQL (`mysql>`), exécutez le fichier SQL

2. **Directement depuis le CLI MySQL**   
   - Ouvrez mySQL CLI
   - Executez le fichier SQL


---

# ⚙️ Partie 2 — CRUD Express avec requêtes préparées


### 📝 Routes attendues :
| Méthode | Endpoint | Fonction |
|----------|----------|----------|
| GET | /gifts | Lister tous les cadeaux |
| POST | /gifts | Ajouter un cadeau |
| PATCH | /gifts/:id | Modifier un cadeau |
| DELETE | /gifts/:id | Supprimer un cadeau |

### 📌 Contraintes :
- Utiliser uniquement des **requêtes préparées**
- Répondre avec du **JSON**
- 📦 **Captures demandées** : captures des tests sous Thunderclient ou Postman de chaque route (avec exemples de réponses).

---

# 🧩 Partie 3 — Validation des données avec Joi


### 📝 Règles de validation :
| Champ | Validation attendue |
|--------|----------------------|
| title | Obligatoire, string, min 3 caractères |
| description | Optionnel, string |
| price | Obligatoire, nombre, supérieur à 0 |
| reserved | Optionnel sur PATCH, booléen |

- Crée un dossier `schemas/` pour stocker tes schémas Joi.
- 📦 **Capture demandée** : exemple d’erreur 400 retournée avec un message clair lors d’une validation échouée.

---

# 🎁 Bonus

🎯 **Objectif** : aller plus loin avec des fonctionnalités et une gestion d’erreurs complète.

### Bonus fonctionnels :
| Méthode | Endpoint | Fonction |
|----------|----------|----------|
| PATCH | /gifts/:id/reserve | Marquer comme réservé |
| GET | /gifts?reserved=true | Lister uniquement les cadeaux réservés |
| GET | /gifts?sort=asc|desc | Trier par prix croissant ou décroissant |

📦 **Capture attendue** : au moins un bonus fonctionnel testé sous Thunderclient.

---

### Middleware d’erreur Express :
- Crée un fichier `middlewares/errorHandler.js` avec un middleware Express :
```js
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Erreur serveur' });
}
module.exports = errorHandler;
```
