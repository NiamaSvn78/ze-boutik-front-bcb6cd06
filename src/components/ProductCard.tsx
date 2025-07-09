import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Play, Pause, ShoppingCart, Heart } from 'lucide-react';
import { AirtableProduct } from '../types/airtable';

interface ProductCardProps {
  product: AirtableProduct;
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  isPlayingAudio: boolean;
  onToggleFavorite: (productId: string) => void;
  onPlayAudio: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  isFavorite,
  isPlayingAudio,
  onToggleFavorite,
  onPlayAudio,
}) => {
  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 bg-white/80 backdrop-blur-sm ${
        viewMode === 'list' ? 'flex flex-row' : ''
      }`}
    >
      <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            viewMode === 'list' ? 'h-full' : 'h-48'
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
        
        {/* Audio Button - only show if audio is available */}
        {product.audio && (
          <button
            onClick={() => onPlayAudio(product.id)}
            className="absolute bottom-3 right-3 p-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition-all duration-200"
          >
            {isPlayingAudio ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isFavorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-400'
            }`} 
          />
        </button>
      </div>

      <div className={`flex-1 ${viewMode === 'list' ? 'p-6' : ''}`}>
        <CardHeader className={viewMode === 'list' ? 'p-0 pb-4' : ''}>
          <div className="flex justify-between items-start mb-2">
            {product.categorie && (
              <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                {product.categorie}
              </span>
            )}
          </div>
          <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
            {product.title}
          </CardTitle>
        </CardHeader>

        <CardContent className={viewMode === 'list' ? 'p-0' : 'pb-4'}>
          {/* Description */}
          {product.description && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 line-clamp-3">
                {product.description}
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Voir les détails</span>
          </button>
        </CardContent>
      </div>
    </Card>
  );
}; 