"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface NotificationItem {
  id: string;
  message: string;
  timestamp: string;
}

interface AuthContextType {
  user: User | null;
  notifications: NotificationItem[];
  login: (user: User) => void;
  logout: () => void;
  addNotification: (message: string) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("algo_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("algo_user");
      }
    } else {
      // Default initial user
      const defaultUser = { firstName: "Yashpalsingh", lastName: "Pawara", email: "yashpalsinghpawara@gmail.com" };
      setUser(defaultUser);
      localStorage.setItem("algo_user", JSON.stringify(defaultUser));
    }

    const savedNotifs = localStorage.getItem("algo_notifications");
    if (savedNotifs) {
      try {
        setNotifications(JSON.parse(savedNotifs));
      } catch (e) {}
    } else {
      const defaultNotifs: NotificationItem[] = [
        {
          id: "1",
          message: "Welcome to AlgoTrade! Explore your commodity dashboard.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        {
          id: "2",
          message: "Alert: Natural Gas price gained +3.61% recently.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ];
      setNotifications(defaultNotifs);
      localStorage.setItem("algo_notifications", JSON.stringify(defaultNotifs));
    }
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("algo_user", JSON.stringify(newUser));
    // Add success notification
    addNotification(`Logged in successfully as ${newUser.firstName} ${newUser.lastName}.`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("algo_user");
  };

  const addNotification = (message: string) => {
    const newNotif: NotificationItem = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications((prev) => {
      const updated = [newNotif, ...prev];
      localStorage.setItem("algo_notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      localStorage.setItem("algo_notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const clearNotifications = () => {
    setNotifications([]);
    localStorage.setItem("algo_notifications", JSON.stringify([]));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        notifications,
        login,
        logout,
        addNotification,
        removeNotification,
        clearNotifications,
      }}
    >
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
