import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Heart, Shield, Truck, Star, Users, Award, Target, Zap, ShoppingBag, Globe, Clock, CheckCircle } from 'lucide-react';

const APropos: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Nous sommes passionnés par l'excellence et nous mettons tout en œuvre pour vous offrir les meilleurs produits."
    },
    {
      icon: Shield,
      title: "Confiance",
      description: "La confiance de nos clients est notre plus grande récompense. Nous la méritons chaque jour."
    },
    {
      icon: Target,
      title: "Qualité",
      description: "Nous sélectionnons rigoureusement chaque produit pour garantir une qualité exceptionnelle."
    },
    {
      icon: Users,
      title: "Service",
      description: "Notre équipe dévouée est là pour vous accompagner à chaque étape de votre parcours."
    }
  ];

  const stats = [
    { number: "1000+", label: "Clients satisfaits", icon: Users },
    { number: "500+", label: "Produits sélectionnés", icon: ShoppingBag },
    { number: "24h", label: "Temps de réponse", icon: Clock },
    { number: "4.9/5", label: "Note moyenne", icon: Star }
  ];

  const team = [
    {
      name: "Marie Dupont",
      role: "Fondatrice & CEO",
      description: "Passionnée d'innovation et d'excellence client depuis plus de 10 ans.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Thomas Martin",
      role: "Directeur Commercial",
      description: "Expert en relations clients et développement commercial.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sophie Bernard",
      role: "Responsable Qualité",
      description: "Garante de l'excellence de nos produits et services.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            À propos de Ze Boutik
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous sommes une boutique en ligne passionnée par l'excellence, dédiée à vous offrir une expérience d'achat exceptionnelle avec des produits soigneusement sélectionnés et un service client de qualité.
          </p>
        </div>
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-900">
                <Target className="w-6 h-6 mr-2" />
                Notre Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-800 leading-relaxed">
                Simplifier votre expérience d'achat en ligne en vous proposant des produits 
                de qualité, sélectionnés avec soin, et en vous offrant un service client 
                exceptionnel. Nous croyons que chaque achat doit être une expérience 
                agréable et satisfaisante.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900">
                <Globe className="w-6 h-6 mr-2" />
                Notre Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-cyan-800 leading-relaxed">
                Devenir la référence en matière d'e-commerce en France, reconnue pour 
                notre engagement envers la qualité, l'innovation et la satisfaction client. 
                Nous aspirons à créer une communauté de clients fidèles qui partagent 
                nos valeurs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Notre Équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <Badge className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi nous choisir ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Produits de Qualité
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Chaque produit est rigoureusement sélectionné pour garantir 
                      la meilleure qualité possible.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Livraison Rapide
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Livraison express disponible pour recevoir vos commandes 
                      en 24-48h.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Service Client
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Une équipe dédiée disponible pour vous accompagner 
                      à chaque étape.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Garantie Satisfaction
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Satisfait ou remboursé sous 14 jours. 
                      Votre satisfaction est notre priorité.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Engagement Éthique
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Nous nous engageons pour un commerce responsable 
                      et respectueux de l'environnement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Innovation Continue
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Nous améliorons constamment notre plateforme 
                      pour une expérience optimale.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à découvrir nos produits ?
            </h2>
            <p className="text-purple-100 mb-6">
              Rejoignez notre communauté de clients satisfaits et découvrez 
              notre sélection de produits exceptionnels.
            </p>
            <div className="space-x-4">
              <a
                href="/boutique"
                className="inline-block bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Voir nos produits
              </a>
              <a
                href="/contact"
                className="inline-block border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
              >
                Nous contacter
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default APropos;
