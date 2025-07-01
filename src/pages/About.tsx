
import React from 'react';
import Header from '../components/Header';

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="glass-card p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-8">About Harvest Hub</h1>
          <div className="prose prose-lg max-w-none text-slate-700 space-y-6">
            <p>
              Harvest Hub is revolutionizing the way consumers connect with local farmers, creating a direct bridge 
              between farm-fresh produce and your table.
            </p>
            <p>
              Our mission is to support local agriculture while providing consumers with the freshest, highest quality 
              produce available. By eliminating intermediaries, we ensure that farmers receive fair compensation for 
              their hard work while offering consumers competitive prices on premium products.
            </p>
            <div className="bg-white/30 rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Values</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Supporting local farmers and communities</li>
                <li>Promoting sustainable agriculture practices</li>
                <li>Ensuring food transparency and traceability</li>
                <li>Reducing environmental impact through local sourcing</li>
                <li>Building stronger connections between producers and consumers</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
