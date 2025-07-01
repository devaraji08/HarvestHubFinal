
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X, Mail, Lock, User } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'consumer' as 'farmer' | 'consumer',
    rememberMe: false,
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register, loading } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    console.log('Form submission started:', { isLogin, email: formData.email });
    
    // Basic validation
    if (!formData.email.trim() || !formData.password.trim()) {
      toast("Please fill in all required fields");
      return;
    }

    if (!isLogin && !formData.username.trim()) {
      toast("Please enter a username");
      return;
    }
    
    if (!isLogin && !formData.agreeToTerms) {
      toast("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Attempting authentication...');
      const success = isLogin 
        ? await login(formData.email.trim(), formData.password)
        : await register(formData.username.trim(), formData.email.trim(), formData.password, formData.role);

      console.log('Authentication result:', success);

      if (success) {
        toast(isLogin ? "Welcome back!" : "Account created successfully!");
        onClose();
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'consumer',
          rememberMe: false,
          agreeToTerms: false
        });
      } else {
        console.error('Authentication failed');
        toast(isLogin 
          ? "Invalid email or password. Please try again." 
          : "Registration failed. Please check your information and try again."
        );
      }
    } catch (error) {
      console.error('Auth error in modal:', error);
      toast("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'consumer',
      rememberMe: false,
      agreeToTerms: false
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          {isLogin ? 'Login' : 'Registration'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="pl-10 bg-white/90 border-gray-300 focus:border-green-500 text-gray-900"
                  required={!isLogin}
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
                className="pl-10 bg-white/90 border-gray-300 focus:border-green-500 text-gray-900"
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
                className="pl-10 bg-white/90 border-gray-300 focus:border-green-500 text-gray-900"
                required
                minLength={6}
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

          {/* Remember me (Login only) */}
          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                />
                <Label htmlFor="remember" className="text-gray-700 text-sm">Remember me</Label>
              </div>
              <button type="button" className="text-green-600 hover:text-green-700 text-sm font-medium">
                Forgot Password?
              </button>
            </div>
          )}

          {/* Terms agreement (Register only) */}
          {!isLogin && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
              />
              <Label htmlFor="terms" className="text-gray-700 text-sm">
                I agree to the terms & conditions
              </Label>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-colors"
          >
            {(loading || isSubmitting) ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </Button>

          {/* Switch mode */}
          <div className="text-center text-gray-700 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              className="text-green-600 hover:text-green-700 ml-1 font-medium"
              disabled={isSubmitting}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
