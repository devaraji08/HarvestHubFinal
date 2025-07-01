
import React from 'react';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import FarmerDashboard from '../components/FarmerDashboard';
import ConsumerDashboard from '../components/ConsumerDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="glass-card p-12 text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h1>
            <p className="text-slate-600">Please log in to access your dashboard.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      {user.role === 'farmer' ? <FarmerDashboard /> : <ConsumerDashboard />}
    </div>
  );
};

export default Dashboard;
