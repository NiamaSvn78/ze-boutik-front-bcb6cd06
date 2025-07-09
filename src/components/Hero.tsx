import React from 'react';
import { ArrowRight, Star, Zap, ShoppingCart } from 'lucide-react';
import { useAirtableProducts } from '../hooks/useAirtableProducts';

const Hero = () => {
  const { data: products } = useAirtableProducts();
  const productCount = products ? products.length : 0;

  return (
    <section id="home" className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Image de fond + overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/pageAcceuil.png"
          alt="Fond d'écran accueil"
          className="w-full h-full object-cover object-top"
          style={{ minHeight: '60vh' }}
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      </div>
      {/* Contenu principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-gray-100 via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-lg">
              La boutique du Turfu
            </span>
            <span className="block bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent mt-2 text-base md:text-lg font-normal drop-shadow">
              Simplifie ton style, booste ton quotidien !
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow">
            Explore un monde où la mode tendance, les outils culinaires malins et les gadgets high-tech s'unissent pour transformer ton quotidien avec style, efficacité et innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="/boutique" className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              <span className="relative z-10 flex items-center">
                <ShoppingCart className="mr-2 w-5 h-5" />
                Commencer vos achats
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: productCount > 0 ? productCount : '…', label: 'Produits' },
              { number: '50k+', label: 'Clients satisfaits' },
              { number: '99%', label: 'Satisfaction' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent mb-2 drop-shadow">
                  {stat.number}
                </div>
                <div className="text-gray-100 text-sm drop-shadow">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
