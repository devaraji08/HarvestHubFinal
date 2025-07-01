
import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon."
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="glass-card p-12 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-slate-700 font-medium">Name:</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name"
                className="mt-2 bg-white/80"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-slate-700 font-medium">Email:</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                className="mt-2 bg-white/80"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-slate-700 font-medium">Message:</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Enter your message"
                className="mt-2 bg-white/80 min-h-32"
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3">
              Submit
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Contact;
