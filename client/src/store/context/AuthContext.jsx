import React, { useEffect, useState, createContext } from 'react';
import { fetchLoggedIn } from '../../api/user.js';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Set default to null to clearly indicate "no user"
  const [role, setRole] = useState(' ');

  const getLoggedIn = async () => {
    try {
      const response = await fetchLoggedIn();
      const isUserLoggedIn = response.data.loggedIn;
      setLoggedIn(isUserLoggedIn);
      if (isUserLoggedIn && response.data.user) {
        setUser(response.data.user);
        setRole(response.data.user.role || ' '); // Set a default role if it's not provided
        console.log("User role: ", response.data.user.role);
      } else {
        setUser(null);
        setRole(' ');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, user, role }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };