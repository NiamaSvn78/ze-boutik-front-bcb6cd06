// Outil de diagnostic Airtable
export async function testAirtableConnection() {
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const table = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

  console.log('🔍 DIAGNOSTIC AIRTABLE - DÉBUT');
  console.log('================================');

  // 1. Vérification des variables d'environnement
  console.log('1. VÉRIFICATION DES VARIABLES D\'ENVIRONNEMENT:');
  console.log('   Base ID:', baseId ? `${baseId.substring(0, 8)}...` : 'MANQUANT');
  console.log('   Table:', table || 'MANQUANT');
  console.log('   API Key:', apiKey ? 'PRÉSENT' : 'MANQUANT');
  console.log('');

  if (!baseId || !table || !apiKey) {
    console.error('❌ Variables d\'environnement manquantes');
    return { success: false, error: 'Configuration incomplète' };
  }

  // 2. Test de connexion à l'API
  console.log('2. TEST DE CONNEXION À L\'API:');
  const url = `https://api.airtable.com/v0/${baseId}/${table}`;
  console.log('   URL:', url);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('   Status:', response.status, response.statusText);
    console.log('   Headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('   ❌ Erreur HTTP:', errorText);
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    console.log('   ✅ Connexion réussie');
    console.log('');

    // 3. Analyse des données
    console.log('3. ANALYSE DES DONNÉES:');
    console.log('   Nombre total d\'enregistrements:', data.records?.length || 0);

    if (!data.records || data.records.length === 0) {
      console.log('   ⚠️ Aucun enregistrement trouvé');
      return { success: true, data: [], message: 'Aucun enregistrement' };
    }

    // 4. Analyse des champs
    console.log('4. ANALYSE DES CHAMPS:');
    const firstRecord = data.records[0];
    console.log('   Champs disponibles:', Object.keys(firstRecord.fields));
    console.log('');

    // 5. Analyse des statuts
    console.log('5. ANALYSE DES STATUTS:');
    const statusCounts: Record<string, number> = {};
    const productsByStatus: Record<string, any[]> = {};

    data.records.forEach((record: any, index: number) => {
      const status = record.fields.statut_produit || 'NON_DÉFINI';
      const title = record.fields.titre_accrocheur || 'Sans titre';
      
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      if (!productsByStatus[status]) {
        productsByStatus[status] = [];
      }
      productsByStatus[status].push({ id: record.id, title, status });
      
      console.log(`   ${index + 1}. "${title}" - Statut: "${status}"`);
    });

    console.log('');
    console.log('6. RÉSUMÉ DES STATUTS:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`   "${status}": ${count} produit(s)`);
    });

    // 6. Test du filtre "publié"
    console.log('');
    console.log('7. TEST DU FILTRE "PUBLIÉ":');
    const publishedProducts = data.records.filter((record: any) => {
      const status = record.fields.statut_produit;
      const isPublished = status === 'publié';
      console.log(`   "${record.fields.titre_accrocheur}" - "${status}" === "publié" ? ${isPublished}`);
      return isPublished;
    });

    console.log('');
    console.log('8. RÉSULTAT FINAL:');
    console.log(`   Produits avec statut "publié": ${publishedProducts.length}`);
    
    if (publishedProducts.length === 0) {
      console.log('   ⚠️ Aucun produit avec le statut exact "publié"');
      console.log('   💡 Vérifiez l\'orthographe du statut dans Airtable');
    } else {
      console.log('   ✅ Produits trouvés avec le bon statut');
    }

    console.log('');
    console.log('🔍 DIAGNOSTIC AIRTABLE - FIN');
    console.log('================================');

    return {
      success: true,
      totalRecords: data.records.length,
      publishedCount: publishedProducts.length,
      statusCounts,
      publishedProducts: publishedProducts.map(record => ({
        id: record.id,
        title: record.fields.titre_accrocheur,
        status: record.fields.statut_produit,
        category: record.fields.categorie
      }))
    };

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' };
  }
}

// Fonction pour tester différentes variantes du statut
export async function testStatusVariants() {
  console.log('🔍 TEST DES VARIANTES DE STATUT');
  console.log('================================');

  const variants = [
    'publié',
    'Publié',
    'publie',
    'PUBLIÉ',
    'active',
    'en ligne',
    'disponible',
    'visible'
  ];

  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const table = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
  const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

  if (!baseId || !table || !apiKey) {
    console.error('❌ Configuration manquante');
    return;
  }

  try {
    const url = `https://api.airtable.com/v0/${baseId}/${table}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('❌ Erreur de connexion');
      return;
    }

    const data = await response.json();
    
    variants.forEach(variant => {
      const count = data.records.filter((record: any) => 
        record.fields.statut_produit === variant
      ).length;
      
      console.log(`   "${variant}": ${count} produit(s)`);
    });

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  }
} 