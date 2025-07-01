
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { Save, User, MapPin, Phone, Mail } from 'lucide-react';

const FarmerSettings: React.FC = () => {
  const [farmDetails, setFarmDetails] = useState({
    farmName: 'Green Valley Farm',
    ownerName: 'John Doe',
    email: 'devaa@gmail.com',
    phone: '+1 (555) 123-4567',
    address: '123 Farm Road, Countryside, ST 12345',
    description: 'Organic farming practices since 1985. We specialize in fresh vegetables and sustainable agriculture.',
    certifications: 'USDA Organic, Fair Trade Certified'
  });

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPromotions: false,
    smsAlerts: true
  });

  const { toast } = useToast();

  const handleSave = () => {
    // Here you would typically save to a backend
    toast({
      title: "Settings Saved",
      description: "Your farm settings have been updated successfully."
    });
  };

  return (
    <div className="space-y-8">
      {/* Farm Information */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <MapPin className="w-5 h-5 text-sage-600" />
          <h3 className="text-xl font-bold text-slate-800">Farm Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Farm Name</label>
            <Input
              value={farmDetails.farmName}
              onChange={(e) => setFarmDetails({...farmDetails, farmName: e.target.value})}
              className="bg-white/80"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Owner Name</label>
            <Input
              value={farmDetails.ownerName}
              onChange={(e) => setFarmDetails({...farmDetails, ownerName: e.target.value})}
              className="bg-white/80"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <Input
              type="email"
              value={farmDetails.email}
              onChange={(e) => setFarmDetails({...farmDetails, email: e.target.value})}
              className="bg-white/80"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
            <Input
              value={farmDetails.phone}
              onChange={(e) => setFarmDetails({...farmDetails, phone: e.target.value})}
              className="bg-white/80"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
          <Input
            value={farmDetails.address}
            onChange={(e) => setFarmDetails({...farmDetails, address: e.target.value})}
            className="bg-white/80"
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Farm Description</label>
          <Textarea
            value={farmDetails.description}
            onChange={(e) => setFarmDetails({...farmDetails, description: e.target.value})}
            className="bg-white/80"
            rows={3}
          />
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Certifications</label>
          <Input
            value={farmDetails.certifications}
            onChange={(e) => setFarmDetails({...farmDetails, certifications: e.target.value})}
            className="bg-white/80"
            placeholder="e.g., USDA Organic, Fair Trade"
          />
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Mail className="w-5 h-5 text-sage-600" />
          <h3 className="text-xl font-bold text-slate-800">Notification Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-slate-700">Email notifications for new orders</label>
              <p className="text-sm text-slate-600">Get notified when customers place orders</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailOrders}
              onChange={(e) => setNotifications({...notifications, emailOrders: e.target.checked})}
              className="w-4 h-4 text-sage-600"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-slate-700">Promotional emails</label>
              <p className="text-sm text-slate-600">Receive updates about new features and tips</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailPromotions}
              onChange={(e) => setNotifications({...notifications, emailPromotions: e.target.checked})}
              className="w-4 h-4 text-sage-600"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-slate-700">SMS alerts</label>
              <p className="text-sm text-slate-600">Get text messages for urgent notifications</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.smsAlerts}
              onChange={(e) => setNotifications({...notifications, smsAlerts: e.target.checked})}
              className="w-4 h-4 text-sage-600"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-sage-600 hover:bg-sage-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default FarmerSettings;
