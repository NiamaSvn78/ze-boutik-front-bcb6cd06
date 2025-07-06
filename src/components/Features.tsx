
import React from 'react';
import { Palette, Sparkles, Zap, Globe, Shield, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Palette,
      title: 'Couleurs Vibrantes',
      description: 'Palette de couleurs modernes avec des dégradés dynamiques et des effets de glassmorphisme.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Sparkles,
      title: 'Animations Fluides',
      description: 'Micro-interactions sophistiquées et animations CSS3 pour une expérience immersive.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'Performance Optimale',
      description: 'Code optimisé et chargement ultra-rapide pour une expérience utilisateur exceptionnelle.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Design Universel',
      description: 'Interface adaptée à tous les appareils avec un design responsive et accessible.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Sécurité Avancée',
      description: 'Technologies modernes avec les meilleures pratiques de sécurité intégrées.',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Expérience optimisée pour mobile avec des gestes intuitifs et navigation fluide.',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Fonctionnalités Avancées
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Découvrez les technologies de pointe qui rendent votre expérience unique et mémorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                  <feature.icon className={`w-8 h-8 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`} />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tl from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            <span className="relative z-10 flex items-center">
              Explorez toutes les fonctionnalités
              <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
