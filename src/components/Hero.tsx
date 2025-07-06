
import React from 'react';
import { ArrowRight, Star, Zap, ShoppingCart } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-100/30 via-transparent to-cyan-100/30 animate-spin-slow opacity-60" style={{ animationDuration: '30s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-100/30 via-transparent to-blue-100/30 animate-spin-slow opacity-60" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-40 animate-float" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-40 animate-float" style={{ animationDelay: '4s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 to-cyan-50 border border-purple-200 backdrop-blur-sm mb-8">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">E-commerce Moderne & Premium</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-gray-800 via-purple-700 to-cyan-700 bg-clip-text text-transparent">
              Shopping
            </span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent mt-2">
              Nouvelle Génération
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Découvrez une expérience d'achat révolutionnaire avec des produits premium,
            une interface intuitive et un service client exceptionnel.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              <span className="relative z-10 flex items-center">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Commencer vos achats
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="group glass px-8 py-4 rounded-full font-semibold text-lg text-gray-700 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 border border-gray-200">
              <span className="flex items-center">
                <Zap className="mr-2 w-5 h-5 group-hover:text-yellow-500 transition-colors" />
                Voir la collection
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '10k+', label: 'Produits' },
              { number: '50k+', label: 'Clients satisfaits' },
              { number: '99%', label: 'Satisfaction' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
