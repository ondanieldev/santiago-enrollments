import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>(() => {
    const tokenFromLS = localStorage.getItem('@SantiagoReenrollments:token');

    if (tokenFromLS) {
      return tokenFromLS;
    }

    return '';
  });

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      const response = await api.post('/sessions', {
        username,
        password,
      });

      localStorage.setItem('@SantiagoReenrollments:token', response.data);

      setToken(response.data);
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@SantiagoReenrollments:token');

    setToken('');
  }, []);

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthContext Provider');
  }

  return context;
};
