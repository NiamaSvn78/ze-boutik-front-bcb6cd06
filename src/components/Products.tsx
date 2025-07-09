import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Play, Pause, ShoppingCart, Heart, Star, Filter, Grid, List } from 'lucide-react';
import { useAirtableProducts } from '../hooks/useAirtableProducts';
import { AirtableProduct } from '../types/airtable';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { EmptyState } from './ui/empty-state';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<AirtableProduct | null>(null);

  // Récupération des données Airtable avec React Query
  const { data: products = [], isLoading, error } = useAirtableProducts();

  // Récupération des catégories uniques - DOIT être avant les conditions de retour
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = new Set(products.map(p => p.categorie).filter(Boolean));
    return Array.from(uniqueCategories);
  }, [products]);

  // Filtrage des produits avec useMemo pour optimiser les performances
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtre par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.categorie === selectedCategory);
    }

    // Filtre par recherche
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.categorie?.toLowerCase().includes(searchLower)
      );
    }

    // TRI par catégorie puis alphabétique
    filtered = filtered.slice().sort((a, b) => {
      if (a.categorie < b.categorie) return -1;
      if (a.categorie > b.categorie) return 1;
      return a.title.localeCompare(b.title);
    });

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const playAudio = (productId: string) => {
    if (playingAudio === productId) {
      setPlayingAudio(null);
      // Stop audio logic here
    } else {
      setPlayingAudio(productId);
      // Play audio logic here
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
  };

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return (
      <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            icon="alert-circle"
            title="Erreur de chargement"
            description="Impossible de charger les produits. Veuillez réessayer."
          />
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Nos Produits
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de produits premium, soigneusement choisis pour vous offrir la meilleure qualité.
          </p>
        </div>

        {/* Product Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{products.length}</div>
              <div className="text-sm text-gray-600">Produits</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Catégories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">
                {products.filter(p => p.audio).length}
              </div>
              <div className="text-sm text-gray-600">Avec Audio</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {products.filter(p => p.statut_produit === 'publié').length}
              </div>
              <div className="text-sm text-gray-600">Publiés</div>
            </CardContent>
          </Card>
        </div>

        {/* Product Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              Toutes ({products.length})
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category} ({products.filter(p => p.categorie === category).length})
              </Button>
            ))}
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory !== 'all') && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Effacer les filtres
            </Button>
          )}
        </div>

        {/* View Mode Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
            {(searchTerm || selectedCategory !== 'all') && ` (sur ${products.length} total)`}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <EmptyState
            icon="package"
            title="Aucun produit trouvé"
            description={
              searchTerm || selectedCategory !== 'all'
                ? "Aucun produit ne correspond à vos critères de recherche."
                : "Aucun produit disponible pour le moment."
            }
          />
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="relative group hover:shadow-lg transition">
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer"
                  style={{ minHeight: 180 }}
                >
                  <CardContent>
                    <div className="font-bold text-lg mb-2">{product.title}</div>
                    <div className="text-sm text-gray-500 mb-1">{product.categorie}</div>
                    <div className="text-sm text-gray-700 mb-2">{product.prix ?? 0} €</div>
                  </CardContent>
                </div>
                <Button
                  className="absolute bottom-4 right-4 z-10"
                  size="sm"
                  onClick={e => {
                    e.stopPropagation();
                    addToCart({
                      id: product.id,
                      nom: product.title,
                      prix: product.prix ?? 0,
                      image: product.image,
                    });
                  }}
                >
                  Commander
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 hover:from-purple-700 hover:via-pink-600 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              Voir plus de produits
            </Button>
          </div>
        )}

        {/* Modale produit */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-black"
                onClick={() => setSelectedProduct(null)}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
              <div className="mb-2">{selectedProduct.description}</div>
              <div className="mb-2">Catégorie : {selectedProduct.categorie}</div>
              <div className="mb-2">Prix : {selectedProduct.prix ?? 0} €</div>
              <Button
                onClick={() => {
                  addToCart({
                    id: selectedProduct.id,
                    nom: selectedProduct.title,
                    prix: selectedProduct.prix ?? 0,
                    image: selectedProduct.image,
                  });
                  setSelectedProduct(null);
                }}
              >
                Ajouter au panier
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: AirtableProduct;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  isPlayingAudio: boolean;
  onToggleFavorite: (productId: string) => void;
  onPlayAudio: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  isFavorite,
  isPlayingAudio,
  onToggleFavorite,
  onPlayAudio
}) => {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${
      viewMode === 'list' ? 'flex' : ''
    }`}>
      <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1 flex' : ''}`}>
        <div className={`${viewMode === 'list' ? 'flex space-x-4' : ''}`}>
          {/* Image */}
          <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'mb-4'}`}>
            <img
              src={product.image || '/placeholder.svg'}
              alt={product.title}
              className={`w-full h-full object-cover rounded-lg ${
                viewMode === 'list' ? 'w-32 h-32' : 'h-48'
              }`}
            />
            {product.audio && (
              <button
                onClick={() => onPlayAudio(product.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => onToggleFavorite(product.id)}
              className={`absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Content */}
          <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {product.title}
              </h3>
            </div>

            {product.categorie && (
              <Badge variant="secondary" className="mb-2">
                {product.categorie}
              </Badge>
            )}

            {product.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">Commander</span>
              </div>
              {product.audio && (
                <div className="flex items-center space-x-1">
                  <Play className="w-3 h-3 text-cyan-600" />
                  <span className="text-xs text-gray-500">Audio</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Products;
