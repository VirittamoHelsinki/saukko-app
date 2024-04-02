import React, { useEffect, useState, createContext } from 'react';
import { fetchCurrentUser } from '../../api/user.js';

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Set default to null to clearly indicate "no user"
  const [role, setRole] = useState(' ');
  const [emailVerified, setEmailVerified] = useState(false);

  // TODO: Need to refactor, is the user logged in should be test by reading "auth_state" token and it's expiration time
  // only if user is logged-in, we can call teh fetchCurrentUser method, currently that not happen
  const getLoggedIn = async () => {
    try {
      const response = await fetchCurrentUser();
      const data = response.data;
      console.log("response", data.role, data.emailVerified, data.email )

      const isUserLoggedIn = !!data.email;
      setLoggedIn(isUserLoggedIn);
      if (isUserLoggedIn && data) {
        setUser(data);
        setRole(data.role || ' '); // Set a default role if it's not provided
        setEmailVerified(data.emailVerified)
        if (!data.emailVerified) {
          console.warn("EMAIL IS NOT VERIFIED!")
        }
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
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, user, role, emailVerified }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };