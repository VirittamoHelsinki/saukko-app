import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  const getLoggedIn = async () => {
    try {
      const loggedInRes = await axios.get(
        "http://localhost:5000/auth/loggedIn"
      );
      setLoggedIn(loggedInRes.data.loggedIn);
      setUser(loggedInRes.data.user);
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
