// src/hooks/useAuth.ts
import { useEffect, useState } from "react";
import * as jwtDecode from "jwt-decode"; // Use namespace import

interface User {
  id: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: User = jwtDecode.default(token); // Access default function
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token is invalid or expired:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return { user, isAuthenticated };
};
