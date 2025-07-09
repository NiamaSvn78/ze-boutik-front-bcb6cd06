import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Features from '../components/Features';
import { useAirtableProducts } from '../hooks/useAirtableProducts';
import { getBestSellers } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { Star } from 'lucide-react';
import { AirtableProduct } from '../types/airtable';
// import Products from '../components/Products';

const Index = () => {
  const { data: products, isLoading, isError } = useAirtableProducts();
  const bestSellers: AirtableProduct[] = products ? getBestSellers(products) : [];
  const { addToCart } = useCart();

  return (
    <Layout>
      <Hero />
      {/* Nouvelle bande de transition douce */}
      <div className="h-16 w-full bg-gradient-to-b from-transparent via-white/70 to-[#f9f9fb]" />
      {/* <Products /> */}
      <section className="py-20 relative overflow-hidden bg-[#f9f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Nos best-sellers
              </span>
            </h2>
          </div>
          {isLoading && <div>Chargement...</div>}
          {isError && <div>Erreur lors du chargement des produits.</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {bestSellers.map(prod => (
              <div key={prod.id} className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 hover:bg-white transition-all duration-500 transform hover:scale-105 hover:shadow-xl border border-gray-100 animate-fade-in flex flex-col">
                {prod.image && <img src={prod.image} alt={prod.title} className="h-40 object-cover rounded-xl mb-4 mx-auto" />}
                <div className="flex-1 flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300">{prod.title}</h3>
                  <div className="flex items-center mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={
                        'w-5 h-5 ' + (i <= Math.round(prod.note ?? 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')
                      } fill={i <= Math.round(prod.note ?? 0) ? 'currentColor' : 'none'} />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{prod.note ? prod.note.toFixed(1) : '—'} / 5</span>
                  </div>
                  <div className="text-gray-700 mb-2 text-center">{prod.categorie}</div>
                  <div className="text-lg font-bold mb-2">{prod.prix ? prod.prix + ' €' : ''}</div>
                </div>
                <button
                  className="mt-4 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-600 hover:from-purple-700 hover:via-pink-600 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => addToCart({ id: prod.id, nom: prod.title, prix: prod.prix ?? 0, image: prod.image })}
                >
                  Ajouter à mon panier
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Features />
    </Layout>
  );
};

export default Index;
