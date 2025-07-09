import { useQuery } from '@tanstack/react-query';
import { getcatalogues } from '../lib/airtable';
import { AirtableProduct } from '../types/airtable';

export const useAirtableProducts = () => {
  return useQuery<AirtableProduct[]>({
    queryKey: ['airtable-products'],
    queryFn: getcatalogues,
    staleTime: 30 * 1000, // 30 secondes pour une synchronisation plus rapide
    refetchInterval: 60 * 1000, // Rafraîchir toutes les minutes
    refetchIntervalInBackground: true, // Continuer à rafraîchir même si l'onglet n'est pas actif
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}; 