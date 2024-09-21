import React, { createContext, useState, useEffect, useRef } from "react";
import { auth } from "../features/auth/api/auth";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const AuthenticationContext = createContext(false);

export const AuthenticationProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const accessTokenRef = useRef(null);
  const idTokenRef = useRef(null);
  const location = useLocation();

  const values = queryString.parse(location.search);
  const code = values.code ? values.code : null;
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    auth
      .validateUser({ signal })
      .then((response) => {
        console.log(response.status);
        setIsLoggedIn(true);
        console.log("update state");
      })
      .catch((error) => {
        console.log(error.response.status);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      // cancel the request before component unmounts
      console.log("cancel");
      controller.abort();
    };
  }, []);

  console.log(isLoggedIn);
  return (
    <AuthenticationContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        accessToken: accessTokenRef.current,
        idTokenRef
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
