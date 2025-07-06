
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Play, Pause, ShoppingCart, Star, Filter } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  audioDescription: string;
  inStock: boolean;
}

const Boutique = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
      shortDescription: "Le smartphone le plus avancé avec un écran OLED exceptionnel et une batterie longue durée.",
      audioDescription: "Découvrez le smartphone le plus avancé avec un écran OLED exceptionnel et une batterie longue durée.",
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
      shortDescription: "Son cristallin avec réduction de bruit active pour une expérience audio immersive.",
      audioDescription: "Plongez dans un son cristallin avec notre casque premium à réduction de bruit active.",
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
      shortDescription: "Performance ultime pour les gamers avec processeur dernière génération.",
      audioDescription: "Performance ultime pour les gamers avec processeur dernière génération et carte graphique dédiée.",
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
      shortDescription: "Suivez votre activité physique avec style grâce à cette montre ultra-complète.",
      audioDescription: "Suivez votre activité physique avec style grâce à cette montre connectée ultra-complète.",
      inStock: true
    },
    {
      id: 5,
      name: "Écouteurs Sans Fil",
      price: 179,
      originalPrice: 229,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=400&fit=crop",
      category: "Audio",
      rating: 4.5,
      reviewCount: 412,
      shortDescription: "Liberté totale avec une qualité sonore exceptionnelle et une autonomie prolongée.",
      audioDescription: "Découvrez la liberté totale avec nos écouteurs sans fil à la qualité sonore exceptionnelle.",
      inStock: true
    },
    {
      id: 6,
      name: "Tablette Graphique",
      price: 399,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
      category: "Créatif",
      rating: 4.8,
      reviewCount: 156,
      shortDescription: "Créez sans limites avec cette tablette graphique professionnelle haute précision.",
      audioDescription: "Libérez votre créativité avec cette tablette graphique professionnelle haute précision.",
      inStock: true
    }
  ];

  const categories = ['all', 'Électronique', 'Audio', 'Informatique', 'Accessoires', 'Créatif'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
    <div className="min-h-screen relative">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50/40 via-transparent to-cyan-50/40 pointer-events-none animate-aurora" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-r from-purple-300 to-cyan-300 rounded-full" />
          </div>
        ))}
      </div>

      <Navigation />
      
      <main className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Notre Boutique
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre collection complète de produits premium, soigneusement sélectionnés pour vous offrir la meilleure qualité.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 font-medium"
              >
                <option value="all">Toutes les catégories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 bg-white/80 backdrop-blur-sm"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
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

                <CardHeader>
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

                <CardContent className="pb-4">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.shortDescription}
                  </p>

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

                  {/* Commander Button */}
                  <button
                    disabled={!product.inStock}
                    className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      product.inStock
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transform hover:scale-105 shadow-lg hover:shadow-purple-500/25'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{product.inStock ? 'Commander' : 'Indisponible'}</span>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Boutique;
