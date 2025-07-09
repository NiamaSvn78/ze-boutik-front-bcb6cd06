# Guide de Dépannage - Synchronisation Airtable

## 🚨 Problème : "Mes produits ne s'affichent pas"

### Étape 1 : Vérifier la Configuration

#### 1.1 Variables d'Environnement
Vérifiez votre fichier `.env` à la racine du projet :

```env
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_AIRTABLE_TABLE_NAME=your_table_name_here
```

**Comment obtenir ces informations :**

- **API Key** : 
  1. Allez sur [Airtable.com](https://airtable.com)
  2. Cliquez sur votre avatar → "Developer hub"
  3. Créez une nouvelle clé API

- **Base ID** :
  1. Ouvrez votre base Airtable
  2. L'URL ressemble à : `https://airtable.com/appXXXXXXXXXXXXXX/...`
  3. Copiez `appXXXXXXXXXXXXXX`

- **Table Name** :
  1. Dans votre base, le nom de la table est visible dans l'onglet
  2. Utilisez le nom exact (attention aux majuscules/minuscules)

#### 1.2 Redémarrer le Serveur
Après avoir modifié le fichier `.env` :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis redémarrez
npm run dev
```

### Étape 2 : Vérifier la Structure Airtable

#### 2.1 Champs Requis
Votre table doit contenir ces champs exactement :

| Champ | Type | Exemple de Valeur |
|-------|------|-------------------|
| `titre_accrocheur` | Single line text | "Mon Produit" |
| `statut_produit` | Single select | **"publié"** (exactement) |
| `categorie` | Single select | "Électronique" |
| `liste_caracteristiques` | Long text | "Description..." |
| `photo_produit` | Attachment | [Fichier image] |
| `description_audio` | Attachment | [Fichier audio] |

#### 2.2 Vérifier le Statut
**IMPORTANT** : Le champ `statut_produit` doit contenir exactement `"publié"` (en minuscules, avec accent).

❌ **Valeurs incorrectes :**
- "Publié" (avec majuscule)
- "publie" (sans accent)
- "active"
- "en ligne"

✅ **Valeur correcte :**
- "publié" (exactement)

### Étape 3 : Utiliser le Panneau de Debug

#### 3.1 Ouvrir le Debug Panel
1. Démarrez votre application en mode développement
2. Cliquez sur l'icône 🐛 en bas à droite
3. Vérifiez les informations affichées

#### 3.2 Interpréter les Résultats

**Configuration :**
- ✅ Base ID : `appXXXXXXXXXXXXXX`
- ✅ Table : `Nom de votre table`
- ✅ API Key : `Présent`

**État :**
- ✅ Chargement : `Terminé`
- ✅ Produits trouvés : `X` (doit être > 0)

**Si vous voyez des ❌ :**
- Vérifiez votre fichier `.env`
- Redémarrez le serveur

### Étape 4 : Vérifier la Console

#### 4.1 Ouvrir la Console
1. Appuyez sur F12 dans votre navigateur
2. Allez dans l'onglet "Console"
3. Rechargez la page

#### 4.2 Messages à Chercher

**Messages de succès :**
```
✅ X produits chargés avec succès depuis Airtable
```

**Messages d'erreur :**
```
❌ Erreur lors du chargement des produits: Configuration Airtable incomplète
❌ Erreur HTTP: 401 Unauthorized
❌ Erreur HTTP: 404 Not Found
```

**Messages de debug :**
```
URL Airtable: https://api.airtable.com/v0/appXXXXXXXXXXXXXX/TableName
Nombre total d'enregistrements: X
Tous les enregistrements avec leurs statuts: [...]
Nombre de produits publiés: X
```

### Étape 5 : Solutions Spécifiques

#### 5.1 Erreur 401 (Unauthorized)
```
❌ Erreur HTTP: 401 Unauthorized
```

**Solution :**
1. Régénérez votre clé API Airtable
2. Mettez à jour le fichier `.env`
3. Redémarrez le serveur

#### 5.2 Erreur 404 (Not Found)
```
❌ Erreur HTTP: 404 Not Found
```

**Solution :**
1. Vérifiez l'ID de la base
2. Vérifiez le nom exact de la table
3. Assurez-vous que la table existe

#### 5.3 "Configuration Airtable incomplète"
```
❌ Configuration Airtable incomplète
```

**Solution :**
1. Vérifiez que toutes les variables sont définies
2. Vérifiez l'orthographe des noms de variables
3. Redémarrez le serveur

#### 5.4 "0 produits trouvés"
```
✅ 0 produits chargés avec succès depuis Airtable
```

**Solution :**
1. Vérifiez que vous avez des produits avec `statut_produit = "publié"`
2. Vérifiez l'orthographe du statut
3. Créez un produit de test

### Étape 6 : Test de Synchronisation

#### 6.1 Créer un Produit de Test
1. Dans Airtable, créez un nouveau produit
2. Remplissez tous les champs requis
3. **IMPORTANT** : Mettez le statut_produit à `"publié"`
4. Sauvegardez

#### 6.2 Vérifier la Synchronisation
1. Attendez 1 minute (synchronisation automatique)
2. Ou cliquez sur le bouton 🔄 dans le debug panel
3. Vérifiez que le produit apparaît

### Étape 7 : Synchronisation en Temps Réel

#### 7.1 Comment ça Marche
- Les données se mettent à jour automatiquement toutes les minutes
- Vous pouvez forcer une mise à jour avec le bouton 🔄
- Les modifications dans Airtable apparaissent automatiquement

#### 7.2 Optimiser la Synchronisation
Si vous voulez une synchronisation plus rapide :

```typescript
// Dans src/hooks/useAirtableProducts.ts
refetchInterval: 30 * 1000, // 30 secondes au lieu de 60
```

### Étape 8 : Vérifications Finales

#### 8.1 Checklist
- [ ] Fichier `.env` correctement configuré
- [ ] Serveur redémarré après modification
- [ ] Produits avec statut_produit `"publié"` dans Airtable
- [ ] Console sans erreurs
- [ ] Debug panel affiche les bonnes informations
- [ ] Synchronisation automatique activée

#### 8.2 Test Complet
1. Modifiez un produit dans Airtable
2. Attendez 1 minute
3. Vérifiez que les changements apparaissent dans votre frontend

## 🆘 Si Rien ne Fonctionne

### Contactez le Support
1. Prenez une capture d'écran du debug panel
2. Copiez les messages d'erreur de la console
3. Décrivez exactement ce que vous voyez

### Informations à Fournir
- URL de votre base Airtable
- Nom exact de votre table
- Messages d'erreur complets
- Configuration de votre fichier `.env` (sans la clé API)

## ✅ Résultat Attendu

Après avoir suivi ce guide, vous devriez voir :
- ✅ Vos produits s'afficher automatiquement
- ✅ Les modifications Airtable se répercuter en temps réel
- ✅ Un statut de synchronisation vert
- ✅ Le nombre correct de produits dans les statistiques 