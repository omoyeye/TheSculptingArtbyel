import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const authenticated = localStorage.getItem("adminAuthenticated");
    const session = localStorage.getItem("adminSession");
    
    if (authenticated === "true" && session) {
      const sessionTime = parseInt(session);
      const now = Date.now();
      // Session expires after 2 hours for security
      const sessionValid = (now - sessionTime) < (2 * 60 * 60 * 1000);
      
      if (sessionValid) {
        setIsAuthenticated(true);
        return true;
      } else {
        logout();
        return false;
      }
    }
    
    // Always clear auth state if not properly authenticated
    logout();
    return false;
  };

  const login = (username: string, password: string) => {
    // Simple authentication - in production, this would be handled by a secure backend
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminAuthenticated", "true");
      localStorage.setItem("adminSession", Date.now().toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminSession");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}