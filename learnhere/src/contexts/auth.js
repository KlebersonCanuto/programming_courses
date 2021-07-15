import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('user');
    const storagedToken = sessionStorage.getItem('token');
    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  const login = async (userData) => {
    // const response = await api.post('/login', userData);
    const response = {
      data: {
        token: '1',
        user: '1'
      }
    }

    setUser(response.data.user);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    sessionStorage.setItem('user', JSON.stringify(response.data.user));
    sessionStorage.setItem('token', response.data.token);
  }

  const logout = () => {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ auth: Boolean(user), user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}