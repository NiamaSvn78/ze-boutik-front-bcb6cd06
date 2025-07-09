import React from 'react';
import { Package, Tag, Music, Image } from 'lucide-react';
import { AirtableProduct } from '../types/airtable';

interface ProductStatsProps {
  products: AirtableProduct[];
}

export const ProductStats: React.FC<ProductStatsProps> = ({ products }) => {
  const stats = {
    total: products.length,
    categories: new Set(products.map(p => p.categorie).filter(Boolean)).size,
    withAudio: products.filter(p => p.audio).length,
    withImages: products.filter(p => p.image).length,
    published: products.filter(p => p.statut_produit === 'publié').length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <Package className="w-6 h-6 text-purple-600" />
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Produits</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <Tag className="w-6 h-6 text-cyan-600" />
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
            <p className="text-sm text-gray-600">Catégories</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <Music className="w-6 h-6 text-pink-600" />
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.withAudio}</p>
            <p className="text-sm text-gray-600">Avec audio</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <Image className="w-6 h-6 text-green-600" />
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.withImages}</p>
            <p className="text-sm text-gray-600">Avec images</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
            <p className="text-sm text-gray-600">Publiés</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 