import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Uvc from 'universal-cookie';
import { fetchCurrentUser } from '../../api/user.js';

const Ctx = createContext(null);

export const useAuthContext = () => {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error('Call "useAuthContext" on inside a "AuthContextProvider"')
  }

  return ctx;
}

const AuthContextProvider = ({ children }) => {
  const cookies = new Uvc();
  const [cookieAuthState, setCookieAuthState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  // Check the Auth-state from cookies
  const cookieChangeListener = useCallback((ccl) => {
    console.log("Cookies updated", ccl)

    // cookieChangeListener is manually triggered, check the 🍪
    if (!ccl) {
      const c = cookies.get("auth_state");
      if (!!c) {
        setCookieAuthState(true);
      }
      return;
    }

    if (ccl.name === "auth_state" && ccl.value === undefined) {
      // Logged-out
      setCookieAuthState(false);
      setLoggedIn(false)
      setCurrentUser(undefined);
    } else if (ccl.name === "auth_state" && !!ccl.value) {
      // Cookie exists and has a value
      setCookieAuthState(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect for start cookie-listener
  useEffect(() => {
    cookies.addChangeListener(cookieChangeListener);
    cookieChangeListener();
    return () => {
      cookies.removeChangeListener(cookieChangeListener);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookieChangeListener])

  // Fetch current user
  const fetchCurrentUserDataAsync = useCallback(async () => {
    try {
      const response = await fetchCurrentUser();
      if (!response.data) {
        throw new Error("Cannot fetch current user in 'AuthContextProvider'");
      }
      setCurrentUser(response.data);
      setLoggedIn(true);
    } catch (error) {
      console.error("Failed to fetch & set the data for currentUser in 'AuthContextProvider'");
    }
  }, [])

  // useEffect for checking if user data should be fetched
  useEffect(() => {
    console.warn("cookieAuthState:", cookieAuthState, "currentUser", currentUser)
    if (cookieAuthState && !currentUser) {
      fetchCurrentUserDataAsync();
    }
  }, [cookieAuthState, currentUser, fetchCurrentUserDataAsync]);
  
  // for test
  useEffect(() => {
    console.group("AuthContextProvider")
    console.log("Logged-in:", loggedIn);
    console.log("User email", currentUser?.email);
    console.log("emailVerified", currentUser?.emailVerified);
    console.log("role", currentUser?.role);
    console.groupEnd();
  }, [currentUser, loggedIn])

  return (
    <Ctx.Provider value={{ loggedIn, currentUser }}>
      {children}
    </Ctx.Provider>
  )
}

export default AuthContextProvider;
