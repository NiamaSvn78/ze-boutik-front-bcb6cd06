
import React from 'react';
import Navigation from '../components/Navigation';
import { Heart, Users, Award, Target } from 'lucide-react';

const APropos = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Nous sélectionnons chaque produit avec passion et expertise pour vous offrir le meilleur."
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Notre communauté de clients satisfaits est au cœur de tout ce que nous faisons."
    },
    {
      icon: Award,
      title: "Qualité",
      description: "Seuls les produits de la plus haute qualité méritent une place dans notre boutique."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Nous restons à la pointe de la technologie pour vous proposer les dernières innovations."
    }
  ];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                À Propos de ModernShop
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Depuis 2020, nous révolutionnons l'expérience d'achat en ligne avec des produits exceptionnels et un service client inégalé.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Notre Histoire
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                ModernShop est née d'une vision simple : rendre la technologie accessible à tous. 
                Fondée par une équipe de passionnés, notre boutique s'est rapidement imposée comme 
                une référence dans le domaine du e-commerce premium.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Aujourd'hui, nous servons des milliers de clients satisfaits à travers le monde, 
                en proposant une sélection rigoureuse des meilleurs produits technologiques du marché.
              </p>
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-gray-600">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    500+
                  </div>
                  <div className="text-gray-600">Produits vendus</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    4.9/5
                  </div>
                  <div className="text-gray-600">Note moyenne</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl transform rotate-6"></div>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Notre équipe"
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Nos Valeurs
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Ces valeurs guident chacune de nos décisions et façonnent l'expérience que nous offrons à nos clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Section */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">
              Notre Mission
            </h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              Démocratiser l'accès aux technologies de pointe en proposant des produits exceptionnels, 
              un service client personnalisé et une expérience d'achat mémorable. Nous croyons que 
              chacun mérite d'avoir accès aux meilleurs outils pour améliorer sa vie quotidienne.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default APropos;
