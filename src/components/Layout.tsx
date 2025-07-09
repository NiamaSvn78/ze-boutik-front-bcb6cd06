import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, User, Settings, Mail, ShoppingBag, ShoppingCart } from 'lucide-react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: 'Accueil', href: '/' },
    { icon: ShoppingBag, label: 'Boutique', href: '/boutique' },
    { icon: ShoppingCart, label: 'Panier', href: '/panier' },
    { icon: User, label: 'À propos', href: '/a-propos' },
    { icon: Mail, label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#f9f9fb' }}>
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

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Ze Boutik
            </h3>
            <p className="text-gray-600 mb-6">
             La boutique du Turfu
            </p>
            <div className="flex justify-center space-x-6 text-gray-500 mb-6">
              <Link to="/a-propos" className="hover:text-purple-600 transition-colors duration-300">
                À propos
              </Link>
              <Link to="/contact" className="hover:text-cyan-600 transition-colors duration-300">
                Contact
              </Link>
              <Link to="/boutique" className="hover:text-pink-500 transition-colors duration-300">
                Boutique
              </Link>
            </div>
            <div className="mt-8 text-sm text-gray-400">
              © 2024 Ze Boutik. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 