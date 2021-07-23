import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const storagedAdmin = sessionStorage.getItem('admin');
    const storagedToken = sessionStorage.getItem('token');
    if (storagedToken && storagedAdmin) {
      setUser({
        admin: Boolean(storagedAdmin),
        auth: Boolean(storagedToken)
      })
    }
  }, []);

  const login = async (userData) => {
    const response = await api.post('/login', userData);

    setUser(response.data);
    sessionStorage.setItem('token', response.data.token);
    sessionStorage.setItem('admin', response.data.admin);
  }

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{ auth: Boolean(user), admin: user && user.admin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};