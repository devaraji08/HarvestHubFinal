import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductSuggestions from '../components/ProductSuggestions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { suggestProductsFromMealPlan, ProductSuggestion } from '@/utils/mealPlannerUtils';
import { useAuth } from '@/contexts/AuthContext';

const MealPlanner: React.FC = () => {
  const { user } = useAuth();
  const [mealPlan, setMealPlan] = useState({
    monday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
    tuesday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
    wednesday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
    thursday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
    friday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
    saturday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
    sunday: { breakfast: '', lunch: '', dinner: '', snacks: '' }
  });

  const [productSuggestions, setProductSuggestions] = useState<ProductSuggestion[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi! I can help you plan your meals. Ask me about healthy recipes, nutrition tips, or meal suggestions!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const meals = ['breakfast', 'lunch', 'dinner', 'snacks'];

  const updateMeal = (day: string, meal: string, value: string) => {
    setMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [meal]: value
      }
    }));
  };

  // Update product suggestions when meal plan changes
  useEffect(() => {
    const updateSuggestions = async () => {
      if (!user) return;
      
      const hasAnyMeal = Object.values(mealPlan).some(day => 
        Object.values(day).some(meal => meal.trim())
      );
      
      if (!hasAnyMeal) {
        setProductSuggestions([]);
        return;
      }
      
      setSuggestionsLoading(true);
      try {
        const suggestions = await suggestProductsFromMealPlan(mealPlan);
        setProductSuggestions(suggestions);
      } catch (error) {
        console.error('Error getting product suggestions:', error);
      } finally {
        setSuggestionsLoading(false);
      }
    };

    // Debounce the suggestions update
    const timeoutId = setTimeout(updateSuggestions, 1000);
    return () => clearTimeout(timeoutId);
  }, [mealPlan, user]);

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { id: Date.now(), type: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Generate more helpful responses based on keywords
    setTimeout(() => {
      let response = '';
      const input = chatInput.toLowerCase();
      
      if (input.includes('breakfast')) {
        response = 'For breakfast, try overnight oats with berries, Greek yogurt with granola, or scrambled eggs with vegetables. These provide great energy to start your day!';
      } else if (input.includes('lunch')) {
        response = 'For lunch, consider a quinoa salad with roasted vegetables, grilled chicken with sweet potato, or a hearty vegetable soup with whole grain bread.';
      } else if (input.includes('dinner')) {
        response = 'For dinner, try salmon with roasted broccoli, lentil curry with brown rice, or grilled chicken with steamed vegetables and quinoa.';
      } else if (input.includes('snack')) {
        response = 'Healthy snacks include mixed nuts, fresh fruit, Greek yogurt, vegetable sticks with hummus, or a small smoothie.';
      } else if (input.includes('healthy') || input.includes('nutrition')) {
        response = 'Focus on whole foods: lean proteins, vegetables, fruits, whole grains, and healthy fats. Aim for colorful plates and balanced macronutrients!';
      } else if (input.includes('recipe')) {
        response = 'I can suggest simple recipes! Try a Mediterranean bowl with chickpeas, cucumber, tomatoes, and feta, or a stir-fry with your favorite vegetables and tofu or chicken.';
      } else if (input.includes('weight') || input.includes('lose')) {
        response = 'For weight management, focus on portion control, eat plenty of vegetables, choose lean proteins, and stay hydrated. Small, frequent meals can help too!';
      } else if (input.includes('vegetarian') || input.includes('vegan')) {
        response = 'Great plant-based options include lentil dishes, tofu stir-fries, quinoa bowls, chickpea curries, and vegetable-packed salads with nuts and seeds.';
      } else {
        response = 'I can help you with meal planning, healthy recipes, nutrition advice, and food suggestions. What specific aspect of meal planning would you like to know about?';
      }
      
      const botMessage = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: response
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
    
    setChatInput('');
  };

  const clearAllMeals = () => {
    setMealPlan({
      monday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
      tuesday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
      wednesday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
      thursday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
      friday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
      saturday: { breakfast: '', lunch: '', dinner: '', snacks: '' },
      sunday: { breakfast: '', lunch: '', dinner: '', snacks: '' }
    });
  };

  const generateGroceryList = () => {
    const allMeals = Object.values(mealPlan).flatMap(day => Object.values(day)).filter(meal => meal.trim());
    if (allMeals.length === 0) {
      alert('Please add some meals to generate a grocery list!');
      return;
    }
    
    const groceryItems = allMeals.join(', ');
    alert(`Based on your meal plan, you might need ingredients for: ${groceryItems}`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">Weekly Meal Planner</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Meal Planning Grid */}
            <div className="lg:col-span-2">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-4"></th>
                      {days.map(day => (
                        <th key={day} className="p-4 bg-sage-600 text-white rounded-t-lg capitalize min-w-32">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {meals.map(meal => (
                      <tr key={meal}>
                        <th className="p-4 bg-sage-600 text-white rounded-l-lg capitalize font-medium">
                          {meal}
                        </th>
                        {days.map(day => (
                          <td key={`${day}-${meal}`} className="p-2">
                            <Textarea
                              value={mealPlan[day as keyof typeof mealPlan][meal as keyof typeof mealPlan.monday]}
                              onChange={(e) => updateMeal(day, meal, e.target.value)}
                              placeholder={`Add ${meal}...`}
                              className="bg-white/80 border border-white/30 rounded-lg min-h-20 resize-none text-sm"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button 
                  onClick={generateGroceryList}
                  className="bg-sage-600 hover:bg-sage-700 text-white"
                >
                  Generate Grocery List
                </Button>
                <Button variant="outline" className="border-sage-600 text-sage-600 hover:bg-sage-50">
                  Save Meal Plan
                </Button>
                <Button variant="outline" className="border-sage-600 text-sage-600 hover:bg-sage-50">
                  Load Meal Plan
                </Button>
                <Button 
                  onClick={clearAllMeals}
                  variant="destructive" 
                  className="bg-red-600 hover:bg-red-700"
                >
                  Clear All
                </Button>
              </div>
            </div>

            {/* Right sidebar with chatbot and product suggestions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Suggestions */}
              <ProductSuggestions 
                suggestions={productSuggestions} 
                loading={suggestionsLoading}
              />

              {/* Chatbot Assistant */}
              <div className="bg-white/30 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-4">Meal Planning Assistant</h3>
                
                <div className="bg-white/40 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                  {chatMessages.map(message => (
                    <div key={message.id} className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-3 rounded-lg max-w-full text-sm ${
                        message.type === 'user' 
                          ? 'bg-sage-600 text-white ml-auto' 
                          : 'bg-white/60 text-slate-800'
                      }`}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Ask about meals, recipes, nutrition..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    className="bg-white/80 text-sm"
                  />
                  <Button 
                    onClick={sendChatMessage}
                    className="bg-sage-600 hover:bg-sage-700 text-white"
                    size="sm"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MealPlanner;
