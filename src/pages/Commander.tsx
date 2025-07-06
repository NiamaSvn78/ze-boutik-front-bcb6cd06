
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ShoppingCart, CreditCard, MapPin, User, Mail } from 'lucide-react';

const Commander = () => {
  const [orderData, setOrderData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  // Produit exemple (dans une vraie app, ceci viendrait du state/contexte)
  const selectedProduct = {
    id: 1,
    name: "Smartphone Pro Max",
    price: 999,
    originalPrice: 1199,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
    category: "Électronique",
    features: ["Écran OLED 6.7\"", "128GB de stockage", "Triple caméra 48MP", "5G Ready"]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Commande soumise:', { ...orderData, product: selectedProduct });
    // Logique de traitement de la commande
  };

  const totalSavings = selectedProduct.originalPrice ? selectedProduct.originalPrice - selectedProduct.price : 0;

  return (
    <div className="min-h-screen relative">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50/40 via-transparent to-cyan-50/40 pointer-events-none animate-aurora" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-r from-purple-300 to-cyan-300 rounded-full" />
          </div>
        ))}
      </div>

      <Navigation />
      
      <main className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Finaliser la commande
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plus qu'une étape pour recevoir votre produit ! Vérifiez vos informations et confirmez votre achat.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <User className="w-6 h-6" />
                  <span>Informations de livraison</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        Nom complet
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={orderData.name}
                        onChange={handleInputChange}
                        placeholder="Votre nom complet"
                        className="bg-white/90 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Téléphone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={orderData.phone}
                        onChange={handleInputChange}
                        placeholder="+33 1 23 45 67 89"
                        className="bg-white/90 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Adresse e-mail
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={orderData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      className="bg-white/90 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-700 font-medium">
                      Adresse complète
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      value={orderData.address}
                      onChange={handleInputChange}
                      placeholder="123 Rue de la Paix"
                      className="bg-white/90 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-700 font-medium">
                        Ville
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={orderData.city}
                        onChange={handleInputChange}
                        placeholder="Paris"
                        className="bg-white/90 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-gray-700 font-medium">
                        Code postal
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={orderData.postalCode}
                        onChange={handleInputChange}
                        placeholder="75001"
                        className="bg-white/90 border-gray-200 focus:border-purple-500 focus:ring-purple-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Confirmer la commande</span>
                  </button>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                    <ShoppingCart className="w-6 h-6" />
                    <span>Récapitulatif</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {selectedProduct.name}
                      </h3>
                      <span className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                        {selectedProduct.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <h4 className="font-medium text-gray-700">Caractéristiques :</h4>
                    <ul className="space-y-1">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Prix unitaire :</span>
                      <span className="font-medium">{selectedProduct.price}€</span>
                    </div>
                    {selectedProduct.originalPrice && (
                      <>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Prix original :</span>
                          <span className="text-gray-500 line-through">{selectedProduct.originalPrice}€</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-green-600">Économies :</span>
                          <span className="text-green-600 font-medium">-{totalSavings}€</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Livraison :</span>
                      <span className="font-medium text-green-600">Gratuite</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total :</span>
                        <span className="text-purple-600">{selectedProduct.price}€</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <Card className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <MapPin className="w-6 h-6" />
                    <h3 className="text-lg font-semibold">Livraison express</h3>
                  </div>
                  <p className="text-purple-100">
                    Livraison gratuite sous 2-3 jours ouvrés. Suivi de commande inclus.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Commander;
