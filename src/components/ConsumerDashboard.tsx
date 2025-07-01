
import React from 'react';
import { Button } from '@/components/ui/button';

const ConsumerDashboard: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Consumer Dashboard</h1>
        <Button className="bg-slate-800 hover:bg-slate-700 text-white">
          Switch to Farmer View
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* User Information */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">User Information</h3>
          <div className="space-y-2 text-slate-700">
            <p><span className="font-medium">Name:</span> Not set</p>
            <p><span className="font-medium">Email:</span> devaa@gmail.com</p>
            <p><span className="font-medium">Role:</span> Consumer</p>
          </div>
          <Button className="mt-4 bg-sage-600 hover:bg-sage-700 text-white">
            View Profile
          </Button>
        </div>

        {/* Shopping Statistics */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Your Shopping Statistics</h3>
          <div className="space-y-2 text-slate-700">
            <p><span className="font-medium">Products Purchased:</span> 0</p>
            <p><span className="font-medium">Money Saved:</span> $0.00</p>
            <p><span className="font-medium">Farms Supported:</span> 0</p>
          </div>
          <Button className="mt-4 bg-sage-600 hover:bg-sage-700 text-white">
            View History
          </Button>
        </div>

        {/* Recommendations */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Recommendations</h3>
          <div className="space-y-2 text-slate-700">
            <p><span className="font-medium">Based on your purchases:</span> Loading...</p>
            <p><span className="font-medium">Seasonal Picks:</span> Loading...</p>
            <p><span className="font-medium">Local Farms:</span> Loading...</p>
          </div>
          <Button className="mt-4 bg-sage-600 hover:bg-sage-700 text-white">
            Explore More
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Activities</h3>
          <div className="space-y-3 text-slate-700">
            <p>Loading...</p>
            <p>Loading...</p>
            <p>Loading...</p>
          </div>
          <Button className="mt-4 bg-sage-600 hover:bg-sage-700 text-white">
            View All
          </Button>
        </div>

        {/* Notifications */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Notifications</h3>
          <div className="space-y-3 text-slate-700">
            <p>Loading...</p>
            <p>Loading...</p>
            <p>Loading...</p>
          </div>
          <Button className="mt-4 bg-sage-600 hover:bg-sage-700 text-white">
            View Notifications
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ConsumerDashboard;
