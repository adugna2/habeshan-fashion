import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsAdminLoggedIn(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("adminToken", token);
    setIsAdminLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAdminLoggedIn(false);
  };

  const getToken = () => localStorage.getItem("adminToken");

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, login, logout, getToken }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
