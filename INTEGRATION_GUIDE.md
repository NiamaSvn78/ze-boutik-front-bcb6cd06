# Guide d'Intégration Airtable - Ze-boutik

## 🎯 Vue d'ensemble

Votre frontend React est maintenant entièrement intégré avec Airtable ! Les données de vos produits sont automatiquement récupérées et affichées dans une interface moderne et responsive.

## 🚀 Fonctionnalités Intégrées

### ✅ Chargement Automatique
- Récupération automatique des produits depuis Airtable
- Mise en cache intelligente avec React Query (5 minutes)
- Gestion des erreurs et états de chargement

### ✅ Interface Utilisateur
- Affichage en grille ou en liste
- Filtrage par catégorie avec comptage des produits
- Recherche textuelle avancée
- Système de favoris
- Lecture audio (si disponible)
- Statistiques en temps réel
- Filtrage automatique des produits publiés uniquement

### ✅ Gestion des Données
- Types TypeScript complets
- Validation des données
- Gestion des images manquantes
- Support des fichiers audio

## 📋 Configuration Requise

### 1. Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_AIRTABLE_TABLE_NAME=your_table_name_here
```

### 2. Structure Airtable

Votre table doit contenir ces champs :

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `titre_accrocheur` | Single line text | ✅ | Nom du produit |
| `photo_produit` | Attachment | ❌ | Image du produit |
| `liste_caracteristiques` | Long text | ❌ | Description détaillée |
| `description_audio` | Attachment | ❌ | Fichier audio |
| `categorie` | Single select | ❌ | Catégorie du produit |
| `statut_produit` | Single select | ✅ | Statut du produit (doit contenir "publié") |

## 🔧 Architecture Technique

### Structure des Fichiers

```
src/
├── components/
│   ├── Products.tsx          # Composant principal
│   ├── ProductCard.tsx       # Carte produit individuelle
│   ├── ProductStats.tsx      # Statistiques des produits
│   └── ui/
│       ├── loading-state.tsx # État de chargement
│       └── error-state.tsx   # État d'erreur
├── hooks/
│   └── useAirtableProducts.ts # Hook React Query
├── lib/
│   └── airtable.ts           # API Airtable
└── types/
    └── airtable.ts           # Types TypeScript
```

### Flux de Données

1. **Hook useAirtableProducts** → Récupère les données avec React Query
2. **Composant Products** → Gère l'état et l'affichage
3. **ProductCard** → Affiche chaque produit individuellement
4. **ProductStats** → Affiche les statistiques

## 🎨 Personnalisation

### Modifier l'Apparence

Les composants utilisent Tailwind CSS. Vous pouvez personnaliser :

```tsx
// Dans ProductCard.tsx
<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
```

### Ajouter de Nouveaux Champs

1. **Mettre à jour les types** dans `src/types/airtable.ts`
2. **Modifier la fonction** `getcatalogues()` dans `src/lib/airtable.ts`
3. **Mettre à jour l'affichage** dans `ProductCard.tsx`

### Exemple : Ajouter un champ "Prix"

```typescript
// Dans types/airtable.ts
export interface AirtableRecord {
  fields: {
    // ... autres champs
    prix?: number;
  };
}

// Dans lib/airtable.ts
return data.records.map((record) => ({
  // ... autres champs
  prix: record.fields.prix,
}));

// Dans ProductCard.tsx
{product.prix && (
  <div className="text-2xl font-bold text-green-600">
    {product.prix}€
  </div>
)}
```

## 🐛 Dépannage

### Erreurs Courantes

#### "Configuration Airtable incomplète"
- Vérifiez que toutes les variables d'environnement sont définies
- Redémarrez le serveur de développement

#### "Erreur HTTP: 401"
- Vérifiez votre clé API Airtable
- Assurez-vous qu'elle a les bonnes permissions

#### "Erreur HTTP: 404"
- Vérifiez l'ID de la base et le nom de la table
- Assurez-vous que la table existe

#### Images qui ne s'affichent pas
- Vérifiez que les fichiers sont attachés dans Airtable
- Les URLs doivent être accessibles publiquement

### Debug

Activez les logs dans la console du navigateur :

```typescript
// Dans lib/airtable.ts
console.log("Réponse Airtable complète :", data);
```

## 📈 Optimisations

### Performance

- **Cache React Query** : 5 minutes par défaut
- **Images lazy loading** : Automatique avec `loading="lazy"`
- **Fallback images** : Placeholder automatique

### Sécurité

- **Variables d'environnement** : Clés API sécurisées
- **Validation des données** : Types TypeScript stricts
- **Gestion d'erreurs** : Messages d'erreur appropriés

## 🔄 Mise à Jour

### Ajouter de Nouveaux Produits

1. Ajoutez les données dans Airtable
2. Les produits apparaîtront automatiquement
3. Pas besoin de redéployer l'application

### Modifier l'Affichage

1. Modifiez les composants React
2. Redémarrez le serveur de développement
3. Les changements sont immédiats

## 📞 Support

Pour toute question ou problème :

1. Vérifiez la console du navigateur
2. Consultez les logs du serveur
3. Vérifiez la documentation Airtable
4. Testez avec l'API Airtable directement

## 🎉 Félicitations !

Votre boutique en ligne est maintenant connectée à Airtable ! Vous pouvez :

- ✅ Gérer vos produits depuis Airtable
- ✅ Avoir une interface moderne et responsive
- ✅ Bénéficier d'une architecture scalable
- ✅ Personnaliser facilement l'affichage 