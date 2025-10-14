import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Minimal admin auth state. You can extend this to persist state or load from an API.
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const loginAdmin = () => setIsAdminAuthenticated(true);
  const logoutAdmin = () => setIsAdminAuthenticated(false);

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
