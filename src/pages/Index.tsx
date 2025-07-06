
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20 pointer-events-none animate-aurora" />
      
      {/* Animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
          </div>
        ))}
      </div>

      <Navigation />
      <Hero />
      <Features />
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              ModernApp
            </h3>
            <p className="text-gray-400 mb-6">
              L'avenir du design web commence ici.
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors duration-300">Politique de confidentialité</a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Conditions d'utilisation</a>
              <a href="#" className="hover:text-pink-400 transition-colors duration-300">Contact</a>
            </div>
            <div className="mt-8 text-sm text-gray-500">
              © 2024 ModernApp. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
