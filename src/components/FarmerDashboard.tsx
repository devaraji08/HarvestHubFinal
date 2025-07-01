
import React, { useState } from 'react';
import { Button } from './ui/button';
import FarmerProductManager from './FarmerProductManager';
import FarmerSettings from './FarmerSettings';
import { Package, BarChart3, Settings } from 'lucide-react';

const FarmerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Farmer Dashboard</h1>
        <Button className="bg-slate-800 hover:bg-slate-700 text-white">
          Switch to Consumer View
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 border-b border-white/30">
        <nav className="flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-sage-600 text-sage-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' && (
        <div className="glass-card p-8">
          <FarmerProductManager />
        </div>
      )}

      {activeTab === 'overview' && (
        <div>
          {/* Enhanced Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Sales Statistics */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Today's Sales</h3>
              <div className="text-3xl font-bold text-sage-600 mb-2">$127.50</div>
              <p className="text-sm text-slate-600">+12% from yesterday</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Orders</h3>
              <div className="text-3xl font-bold text-sage-600 mb-2">8</div>
              <p className="text-sm text-slate-600">3 pending fulfillment</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Active Products</h3>
              <div className="text-3xl font-bold text-sage-600 mb-2">12</div>
              <p className="text-sm text-slate-600">2 low in stock</p>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Revenue</h3>
              <div className="text-3xl font-bold text-sage-600 mb-2">$1,245</div>
              <p className="text-sm text-slate-600">This month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/40 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">Order #1234</p>
                    <p className="text-sm text-slate-600">2x Organic Tomatoes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sage-600">$9.98</p>
                    <p className="text-sm text-slate-600">Pending</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/40 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">Order #1233</p>
                    <p className="text-sm text-slate-600">1x Farm Fresh Eggs</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sage-600">$6.99</p>
                    <p className="text-sm text-green-600">Completed</p>
                  </div>
                </div>
              </div>
              <Button className="mt-4 w-full bg-sage-600 hover:bg-sage-700 text-white">
                View All Orders
              </Button>
            </div>

            {/* Performance Metrics */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700">Customer Satisfaction</span>
                    <span className="text-slate-800 font-medium">4.8/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-sage-600 h-2 rounded-full" style={{width: '96%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700">Order Fulfillment</span>
                    <span className="text-slate-800 font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-sage-600 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700">Response Time</span>
                    <span className="text-slate-800 font-medium">2.3 hrs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-sage-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <FarmerSettings />
      )}
    </main>
  );
};

export default FarmerDashboard;
