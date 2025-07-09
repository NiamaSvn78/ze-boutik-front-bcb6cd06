# 🚨 Diagnostic Rapide - Produits qui ne s'affichent pas

## Étape 1 : Vérification Immédiate

### 1.1 Ouvrir la Console
1. Appuyez sur **F12** dans votre navigateur
2. Allez dans l'onglet **"Console"**
3. Rechargez la page

### 1.2 Utiliser le Panneau de Debug
1. Cliquez sur l'icône **🐛** en bas à droite de votre écran
2. Vérifiez que toutes les variables sont **vertes**
3. Cliquez sur **"Diagnostic complet"**

## Étape 2 : Vérifications Critiques

### 2.1 Fichier .env
Créez un fichier `.env` à la racine de votre projet :

```env
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_AIRTABLE_TABLE_NAME=your_table_name_here
```

### 2.2 Redémarrer le Serveur
```bash
# Arrêtez le serveur (Ctrl+C)
npm run dev
```

## Étape 3 : Vérification Airtable

### 3.1 Statut des Produits
Dans votre table Airtable, vérifiez que le champ `statut_produit` contient **exactement** :
- ✅ `"publié"` (en minuscules, avec accent)
- ❌ PAS `"Publié"` (avec majuscule)
- ❌ PAS `"publie"` (sans accent)
- ❌ PAS `"active"` ou autre

### 3.2 Structure de la Table
Votre table doit contenir ces champs :
- `titre_accrocheur` (Single line text)
- `statut_produit` (Single select) ← **CRITIQUE**
- `categorie` (Single select)
- `liste_caracteristiques` (Long text)

## Étape 4 : Test Rapide

### 4.1 Créer un Produit de Test
1. Dans Airtable, créez un nouveau produit
2. Remplissez le titre : "Test Produit"
3. **IMPORTANT** : Mettez le statut_produit à `"publié"`
4. Sauvegardez

### 4.2 Vérifier l'Affichage
1. Attendez 1 minute
2. Vérifiez que le produit apparaît
3. Si non, cliquez sur le bouton 🔄 dans le debug panel

## Étape 5 : Messages d'Erreur Courants

### ❌ "Configuration Airtable incomplète"
**Solution :** Vérifiez votre fichier `.env` et redémarrez le serveur

### ❌ "Erreur HTTP: 401"
**Solution :** Régénérez votre clé API Airtable

### ❌ "Erreur HTTP: 404"
**Solution :** Vérifiez l'ID de la base et le nom de la table

### ✅ "0 produits trouvés"
**Solution :** Vérifiez que vous avez des produits avec `statut_produit = "publié"`

## Étape 6 : Diagnostic Automatique

### 6.1 Lancer le Diagnostic
1. Ouvrez le panneau de debug (🐛)
2. Cliquez sur **"Diagnostic complet"**
3. Regardez les résultats dans la console

### 6.2 Interpréter les Résultats
- **Connexion réussie** : ✅ Configuration OK
- **X enregistrements trouvés** : ✅ Données présentes
- **0 produits publiés** : ❌ Problème de statut
- **Erreur** : ❌ Problème de configuration

## Étape 7 : Solutions Spécifiques

### Si 0 produit publié trouvé :
1. Vérifiez l'orthographe du statut dans Airtable
2. Utilisez le bouton **"Tester les statuts"** dans le debug panel
3. Corrigez le statut si nécessaire

### Si erreur de connexion :
1. Vérifiez votre clé API
2. Vérifiez l'ID de la base
3. Vérifiez le nom de la table

### Si configuration manquante :
1. Créez le fichier `.env`
2. Ajoutez vos informations
3. Redémarrez le serveur

## 🆘 Urgence - Aucune Solution

Si rien ne fonctionne :

1. **Capturez l'écran** du debug panel
2. **Copiez les messages** de la console
3. **Vérifiez** que vous avez bien des produits avec `statut_produit = "publié"`
4. **Testez** avec un produit de test simple

## ✅ Vérification Finale

Après avoir suivi ces étapes, vous devriez voir :
- ✅ Le panneau de debug affiche vos informations
- ✅ La console montre des produits trouvés
- ✅ Vos produits s'affichent dans l'interface
- ✅ La synchronisation fonctionne

---

**💡 Conseil :** Le problème le plus courant est l'orthographe du statut_produit. Assurez-vous qu'il contient exactement `"publié"` (minuscules + accent). 