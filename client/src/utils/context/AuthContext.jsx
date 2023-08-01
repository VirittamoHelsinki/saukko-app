import React, { useEffect, useState, createContext } from 'react';
import { fetchLoggedIn } from '../../api/user.js';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const getLoggedIn = async () => {
    try {
      const response = await fetchLoggedIn()
      setLoggedIn(response.data.loggedIn);
      setUser(response.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
