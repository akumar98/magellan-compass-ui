import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, UserRole } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const storedUser = localStorage.getItem('magellan_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Mock authentication - will be replaced with real auth
    // Demo users for testing
    let mockUser: User;
    
    if (email.includes('admin')) {
      mockUser = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin',
      };
    } else if (email.includes('employer')) {
      mockUser = {
        id: '2',
        email,
        name: 'Employer User',
        role: 'employer',
        companyId: 'company-1',
        companyName: 'Acme Corp',
      };
    } else {
      mockUser = {
        id: '3',
        email,
        name: 'Employee User',
        role: 'employee',
        companyId: 'company-1',
        companyName: 'Acme Corp',
        points: 2450,
      };
    }

    localStorage.setItem('magellan_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const logout = async () => {
    localStorage.removeItem('magellan_user');
    setUser(null);
  };

  const isRole = (role: UserRole) => user?.role === role;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isRole }}>
      {children}
    </AuthContext.Provider>
  );
};
