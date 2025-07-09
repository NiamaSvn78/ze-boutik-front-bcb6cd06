// Types pour les données Airtable
export interface AirtableRecord {
  id: string;
  fields: {
    titre_accrocheur?: string;
    photo_produit?: Array<{
      id: string;
      url: string;
      filename: string;
      size: number;
      type: string;
    }>;
    liste_caracteristiques?: string;
    description_audio?: Array<{
      id: string;
      url: string;
      filename: string;
      size: number;
      type: string;
    }>;
    categorie?: string;
    statut_produit?: string;
    [key: string]: any; // Pour d'autres champs personnalisés
  };
  createdTime: string;
}

export interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

// Types pour les produits transformés
export interface AirtableProduct {
  id: string;
  title: string;
  image?: string;
  description?: string;
  audio?: string;
  categorie?: string;
  statut_produit?: string;
  createdTime?: string;
  note?: number;
  prix?: number;
}

// Types pour les erreurs Airtable
export interface AirtableError {
  error: {
    type: string;
    message: string;
  };
} 