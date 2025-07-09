import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Settings, Mail, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: 'Accueil', to: '/' },
    { icon: ShoppingBag, label: 'Boutique', to: '/boutique' },
    { icon: User, label: 'À propos', to: '/a-propos' },
    { icon: Mail, label: 'Contact', to: '/contact' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Ze Boutik
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className={`group relative flex items-center px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActivePath(item.to)
                      ? 'text-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  {item.label}
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-transform duration-300 origin-left ${
                    isActivePath(item.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Remplacer le bouton Commander par le bouton Panier avec compteur */}
          <div className="hidden md:block">
            <Link to="/panier" className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              <span className="relative z-10">Panier</span>
              {cart.length > 0 && (
                <span className="ml-2 bg-white text-purple-600 rounded-full px-2 py-0.5 text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-all duration-200"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'max-h-80 opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-xl border-t border-gray-200">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
          <Link to="/panier" className="w-full mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 shadow-lg text-center block">
            Panier
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
