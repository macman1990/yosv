import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../lib/auth';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updatePassword: (pwd: string) => Promise<{ success: boolean; message?: string }>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check local/session auth status
    AuthService.isAuthenticated().then(auth => setIsAuthenticated(auth));
  }, []);

  const login = async (email: string, password: string) => {
    const result = await AuthService.authenticate(email, password);
    if (result.success) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  const updatePassword = async (pwd: string) => {
    return await AuthService.updatePassword(pwd);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, updatePassword }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
