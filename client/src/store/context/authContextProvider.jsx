import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Uvc from 'universal-cookie';
import { fetchCurrentUser, refreshAuthToken } from '../../api/user.js';
import { jwtDecode } from 'jwt-decode';

const Ctx = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
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
  const [authTokenExpiry, setAuthTokenExpiry] = useState(null);
  const [error, setError] = useState(null);

  // Check the Auth-state from cookies
  const cookieChangeListener = useCallback((ccl) => {
    console.log("Cookies updated", ccl)

    // cookieChangeListener is manually triggered, check the 🍪
    if (!ccl) {
      const c = cookies.get("auth_state");
      if (c) {
        setCookieAuthState(true);
        const decoded = jwtDecode(c);
        setAuthTokenExpiry(new Date(decoded.exp * 1000))
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
      setAuthTokenExpiry(new Date(jwtDecode(ccl).exp * 1000))
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

  const refreshOrRemoveTokenIfNeeded = useCallback(() => {
    const now = new Date();
    if (authTokenExpiry) {
      const timeLeft = authTokenExpiry.getTime() - now.getTime();
      const refreshThreshold = (authTokenExpiry.getTime() - new Date(authTokenExpiry.getTime() - authTokenExpiry.getTime() / 6).getTime());

      if (timeLeft <= 1000 * 60 * 4) {
        cookies.remove("auth_state");
        setLoggedIn(false);
        setCurrentUser(undefined);
        setCookieAuthState(false);
        setAuthTokenExpiry(null);
      } else if (timeLeft <= refreshThreshold) {
        refreshAuthToken()
          .then(() => {
            console.log("auth token was refreshed.");
          })
          .catch(setError);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authTokenExpiry])

  useEffect(() => {
    const interval = setInterval(() => {
      refreshOrRemoveTokenIfNeeded();
    }, 1000 * 60 * 5);
    return () => clearInterval(interval)
  }, [refreshOrRemoveTokenIfNeeded])

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

  if (error) {
    throw error;
  }

  return (
    <Ctx.Provider value={{ loggedIn, currentUser }}>
      {children}
    </Ctx.Provider>
  )
}

export default AuthContextProvider;
