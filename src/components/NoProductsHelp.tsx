import React, { useState } from 'react';
import { HelpCircle, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { testAirtableConnection } from '../lib/airtable-debug';

export const NoProductsHelp: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);

  const runDiagnostic = async () => {
    setDiagnosticResult('loading');
    try {
      const result = await testAirtableConnection();
      setDiagnosticResult(result);
    } catch (error) {
      setDiagnosticResult({ success: false, error: 'Erreur lors du diagnostic' });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
      <div className="flex items-start space-x-3">
        <HelpCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Aucun produit trouvé - Diagnostic d'aide
          </h3>
          
          <p className="text-gray-600 mb-4">
            Vos produits ne s'affichent pas. Voici les causes les plus courantes et comment les résoudre :
          </p>

          <div className="space-y-4">
            {/* Cause 1: Configuration */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
                1. Vérifiez votre configuration
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Assurez-vous que votre fichier <code className="bg-gray-100 px-1 rounded">.env</code> contient les bonnes informations :
              </p>
              <div className="bg-gray-50 p-3 rounded text-sm font-mono">
                <div className="flex justify-between items-center mb-1">
                  <span>VITE_AIRTABLE_API_KEY=</span>
                  <button
                    onClick={() => copyToClipboard('VITE_AIRTABLE_API_KEY=your_api_key_here')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span>VITE_AIRTABLE_BASE_ID=</span>
                  <button
                    onClick={() => copyToClipboard('VITE_AIRTABLE_BASE_ID=your_base_id_here')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span>VITE_AIRTABLE_TABLE_NAME=</span>
                  <button
                    onClick={() => copyToClipboard('VITE_AIRTABLE_TABLE_NAME=your_table_name_here')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cause 2: Statut */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                2. Vérifiez le statut de vos produits
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Le champ <code className="bg-gray-100 px-1 rounded">statut</code> doit contenir exactement <strong>"publié"</strong> :
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-red-50 p-2 rounded border border-red-200">
                  <div className="font-medium text-red-800">❌ Incorrect</div>
                  <div className="text-red-600">"Publié"</div>
                  <div className="text-red-600">"publie"</div>
                  <div className="text-red-600">"active"</div>
                </div>
                <div className="bg-green-50 p-2 rounded border border-green-200">
                  <div className="font-medium text-green-800">✅ Correct</div>
                  <div className="text-green-600">"publié"</div>
                </div>
              </div>
            </div>

            {/* Cause 3: Structure */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 text-blue-500 mr-2" />
                3. Vérifiez la structure de votre table
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Votre table Airtable doit contenir ces champs :
              </p>
              <div className="bg-gray-50 p-3 rounded text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div><strong>titre_accrocheur</strong> (Single line text)</div>
                  <div><strong>statut</strong> (Single select)</div>
                  <div><strong>categorie</strong> (Single select)</div>
                  <div><strong>liste_caracteristiques</strong> (Long text)</div>
                </div>
              </div>
            </div>

            {/* Diagnostic automatique */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                4. Diagnostic automatique
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Lancez un diagnostic complet pour identifier le problème :
              </p>
              
              <button
                onClick={runDiagnostic}
                disabled={diagnosticResult === 'loading'}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {diagnosticResult === 'loading' ? 'Diagnostic en cours...' : 'Lancer le diagnostic'}
              </button>

              {diagnosticResult && diagnosticResult !== 'loading' && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm">
                    <div className="font-medium mb-2">Résultats du diagnostic :</div>
                    {diagnosticResult.success ? (
                      <div className="space-y-1">
                        <div>✅ Connexion réussie</div>
                        <div>📊 {diagnosticResult.totalRecords} enregistrements trouvés</div>
                        <div>📝 {diagnosticResult.publishedCount} produits publiés</div>
                        {diagnosticResult.publishedCount === 0 && (
                          <div className="text-red-600 font-medium">
                            ⚠️ Aucun produit avec le statut "publié" trouvé
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-red-600">
                        ❌ Erreur : {diagnosticResult.error}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Liens utiles */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">5. Liens utiles</h4>
              <div className="space-y-2">
                <a
                  href="https://airtable.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ouvrir Airtable
                </a>
                <button
                  onClick={() => {
                    const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
                    const tableName = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
                    if (baseId && tableName) {
                      window.open(`https://airtable.com/${baseId}/${tableName}`, '_blank');
                    }
                  }}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ouvrir votre table directement
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <div className="font-medium">Besoin d'aide supplémentaire ?</div>
                <div className="mt-1">
                  Ouvrez la console du navigateur (F12) et regardez les messages de diagnostic pour plus de détails.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 