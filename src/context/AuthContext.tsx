import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  isAuthenticated: boolean;
}

const DEFAULT_USERS: Record<UserRole, UserProfile> = {
  student: {
    id: 'std_demo_101',
    email: 'vaishnav.student@gyansetu.edu',
    name: 'Vaishnav Musmade',
    role: 'student',
    board: 'CBSE',
    standard: 10,
    language: 'English',
    created_at: new Date().toISOString()
  },
  teacher: {
    id: 'tch_demo_201',
    email: 'dr.sharma@gyansetu.edu',
    name: 'Dr. Ramesh Sharma',
    role: 'teacher',
    is_approved: true,
    subjects: ['Science', 'Physics'],
    classes: [9, 10, 11, 12],
    created_at: new Date().toISOString()
  },
  admin: {
    id: 'adm_demo_001',
    email: 'admin@gyansetu.edu',
    name: 'Academic Administrator',
    role: 'admin',
    created_at: new Date().toISOString()
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('gyansetu_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USERS.student;
      }
    }
    return DEFAULT_USERS.student; // Default logged in as student for seamless evaluation
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('gyansetu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gyansetu_user');
    }
  }, [user]);

  const login = (email: string, role: UserRole) => {
    const newUser: UserProfile = {
      ...DEFAULT_USERS[role],
      email: email || DEFAULT_USERS[role].email
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    setUser(DEFAULT_USERS[role]);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        switchRole,
        updateProfile,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
