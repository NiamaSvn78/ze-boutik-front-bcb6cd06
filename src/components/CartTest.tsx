import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';

const CartTest: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const testAddToCart = () => {
    addToCart({
      id: 'test-product',
      nom: 'Produit de test',
      prix: 29.99,
      image: '/placeholder.svg'
    });
    console.log('Produit de test ajouté au panier');
  };

  return (
    <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg mb-4">
      <h3 className="font-bold text-yellow-800 mb-2">TEST DU PANIER</h3>
      <div className="space-y-2">
        <p className="text-sm">Nombre d'articles dans le panier: <strong>{cart.length}</strong></p>
        <div className="flex space-x-2">
          <Button onClick={testAddToCart} size="sm" className="bg-green-600 hover:bg-green-700">
            Ajouter produit test
          </Button>
          <Button onClick={clearCart} size="sm" className="bg-red-600 hover:bg-red-700">
            Vider le panier
          </Button>
        </div>
        {cart.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-semibold">Articles dans le panier:</p>
            <ul className="text-xs">
              {cart.map(item => (
                <li key={item.id}>
                  {item.nom} - {item.prix}€ (x{item.quantite})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTest; 