
import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Welcome to the Harvest Hub Chatbot! I can help you with farming tips, product information, meal planning, and nutrition advice. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Generate contextual responses based on keywords
    setTimeout(() => {
      let response = '';
      const userInput = input.toLowerCase();
      
      if (userInput.includes('farm') || userInput.includes('crop') || userInput.includes('plant')) {
        response = 'For farming advice: Start with soil testing, choose crops suitable for your climate, ensure proper drainage, and consider companion planting. Beginners should try easy crops like lettuce, radishes, or herbs!';
      } else if (userInput.includes('product') || userInput.includes('buy') || userInput.includes('sell')) {
        response = 'We offer fresh, locally-sourced produce including seasonal vegetables, fruits, herbs, and organic options. You can browse our products page to see current availability and pricing.';
      } else if (userInput.includes('organic')) {
        response = 'Organic farming avoids synthetic pesticides and fertilizers. Use compost, natural pest control methods, crop rotation, and certified organic seeds. It takes 3 years to get organic certification!';
      } else if (userInput.includes('pest') || userInput.includes('bug')) {
        response = 'Natural pest control: Use companion plants like marigolds, introduce beneficial insects, spray neem oil, or use diatomaceous earth. Healthy soil creates pest-resistant plants!';
      } else if (userInput.includes('soil')) {
        response = 'Good soil needs proper pH (6.0-7.0 for most crops), organic matter like compost, good drainage, and beneficial microorganisms. Test your soil annually and add amendments as needed.';
      } else if (userInput.includes('water') || userInput.includes('irrigation')) {
        response = 'Water deeply but less frequently to encourage deep roots. Morning watering reduces disease. Consider drip irrigation for efficiency. Most vegetables need 1-2 inches per week.';
      } else if (userInput.includes('season') || userInput.includes('when')) {
        response = 'Planting seasons vary by location. Cool-season crops (lettuce, peas) grow in spring/fall. Warm-season crops (tomatoes, peppers) need summer heat. Check your local frost dates!';
      } else if (userInput.includes('beginner') || userInput.includes('start')) {
        response = 'Start small with easy crops like lettuce, radishes, herbs, or beans. Choose a sunny spot with good soil drainage. Begin with containers if you have limited space. Join local gardening groups!';
      } else if (userInput.includes('tool')) {
        response = 'Essential tools: hand trowel, pruning shears, watering can or hose, garden fork, rake, and gloves. Start with basics and add specialized tools as you gain experience.';
      } else if (userInput.includes('nutrition') || userInput.includes('healthy')) {
        response = 'Fresh produce provides essential vitamins, minerals, and fiber. Eat a variety of colors for different nutrients. Local, seasonal produce is often more nutritious and flavorful!';
      } else if (userInput.includes('meal') || userInput.includes('recipe')) {
        response = 'Try incorporating more fresh vegetables into your meals! Roasted vegetables, fresh salads, stir-fries, and soups are great ways to use seasonal produce. Visit our meal planner for more ideas!';
      } else {
        response = 'I can help you with farming tips, soil preparation, pest control, seasonal planting, product information, nutrition advice, and meal planning. What specific topic interests you most?';
      }
      
      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: response
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
    
    setInput('');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="glass-card p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
            Harvest Hub Chatbot
          </h1>
          
          <div className="bg-white/30 rounded-lg p-6 mb-6">
            <p className="text-slate-700 mb-4">
              Our AI assistant is here to help you with farming questions, product information, and agricultural advice. 
              Whether you're a beginner gardener or experienced farmer, I can provide personalized guidance for your needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">I can help you with:</h3>
                <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                  <li>Farming tips for beginners</li>
                  <li>Soil preparation and testing</li>
                  <li>Seasonal planting guides</li>
                  <li>Organic farming methods</li>
                  <li>Pest control solutions</li>
                  <li>Product availability and pricing</li>
                  <li>Nutrition and meal planning</li>
                  <li>Tools and equipment advice</li>
                </ul>
              </div>
              <div className="bg-white/40 rounded-lg p-4 h-64 overflow-y-auto">
                {messages.map(message => (
                  <div key={message.id} className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-lg max-w-xs ${
                      message.type === 'user' 
                        ? 'bg-sage-600 text-white ml-auto' 
                        : 'bg-white/60 text-slate-800'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Ask me about farming, products, or nutrition..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="bg-white/80"
            />
            <Button 
              onClick={sendMessage}
              className="bg-sage-600 hover:bg-sage-700 text-white"
            >
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
