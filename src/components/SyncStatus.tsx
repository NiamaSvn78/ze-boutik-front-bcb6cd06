import React from 'react';
import { Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useAirtableProducts } from '../hooks/useAirtableProducts';

export const SyncStatus: React.FC = () => {
  const { data: products, isLoading, error, isFetching, dataUpdatedAt } = useAirtableProducts();

  const getLastUpdateText = () => {
    if (!dataUpdatedAt) return 'Jamais';
    
    const now = Date.now();
    const diff = now - dataUpdatedAt;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'À l\'instant';
    if (minutes === 1) return 'Il y a 1 minute';
    if (minutes < 60) return `Il y a ${minutes} minutes`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return 'Il y a 1 heure';
    return `Il y a ${hours} heures`;
  };

  const getStatusIcon = () => {
    if (isLoading) return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
    if (error) return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (isFetching) return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  };

  const getStatusText = () => {
    if (isLoading) return 'Chargement...';
    if (error) return 'Erreur de synchronisation';
    if (isFetching) return 'Mise à jour...';
    return 'Synchronisé';
  };

  const getStatusColor = () => {
    if (isLoading || error) return 'text-gray-600';
    if (isFetching) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <div className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </div>
            <div className="text-xs text-gray-500">
              Dernière mise à jour : {getLastUpdateText()}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-800">
            {products?.length || 0} produit{products?.length !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-gray-500">
            Synchronisation automatique activée
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-800">
              <div className="font-medium">Erreur de connexion à Airtable</div>
              <div className="text-xs mt-1">
                {error instanceof Error ? error.message : 'Erreur inconnue'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500">
        💡 Les données se mettent à jour automatiquement toutes les minutes
      </div>
    </div>
  );
}; 