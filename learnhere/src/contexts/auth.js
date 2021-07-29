import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const storagedAdmin = localStorage.getItem('admin');
    const storagedToken = localStorage.getItem('token');
    if (storagedToken && storagedAdmin) {
      setUser({
        admin: Boolean(storagedAdmin),
        auth: Boolean(storagedToken)
      });
      api.defaults.headers.common['Authorization'] = storagedToken;
    }
  }, []);

  const login = async (userData) => {
    const response = await api.post('/login', userData);

    setUser(response.data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('admin', response.data.admin);
    api.defaults.headers.common['Authorization'] = response.data.token;
  }

  const logout = () => {
    setUser(null);
    api.defaults.headers.common['Authorization'] = null;
    localStorage.clear();
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