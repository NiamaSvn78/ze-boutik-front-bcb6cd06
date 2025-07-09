# Guide de Test - Intégration Airtable

## 🧪 Tests à Effectuer

### 1. Configuration de Base

#### ✅ Variables d'Environnement
```bash
# Vérifiez que votre fichier .env contient :
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_AIRTABLE_TABLE_NAME=your_table_name_here
```

#### ✅ Structure Airtable
Vérifiez que votre table contient :
- [ ] Champ `titre_accrocheur` (Single line text)
- [ ] Champ `photo_produit` (Attachment) - optionnel
- [ ] Champ `liste_caracteristiques` (Long text) - optionnel
- [ ] Champ `description_audio` (Attachment) - optionnel
- [ ] Champ `categorie` (Single select) - optionnel
- [ ] Champ `statut_produit` (Single select) - **OBLIGATOIRE**

### 2. Test des Données

#### ✅ Produits Publiés
1. Créez un produit dans Airtable avec `statut_produit = "publié"`
2. Vérifiez qu'il apparaît dans votre frontend
3. Vérifiez que les produits avec d'autres statuts ne s'affichent pas

#### ✅ Champs Optionnels
1. Testez avec un produit sans image → doit afficher un placeholder
2. Testez avec un produit sans description → doit s'afficher correctement
3. Testez avec un produit sans audio → le bouton audio ne doit pas apparaître
4. Testez avec un produit sans catégorie → doit s'afficher sans catégorie

### 3. Test des Filtres

#### ✅ Filtre par Catégorie
1. Sélectionnez une catégorie dans le dropdown
2. Vérifiez que seuls les produits de cette catégorie s'affichent
3. Vérifiez que le comptage des produits est correct
4. Testez "Toutes les catégories" → tous les produits doivent s'afficher

#### ✅ Recherche Textuelle
1. Tapez le nom d'un produit → doit filtrer les résultats
2. Tapez une partie du nom → doit trouver les correspondances
3. Tapez une catégorie → doit trouver les produits de cette catégorie
4. Tapez du texte qui n'existe pas → doit afficher "Aucun produit trouvé"

#### ✅ Combinaison de Filtres
1. Sélectionnez une catégorie ET tapez du texte
2. Vérifiez que les deux filtres fonctionnent ensemble
3. Testez "Effacer tous les filtres" → doit réinitialiser

### 4. Test de l'Interface

#### ✅ Affichage
1. Testez le mode grille → 4 colonnes sur grand écran
2. Testez le mode liste → 1 colonne avec image à gauche
3. Vérifiez que les images se redimensionnent correctement
4. Testez sur mobile → responsive design

#### ✅ Interactions
1. Cliquez sur le cœur → doit ajouter/retirer des favoris
2. Cliquez sur le bouton audio (si disponible) → doit changer d'icône
3. Cliquez sur "Voir les détails" → doit avoir un effet hover

#### ✅ États de Chargement
1. Vérifiez l'animation de chargement
2. Testez avec une connexion lente
3. Vérifiez les messages d'erreur

### 5. Test des Statistiques

#### ✅ Compteurs
1. Vérifiez que le nombre total de produits est correct
2. Vérifiez que le nombre de catégories est correct
3. Vérifiez que le nombre de produits avec audio est correct
4. Vérifiez que le nombre de produits avec images est correct
5. Vérifiez que le nombre de produits publiés est correct

### 6. Test de Performance

#### ✅ Cache
1. Rechargez la page → les données doivent se charger rapidement
2. Vérifiez que React Query met en cache les données
3. Testez la revalidation après 5 minutes

#### ✅ Optimisations
1. Vérifiez que les images utilisent le lazy loading
2. Testez avec beaucoup de produits → performance acceptable
3. Vérifiez que les filtres sont optimisés avec useMemo

## 🐛 Dépannage

### Erreurs Courantes

#### "Configuration Airtable incomplète"
```bash
# Solution : Vérifiez votre fichier .env
cat .env
```

#### "Erreur HTTP: 401"
```bash
# Solution : Régénérez votre clé API Airtable
# Allez sur airtable.com → Account → Developer hub
```

#### "Aucun produit trouvé"
```bash
# Solution : Vérifiez dans Airtable
# 1. Le champ statut_produit contient "publié" (exactement)
# 2. Le nom de la table est correct
# 3. L'ID de la base est correct
```

#### Images qui ne s'affichent pas
```bash
# Solution : Vérifiez dans Airtable
# 1. Les fichiers sont bien attachés
# 2. Les URLs sont accessibles publiquement
# 3. Pas de restrictions CORS
```

## 📊 Métriques de Test

### Performance
- [ ] Temps de chargement initial < 3 secondes
- [ ] Temps de filtrage < 500ms
- [ ] Temps de recherche < 300ms

### Fonctionnalité
- [ ] 100% des produits publiés s'affichent
- [ ] 0% des produits non publiés s'affichent
- [ ] Tous les filtres fonctionnent
- [ ] Toutes les interactions sont fluides

### Compatibilité
- [ ] Fonctionne sur Chrome
- [ ] Fonctionne sur Firefox
- [ ] Fonctionne sur Safari
- [ ] Fonctionne sur mobile

## ✅ Checklist Finale

- [ ] Configuration Airtable complète
- [ ] Variables d'environnement définies
- [ ] Produits avec statut_produit "publié" créés
- [ ] Filtres fonctionnels
- [ ] Recherche fonctionnelle
- [ ] Interface responsive
- [ ] Performance acceptable
- [ ] Gestion d'erreurs en place

## 🎯 Résultat Attendu

Après tous ces tests, vous devriez avoir :
- ✅ Une boutique en ligne fonctionnelle
- ✅ Des produits qui se chargent depuis Airtable
- ✅ Un système de filtres avancé
- ✅ Une interface moderne et responsive
- ✅ Une performance optimale 