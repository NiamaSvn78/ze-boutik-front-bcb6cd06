import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, SortDesc, Grid, List, Star, Heart, Play, ShoppingCart } from 'lucide-react';
import { useAirtableProducts } from '../hooks/useAirtableProducts';
import { AirtableProduct } from '../types/airtable';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { EmptyState } from '../components/ui/empty-state';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

type SortOption = 'name-asc' | 'name-desc' | 'category-asc' | 'category-desc' | 'newest' | 'oldest';
type ViewMode = 'grid' | 'list';

function normalize(str?: string) {
  return (str || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}

const Boutique: React.FC = () => {
  const { data: products, isLoading, error } = useAirtableProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { addToCart, cart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<AirtableProduct | null>(null);

  // Liste fixe des catégories
  const categories = ['Alimentaire', 'Mode', 'High-tech'];

  React.useEffect(() => {
    if (products) {
      const allCategories = Array.from(new Set(products.map(p => p.categorie)));
      console.log('Catégories trouvées dans les produits publiés :', allCategories);
    }
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categorie?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      // Filtre par catégorie (normalisé, debug)
      const matchesCategory = selectedCategory === 'all' ||
        (normalize(product.categorie) === normalize(selectedCategory));
      if (selectedCategory !== 'all') {
        // Debug : afficher le produit et la catégorie comparée
        if (!matchesCategory) {
          console.log(`Produit ignoré : ${product.title} | Catégorie : "${product.categorie}" (filtre : "${selectedCategory}")`);
        }
      }
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'category-asc':
          return (a.categorie || '').localeCompare(b.categorie || '');
        case 'category-desc':
          return (b.categorie || '').localeCompare(a.categorie || '');
        case 'newest':
          return new Date(b.createdTime || '').getTime() - new Date(a.createdTime || '').getTime();
        case 'oldest':
          return new Date(a.createdTime || '').getTime() - new Date(b.createdTime || '').getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name-asc');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all';

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2 mb-4" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <EmptyState
            icon="alert-circle"
            title="Erreur de chargement"
            description="Impossible de charger les produits. Veuillez réessayer."
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Notre Boutique
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Panier:</span>
              <Badge variant="secondary">{cart.length} article(s)</Badge>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Découvrez notre sélection de produits exceptionnels
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8 space-y-4">
          {/* Search and Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Nom A-Z</SelectItem>
                <SelectItem value="name-desc">Nom Z-A</SelectItem>
                <SelectItem value="category-asc">Catégorie A-Z</SelectItem>
                <SelectItem value="category-desc">Catégorie Z-A</SelectItem>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="oldest">Plus anciens</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode and Clear Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <Filter className="w-4 h-4 mr-2" />
                Effacer les filtres
              </Button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            {filteredAndSortedProducts.length} produit{filteredAndSortedProducts.length !== 1 ? 's' : ''} trouvé{filteredAndSortedProducts.length !== 1 ? 's' : ''}
            {hasActiveFilters && ` (sur ${products?.length || 0} total)`}
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredAndSortedProducts.length === 0 ? (
          <EmptyState
            icon="package"
            title="Aucun produit trouvé"
            description={hasActiveFilters 
              ? "Aucun produit ne correspond à vos critères de recherche. Essayez de modifier vos filtres."
              : "Aucun produit disponible pour le moment."
            }
          />
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {filteredAndSortedProducts.map((product) => (
              <Card key={product.id} className="relative group hover:shadow-lg transition">
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer"
                  style={{ minHeight: 220 }}
                >
                  <CardContent>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                    )}
                    <div className="font-bold text-lg mb-2">{product.title}</div>
                    <div className="text-sm text-gray-500 mb-1">{product.categorie}</div>
                    <div className="text-sm text-gray-700 mb-2">{product.prix ?? 0} €</div>
                  </CardContent>
                </div>
                <Button
                  className="absolute bottom-4 right-4 z-20"
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

        {/* Modale produit */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative z-50">
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
              {(selectedProduct.description || selectedProduct.audio) && (
                <div className="mb-4">
                  {selectedProduct.description && (
                    <div className="text-gray-700 text-sm mb-1 font-medium">{selectedProduct.description}</div>
                  )}
                  {selectedProduct.audio && (
                    <audio src={selectedProduct.audio} controls className="w-full" preload="none" />
                  )}
                </div>
              )}
              <Button
                onClick={() => {
                  console.log('Bouton Ajouter au panier cliqué', selectedProduct);
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
    </Layout>
  );
};

interface ProductCardProps {
  product: AirtableProduct;
  viewMode: ViewMode;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode, isFavorite, onToggleFavorite }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const { addToCart } = useCart();

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Arrêter l'audio si on change de produit ou de vue
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [product.id]);

  // Mettre à jour l'état isPlaying si l'audio se termine
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  const handleAddToCart = () => {
    console.log('Ajout au panier:', product.title);
    addToCart({ id: product.id, nom: product.title, prix: product.prix ?? 0, image: product.image });
  };

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex">
          <div className="w-48 h-48 flex-shrink-0">
            <img
              src={product.image || '/placeholder.svg'}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                {product.categorie && (
                  <Badge variant="secondary" className="mb-2">
                    {product.categorie}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleFavorite}
                className="text-gray-400 hover:text-red-500"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
            
            {product.description && (
              <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
            )}
            
            <div className="space-y-2">
              {(product.description || product.audio) && (
                <div className="mb-2">
                  {product.description && (
                    <div className="text-gray-700 text-sm mb-1 font-medium">{product.description}</div>
                  )}
                  {product.audio && (
                    <audio src={product.audio} controls className="w-full" preload="none" />
                  )}
                </div>
              )}
              <Button
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 hover:from-purple-700 hover:via-pink-600 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={handleAddToCart}
              >
                Ajouter à mon panier
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleFavorite}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
        {product.categorie && (
          <Badge className="absolute top-2 left-2">
            {product.categorie}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        )}
        
        <div className="space-y-2">
          {(product.description || product.audio) && (
            <div className="mb-2">
              {product.description && (
                <div className="text-gray-700 text-sm mb-1 font-medium">{product.description}</div>
              )}
              {product.audio && (
                <audio src={product.audio} controls className="w-full" preload="none" />
              )}
            </div>
          )}
          <Button
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 hover:from-purple-700 hover:via-pink-600 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={handleAddToCart}
          >
            Ajouter à mon panier
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Boutique;