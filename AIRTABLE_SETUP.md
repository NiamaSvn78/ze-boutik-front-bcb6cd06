# Configuration Airtable pour Ze-boutik

## Prérequis

1. Un compte Airtable
2. Une base de données Airtable avec une table contenant vos produits
3. Une clé API Airtable

## Configuration

### 1. Créer un fichier .env

Copiez le fichier `env.example` vers `.env` et configurez vos variables :

```bash
cp env.example .env
```

### 2. Configurer les variables d'environnement

Dans le fichier `.env`, remplacez les valeurs par vos informations Airtable :

```env
VITE_AIRTABLE_API_KEY=your_airtable_api_key_here
VITE_AIRTABLE_BASE_ID=your_airtable_base_id_here
VITE_AIRTABLE_TABLE_NAME=your_table_name_here
```

### 3. Obtenir vos informations Airtable

#### Clé API
1. Allez sur [Airtable.com](https://airtable.com)
2. Connectez-vous à votre compte
3. Allez dans votre compte (en haut à droite)
4. Sélectionnez "Developer hub"
5. Créez une nouvelle clé API

#### ID de la base
1. Ouvrez votre base Airtable
2. L'ID se trouve dans l'URL : `https://airtable.com/appXXXXXXXXXXXXXX/...`
3. Copiez la partie `appXXXXXXXXXXXXXX`

#### Nom de la table
1. Dans votre base Airtable, le nom de la table est visible dans l'onglet
2. Utilisez le nom exact de la table

## Structure de données attendue

Votre table Airtable doit contenir les champs suivants :

| Champ Airtable | Type | Description |
|----------------|------|-------------|
| `titre_accrocheur` | Single line text | Titre du produit |
| `photo_produit` | Attachment | Image du produit |
| `liste_caracteristiques` | Long text | Description du produit |
| `description_audio` | Attachment | Fichier audio (optionnel) |
| `categorie` | Single select | Catégorie du produit |
| `statut_produit` | Single select | Statut du produit (doit contenir "publié" pour être affiché) |

## Test de l'intégration

1. Démarrez le serveur de développement :
```bash
npm run dev
```

2. Ouvrez votre navigateur sur `http://localhost:5173`
3. Vérifiez que les produits s'affichent dans la section "Nos Produits"

## Dépannage

### Erreur "Chargement des produits..."
- Vérifiez que votre clé API est correcte
- Vérifiez que l'ID de la base est correct
- Vérifiez que le nom de la table est exact

### Erreur "Erreur lors du chargement des produits"
- Vérifiez la console du navigateur pour plus de détails
- Vérifiez que tous les champs requis sont présents dans votre table
- Vérifiez les permissions de votre clé API

### Images qui ne s'affichent pas
- Vérifiez que les fichiers sont bien attachés dans Airtable
- Vérifiez que les URLs des images sont accessibles publiquement

## Fonctionnalités

- ✅ Chargement automatique des produits depuis Airtable
- ✅ Filtrage par statut "publié" uniquement
- ✅ Filtrage par catégorie avec comptage
- ✅ Recherche textuelle dans le titre, description et catégorie
- ✅ Affichage en grille ou en liste
- ✅ Gestion des favoris
- ✅ Lecture audio (si disponible)
- ✅ Gestion des erreurs et du chargement
- ✅ Mise en cache avec React Query
- ✅ Statistiques en temps réel 