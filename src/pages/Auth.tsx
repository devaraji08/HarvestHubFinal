
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'consumer' as 'farmer' | 'consumer'
  });
  const { login, register, loading, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = isLogin 
      ? await login(formData.email, formData.password)
      : await register(formData.username, formData.email, formData.password, formData.role);

    if (success) {
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "You have successfully logged in." : "Your account has been created successfully."
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Authentication failed",
        description: isLogin ? "Please check your credentials and try again." : "Failed to create account. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Back to home link */}
        <Link to="/" className="inline-flex items-center text-sage-600 hover:text-sage-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {isLogin ? 'Welcome Back' : 'Join Harvest Hub'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username (Register only) */}
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-800 font-medium">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="pl-10 bg-white/90 border-gray-300 focus:border-sage-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-800 font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 bg-white/90 border-gray-300 focus:border-sage-500"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-800 font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 bg-white/90 border-gray-300 focus:border-sage-500"
                required
              />
            </div>
          </div>

          {/* Role Selection (Register only) */}
          {!isLogin && (
            <div className="space-y-3">
              <Label className="text-gray-800 font-medium">I am registering as a:</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => handleInputChange('role', value)}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="farmer" id="farmer" />
                  <Label htmlFor="farmer" className="text-gray-700">Farmer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="consumer" id="consumer" />
                  <Label htmlFor="consumer" className="text-gray-700">Consumer</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>

          {/* Switch mode */}
          <div className="text-center text-gray-700">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sage-600 hover:text-sage-700 ml-2 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
