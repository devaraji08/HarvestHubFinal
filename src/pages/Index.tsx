
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';

const Index: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Welcome to Harvest Hub! Connecting "Farmers" and "Consumers" 🌾
            </h1>
            
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Harvest Hub is an innovative app that connects consumers directly with local farmers, enabling the purchase of fresh, locally grown 
              produce straight from the source. By bypassing intermediaries, we provide a platform where users can easily explore and buy a variety of 
              products, ensuring they receive high-quality food while supporting their community.
            </p>

            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <div className="bg-white/30 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">Direct Access to Farmers:</h3>
                <p className="text-slate-700">Browse and purchase fresh produce directly from local farms.</p>
              </div>
              
              <div className="bg-white/30 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">User-Friendly Marketplace:</h3>
                <p className="text-slate-700">Enjoy a seamless shopping experience with secure payment options.</p>
              </div>
              
              <div className="bg-white/30 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">Intelligent Chatbot Support:</h3>
                <p className="text-slate-700">Get personalized advice and support for your farming questions.</p>
              </div>
              
              <div className="bg-white/30 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">Community Engagement:</h3>
                <p className="text-slate-700">Connect with farmers, read their stories, and provide feedback.</p>
              </div>
              
              <div className="bg-white/30 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">Sustainability Focus:</h3>
                <p className="text-slate-700">Support local economies and reduce your carbon footprint by choosing locally sourced food.</p>
              </div>
            </div>

            <div className="mt-8">
              <Link to="/products">
                <Button className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 text-lg rounded-lg">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Welcome message for logged in users */}
        {user && (
          <div className="glass-card p-8 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Welcome back, {user.username}!
            </h2>
            <p className="text-slate-700 mb-6">
              You're logged in as a <span className="font-semibold">{user.role}</span>. 
              {user.role === 'farmer' 
                ? ' Start managing your products and connect with consumers.' 
                : ' Start exploring fresh produce from local farmers.'}
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/dashboard">
                <Button className="bg-sage-600 hover:bg-sage-700 text-white">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" className="border-sage-600 text-sage-600 hover:bg-sage-50">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
