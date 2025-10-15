import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize admin auth state from localStorage
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  });

  // Update localStorage whenever admin auth state changes
  useEffect(() => {
    localStorage.setItem('isAdminAuthenticated', isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  const loginAdmin = () => setIsAdminAuthenticated(true);
  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// Named export used by Header.jsx
export function useAuth() {
  const ctx = useContext(AuthContext);
  // If no provider is present, return a safe default to avoid runtime crashes.
  if (!ctx) {
    return {
      isAdminAuthenticated: false,
      loginAdmin: () => {},
      logoutAdmin: () => {},
    };
  }
  return ctx;
}

export default AuthContext;
