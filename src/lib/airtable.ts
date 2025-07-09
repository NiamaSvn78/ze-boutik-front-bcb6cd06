import { AirtableResponse, AirtableProduct, AirtableError } from '../types/airtable';

export async function getcatalogues(): Promise<AirtableProduct[]> {
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const table = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

  if (!baseId || !table || !apiKey) {
    console.error('Variables d\'environnement Airtable manquantes');
    console.error('VITE_AIRTABLE_BASE_ID:', baseId);
    console.error('VITE_AIRTABLE_TABLE_NAME:', table);
    console.error('VITE_AIRTABLE_API_KEY:', apiKey ? 'Présent' : 'Manquant');
    throw new Error('Configuration Airtable incomplète');
  }

  const url = `https://api.airtable.com/v0/${baseId}/${table}`;
  console.log('URL Airtable:', url);

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Réponse d\'erreur complète:', errorText);
      throw new Error(`Erreur HTTP: ${res.status} ${res.statusText}`);
    }

    const data: AirtableResponse | AirtableError = await res.json();
    console.log("Réponse Airtable complète :", data);

    if ('error' in data) {
      console.error("Erreur Airtable :", data.error);
      throw new Error(data.error.message);
    }

    if (!data.records) {
      console.error("Aucun enregistrement trouvé");
      return [];
    }

    console.log(`Nombre total d'enregistrements: ${data.records.length}`);
    
    // Debug: afficher tous les statuts
    const allStatuses = data.records.map(record => ({
      id: record.id,
      title: record.fields.titre_accrocheur,
      statut: record.fields.statut,
      categorie: record.fields.categorie
    }));
    console.log('Tous les enregistrements avec leurs statuts:', allStatuses);

    const publishedRecords = data.records.filter((record) => {
      const isPublished = record.fields.statut_produit === 'publié';
      if (!isPublished) {
        console.log(`Produit "${record.fields.titre_accrocheur}" ignoré - statut_produit: "${record.fields.statut_produit}"`);
      }
      return isPublished;
    });

    console.log(`Nombre de produits publiés: ${publishedRecords.length}`);

    return publishedRecords.map((record) => ({
      id: record.id,
      title: record.fields.titre_accrocheur || 'Sans titre',
      image: record.fields.photo_produit?.[0]?.url,
      description: record.fields.liste_caracteristiques,
      audio: record.fields.description_audio?.[0]?.url,
      categorie: record.fields.catégorie,
      statut_produit: record.fields.statut_produit,
      createdTime: record.createdTime,
      note: typeof record.fields.note === 'number' ? record.fields.note : undefined,
      prix: typeof record.fields.prix === 'number' ? record.fields.prix : undefined,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des données Airtable:', error);
    throw error;
  }
}
  