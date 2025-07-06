
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Play, Pause, ShoppingCart, Heart, Star, Filter, Grid, List } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  audioDescription: string;
  features: string[];
  inStock: boolean;
}

const Products = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Smartphone Pro Max",
      price: 999,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
      category: "Électronique",
      rating: 4.8,
      reviewCount: 324,
      audioDescription: "Découvrez le smartphone le plus avancé avec un écran OLED exceptionnel et une batterie longue durée.",
      features: ["Écran OLED 6.7\"", "128GB de stockage", "Triple caméra 48MP", "5G Ready", "Charge sans fil"],
      inStock: true
    },
    {
      id: 2,
      name: "Casque Audio Premium",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
      category: "Audio",
      rating: 4.9,
      reviewCount: 156,
      audioDescription: "Plongez dans un son cristallin avec notre casque premium à réduction de bruit active.",
      features: ["Réduction de bruit active", "30h d'autonomie", "Bluetooth 5.2", "Charge rapide", "Assistant vocal"],
      inStock: true
    },
    {
      id: 3,
      name: "Ordinateur Portable Gaming",
      price: 1499,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop",
      category: "Informatique",
      rating: 4.7,
      reviewCount: 89,
      audioDescription: "Performance ultime pour les gamers avec processeur dernière génération et carte graphique dédiée.",
      features: ["Intel i7 12è gen", "RTX 4060", "16GB RAM", "512GB SSD", "Écran 144Hz"],
      inStock: false
    },
    {
      id: 4,
      name: "Montre Connectée Sport",
      price: 249,
      originalPrice: 329,
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop",
      category: "Accessoires",
      rating: 4.6,
      reviewCount: 203,
      audioDescription: "Suivez votre activité physique avec style grâce à cette montre connectée ultra-complète.",
      features: ["GPS intégré", "Moniteur cardiaque", "Étanche 50m", "7 jours d'autonomie", "100+ sports"],
      inStock: true
    }
  ];

  const categories = ['all', 'Électronique', 'Audio', 'Informatique', 'Accessoires'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const playAudio = (productId: number) => {
    if (playingAudio === productId) {
      setPlayingAudio(null);
      // Stop audio logic here
    } else {
      setPlayingAudio(productId);
      // Play audio logic here
    }
  };

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

        {/* Filters & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-200 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Toutes les catégories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
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
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 bg-white/80 backdrop-blur-sm ${
                viewMode === 'list' ? 'flex flex-row' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                    viewMode === 'list' ? 'h-full' : 'h-48'
                  }`}
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.originalPrice && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                      -{Math.round((1 - product.price/product.originalPrice) * 100)}%
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
                      Rupture
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
                >
                  <Heart 
                    className={`w-4 h-4 transition-colors ${
                      favorites.includes(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>

                {/* Audio Button */}
                <button
                  onClick={() => playAudio(product.id)}
                  className="absolute bottom-3 right-3 p-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition-all duration-200"
                >
                  {playingAudio === product.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className={`flex-1 ${viewMode === 'list' ? 'p-6' : ''}`}>
                <CardHeader className={viewMode === 'list' ? 'p-0 pb-4' : ''}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {product.rating} ({product.reviewCount})
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className={viewMode === 'list' ? 'p-0' : 'pb-4'}>
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Caractéristiques :</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{product.features.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price}€
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.originalPrice}€
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      product.inStock
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transform hover:scale-105 shadow-lg hover:shadow-purple-500/25'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.inStock ? 'Ajouter au panier' : 'Indisponible'}</span>
                  </button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 hover:from-purple-700 hover:via-pink-600 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              Voir plus de produits
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
