import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialize admin auth state from localStorage
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
  });

  // Initialize user auth state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const savedCustomer = localStorage.getItem('customer'); // Also check for 'customer' key
    
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing saved user:', e);
        localStorage.removeItem('user');
      }
    }
    
    if (savedCustomer) {
      try {
        const customerData = JSON.parse(savedCustomer);
        // Store customer data as user data for consistency
        localStorage.setItem('user', savedCustomer);
        return customerData;
      } catch (e) {
        console.error('Error parsing saved customer:', e);
        localStorage.removeItem('customer');
      }
    }
    
    return null;
  });

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const savedCustomer = localStorage.getItem('customer');
    const savedAuthState = localStorage.getItem('isUserAuthenticated') === 'true';
    
    // User is authenticated if we have user data and auth state is true
    const hasUserData = (savedUser && savedUser !== 'null') || (savedCustomer && savedCustomer !== 'null');
    return savedAuthState && hasUserData;
  });

  // Update localStorage whenever admin auth state changes
  useEffect(() => {
    localStorage.setItem('isAdminAuthenticated', isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  // Update localStorage whenever user auth state changes
  useEffect(() => {
    localStorage.setItem('isUserAuthenticated', isUserAuthenticated.toString());
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    console.log('🔄 User auth state updated:', { isUserAuthenticated, user: user ? `${user.firstName} ${user.lastName}` : null });
  }, [isUserAuthenticated, user]);

  const loginAdmin = () => setIsAdminAuthenticated(true);
  
  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
  };

  const loginUser = (userData) => {
    setUser(userData);
    setIsUserAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('👤 User logged in:', userData);
  };

  const logoutUser = () => {
    setUser(null);
    setIsUserAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('customer');
    localStorage.removeItem('isUserAuthenticated');
    localStorage.removeItem('token');
    
    // Trigger logout event to notify other components
    window.dispatchEvent(new Event('userLoggedOut'));
    
    console.log('👋 User logged out');
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

  return (
    <AuthContext.Provider value={{ 
      // Admin authentication
      isAdminAuthenticated, 
      loginAdmin, 
      logoutAdmin,
      // User authentication
      isUserAuthenticated,
      user,
      loginUser,
      logoutUser,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Named export used by Header.jsx and other components
export function useAuth() {
  const ctx = useContext(AuthContext);
  // If no provider is present, return a safe default to avoid runtime crashes.
  if (!ctx) {
    return {
      isAdminAuthenticated: false,
      loginAdmin: () => {},
      logoutAdmin: () => {},
      isUserAuthenticated: false,
      user: null,
      loginUser: () => {},
      logoutUser: () => {},
      updateUser: () => {}
    };
  }
  return ctx;
}

export default AuthContext;
