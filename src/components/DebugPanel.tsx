import React, { useState } from 'react';
import { Bug, Eye, EyeOff, RefreshCw, Search, AlertTriangle } from 'lucide-react';
import { useAirtableProducts } from '../hooks/useAirtableProducts';
import { testAirtableConnection, testStatusVariants } from '../lib/airtable-debug';

export const DebugPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: products, isLoading, error, refetch } = useAirtableProducts();

  // Vérifier les variables d'environnement
  const envVars = {
    baseId: import.meta.env.VITE_AIRTABLE_BASE_ID,
    tableName: import.meta.env.VITE_AIRTABLE_TABLE_NAME,
    apiKey: import.meta.env.VITE_AIRTABLE_API_KEY ? 'Présent' : 'Manquant',
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          title="Ouvrir le panneau de debug"
        >
          <Bug className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-96 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
      <div className="bg-purple-600 text-white p-3 flex justify-between items-center">
        <h3 className="font-semibold flex items-center space-x-2">
          <Bug className="w-4 h-4" />
          <span>Debug Panel</span>
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => refetch()}
            className="p-1 hover:bg-purple-700 rounded transition-colors"
            title="Rafraîchir les données"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-purple-700 rounded transition-colors"
            title="Fermer"
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 max-h-80 overflow-y-auto">
        {/* Variables d'environnement */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Configuration</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base ID:</span>
              <span className={`font-mono ${envVars.baseId ? 'text-green-600' : 'text-red-600'}`}>
                {envVars.baseId || 'Manquant'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Table:</span>
              <span className={`font-mono ${envVars.tableName ? 'text-green-600' : 'text-red-600'}`}>
                {envVars.tableName || 'Manquant'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">API Key:</span>
              <span className={`font-mono ${envVars.apiKey === 'Présent' ? 'text-green-600' : 'text-red-600'}`}>
                {envVars.apiKey}
              </span>
            </div>
          </div>
        </div>

        {/* État de chargement */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">État</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Chargement:</span>
              <span className={isLoading ? 'text-yellow-600' : 'text-green-600'}>
                {isLoading ? 'En cours...' : 'Terminé'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Produits trouvés:</span>
              <span className="text-blue-600 font-semibold">
                {products?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Erreurs */}
        {error && (
          <div className="mb-4">
            <h4 className="font-semibold text-red-800 mb-2">Erreur</h4>
            <div className="bg-red-50 border border-red-200 rounded p-2 text-sm text-red-800">
              {error instanceof Error ? error.message : 'Erreur inconnue'}
            </div>
          </div>
        )}

        {/* Liste des produits */}
        {products && products.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Produits ({products.length})</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="text-sm bg-gray-50 p-2 rounded">
                  <div className="font-medium text-gray-800">{product.title}</div>
                  <div className="text-gray-600">
                    Catégorie: {product.categorie || 'Aucune'} | 
                    Statut: {product.statut_produit || 'Non défini'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={() => {
              console.log('Configuration:', envVars);
              console.log('Produits:', products);
              console.log('Erreur:', error);
            }}
            className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
          >
            Log dans la console
          </button>
          
          <button
            onClick={async () => {
              console.clear();
              await testAirtableConnection();
            }}
            className="w-full bg-purple-600 text-white py-2 px-3 rounded text-sm hover:bg-purple-700 transition-colors"
          >
            <Search className="w-4 h-4 inline mr-2" />
            Diagnostic complet
          </button>
          
          <button
            onClick={async () => {
              console.clear();
              await testStatusVariants();
            }}
            className="w-full bg-orange-600 text-white py-2 px-3 rounded text-sm hover:bg-orange-700 transition-colors"
          >
            <AlertTriangle className="w-4 h-4 inline mr-2" />
            Tester les statuts
          </button>
          
          <button
            onClick={() => {
              const url = `https://api.airtable.com/v0/${envVars.baseId}/${envVars.tableName}`;
              window.open(url, '_blank');
            }}
            className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors"
          >
            Tester l'API Airtable
          </button>
        </div>
      </div>
    </div>
  );
}; 