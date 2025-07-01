
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { cleanupAuthState } from '@/utils/authUtils';

interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: 'farmer' | 'consumer';
  joinedDate: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, role: 'farmer' | 'consumer') => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (!mounted) return;
        
        setSession(session);
        
        if (session?.user) {
          // Defer profile fetching to avoid potential deadlocks
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              // Fetch user profile from our profiles table
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (profile && !error && mounted) {
                console.log('Profile loaded:', profile);
                setUser({
                  id: profile.id,
                  username: profile.username,
                  email: profile.email,
                  role: profile.role as 'farmer' | 'consumer',
                  joinedDate: profile.created_at
                });
              } else if (error) {
                console.error('Error fetching profile:', error);
                if (mounted) setUser(null);
              } else {
                console.log('No profile found for user');
                if (mounted) setUser(null);
              }
            } catch (error) {
              console.error('Error in profile fetch:', error);
              if (mounted) setUser(null);
            }
          }, 100);
        } else {
          if (mounted) setUser(null);
        }
        
        if (mounted) setLoading(false);
      }
    );

    // Check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        if (!session && mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        if (mounted) setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('Starting login process for:', email);
      
      // Clean up existing auth state before login
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
        // Wait a moment for cleanup
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        console.warn('Sign out before login failed:', err);
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      
      if (error) {
        console.error('Login error:', error.message);
        return false;
      }
      
      if (data.user) {
        console.log('Login successful for user:', data.user.id);
        return true;
      }
      
      console.error('Login failed: No user returned');
      return false;
    } catch (error) {
      console.error('Login exception:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, role: 'farmer' | 'consumer'): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('Starting registration process for:', email, 'as', role);
      
      // Clean up existing auth state before registration
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            username: username.trim(),
            role
          }
        }
      });
      
      if (error) {
        console.error('Registration error:', error.message);
        return false;
      }
      
      if (data.user) {
        console.log('Registration successful for user:', data.user.id);
        // Check if email confirmation is required
        if (!data.session) {
          console.log('Email confirmation required');
        }
        return true;
      }
      
      console.error('Registration failed: No user returned');
      return false;
    } catch (error) {
      console.error('Registration exception:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      console.log('Starting logout process');
      
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) {
        console.error('Logout error:', error);
      } else {
        console.log('Logout successful');
      }
      
      // Force page reload for clean state
      window.location.href = '/';
    } catch (error) {
      console.error('Logout exception:', error);
      // Force reload even on error
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
