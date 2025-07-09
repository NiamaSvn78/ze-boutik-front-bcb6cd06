import React from 'react';
import { Filter, X, Search } from 'lucide-react';
import { AirtableProduct } from '../types/airtable';

interface ProductFiltersProps {
  products: AirtableProduct[];
  selectedCategory: string;
  searchTerm: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  products,
  selectedCategory,
  searchTerm,
  onCategoryChange,
  onSearchChange,
  onClearFilters,
}) => {
  // Extraction des catégories uniques
  const categories = Array.from(new Set(products.map(p => p.categorie).filter(Boolean) as string[]));
  
  // Comptage des produits par catégorie
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = products.filter(p => p.categorie === category).length;
    return acc;
  }, {} as Record<string, number>);

  const hasActiveFilters = selectedCategory !== 'all' || searchTerm !== '';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Titre et icône */}
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filtres</h3>
        </div>

        {/* Barre de recherche */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Filtre par catégorie */}
        <div className="flex items-center space-x-2">
          <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
            Catégorie:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">
              Toutes les catégories ({products.length})
            </option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category} ({categoryCounts[category]})
              </option>
            ))}
          </select>
        </div>

        {/* Bouton pour effacer les filtres */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Effacer les filtres</span>
          </button>
        )}
      </div>

      {/* Affichage des filtres actifs */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                Catégorie: {selectedCategory}
                <button
                  onClick={() => onCategoryChange('all')}
                  className="ml-2 hover:text-purple-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Recherche: "{searchTerm}"
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-2 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Statistiques des filtres */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` dans la catégorie "${selectedCategory}"`}
          {searchTerm && ` pour "${searchTerm}"`}
        </p>
      </div>
    </div>
  );
}; 