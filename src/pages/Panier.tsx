import React from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Panier: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const validCart = cart.filter(item => item && typeof item.prix === 'number' && typeof item.quantite === 'number');
  const total = validCart.reduce((sum, item) => sum + item.prix * item.quantite, 0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Mon panier
          </h1>
          <p className="text-gray-600 text-lg">
            Retrouvez ici tous les articles que vous avez ajoutés.
          </p>
        </div>

        {cart.length === 0 ? (
          <Card className="text-center p-8">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-600 mb-6">
              Ajoutez des produits depuis la boutique pour commencer vos achats.
            </p>
            <Button onClick={() => window.location.href = '/boutique'}>
              Aller à la boutique
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Liste des articles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Articles dans votre panier</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700"
                  >
                    Vider le panier
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {validCart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.nom}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.nom}</h3>
                        <p className="text-sm text-gray-600">Quantité : {item.quantite}</p>
                        <p className="text-sm text-gray-600">Prix unitaire : {item.prix ?? 0} €</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {(item.prix * item.quantite).toFixed(2)} €
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Retirer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Total */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center text-xl font-semibold">
                  <span>Total :</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/boutique'}
                className="flex-1"
              >
                Continuer les achats
              </Button>
              <a
                href="https://votre-url-de-paiement.com" // Remplace par l'URL réelle de paiement
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                style={{ textDecoration: 'none' }}
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  💳 Payer maintenant
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Panier; 