import React from 'react';
import { Palette, Sparkles, Zap, Globe, Shield, Smartphone, Truck, CreditCard, Users, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: 'Livraison Rapide',
      description: 'Livraison gratuite en 24h pour tous vos achats. Service premium garanti.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: CreditCard,
      title: 'Paiement Sécurisé',
      description: 'Transactions 100% sécurisées avec les dernières technologies de cryptage.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Service Client',
      description: 'Équipe dédiée disponible 24/7 pour vous accompagner dans vos achats.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Qualité Premium',
      description: 'Produits sélectionnés avec soin, garantie qualité et satisfaction.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Garantie Étendue',
      description: 'Protection complète avec garantie étendue et politique de retour flexible.',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Smartphone,
      title: 'App Mobile',
      description: 'Experience optimisée sur mobile avec notifications et suivi de commandes.',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Pourquoi Nous Choisir
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les avantages qui font de nous le leader du e-commerce moderne et innovant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 hover:bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-xl border border-gray-100 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-gray-700" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-gray-100/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <a href="/boutique" className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 hover:from-purple-700 hover:via-pink-600 hover:to-cyan-700 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 inline-block">
            <span className="relative z-10 flex items-center">
              Découvrir notre boutique
              <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
