"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT" | "GUEST";
export type UserStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "INACTIVE";

export interface User {
  id: string;
  username: string;
  email: string;
  name?: string | null;
  koreanName?: string | null;
  image?: string | null;
  role: UserRole;
  status: UserStatus;
  age?: number | null;
  gender?: string | null;
  grade?: number | null;
  studentName?: string | null;
  birthdate?: string | null;
  emailVerified?: boolean;
  createdAt?: string;
  lastLoginAt?: string | null;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));

      // Verify token is still valid
      verifyCurrentUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Auto-refresh token every 14 minutes (before 15min expiry)
  useEffect(() => {
    if (!accessToken) return;

    const interval = setInterval(() => {
      refreshToken();
    }, 14 * 60 * 1000); // 14 minutes

    return () => clearInterval(interval);
  }, [accessToken]);

  const verifyCurrentUser = async (token: string) => {
    try {
      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      } else {
        // Token invalid, try to refresh
        const refreshed = await refreshToken();
        if (!refreshed) {
          // Refresh failed, clear auth
          clearAuth();
        }
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "로그인에 실패했습니다");
    }

    const { accessToken: newToken, user: newUser } = data.data;

    setAccessToken(newToken);
    setUser(newUser);

    localStorage.setItem("accessToken", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      clearAuth();
      router.push("/auth/login");
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
      });

      if (!res.ok) {
        return false;
      }

      const data = await res.json();
      const { accessToken: newToken, user: newUser } = data.data;

      setAccessToken(newToken);
      setUser(newUser);

      localStorage.setItem("accessToken", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  const clearAuth = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const value: AuthContextType = {
    user,
    accessToken,
    loading,
    login,
    logout,
    refreshToken,
    isAuthenticated: !!user && !!accessToken,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Hook for protected routes
export function useRequireAuth(requiredRoles?: UserRole[]) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
      } else if (requiredRoles && !requiredRoles.includes(user.role)) {
        router.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, router, JSON.stringify(requiredRoles)]);

  return { user, loading };
}
