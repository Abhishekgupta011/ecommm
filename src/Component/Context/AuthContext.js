import React, { useEffect, useReducer } from "react";

// Context for authentication
const AuthContextApi = React.createContext({
  token: null,
  isLoggedIn: false,
  onLogin: (token) => {},
  onLogout: () => {},
});

// Initial state setup
const initialState = {
  token: localStorage.getItem("token") || null,
  expirationTime: localStorage.getItem("expirationTime") || null,
};

// Reducer function to manage auth state
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.payload.token,
        expirationTime: action.payload.expirationTime,
      };
    case "LOGOUT":
      return { token: null, expirationTime: null };
    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const userIsLoggedIn =
    !!state.token && new Date().getTime() < state.expirationTime;
    console.log("!!state.token" , !!state.token)
  // Login handler: stores token and expiration time in state and localStorage
  const onLogin = (token) => {
    const expirationTime = new Date().getTime() + 20 * 60 * 1000; // 5 minutes from now
    dispatch({ type: "LOGIN", payload: { token, expirationTime } });
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
  };

  // Logout handler: clears token from state and localStorage
  const onLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const currentTime = new Date().getTime();
      if (state.expirationTime && currentTime >= state.expirationTime) {
        onLogout(); // Automatically log out if the token has expired
      }
    };

    checkTokenExpiration(); // Check expiration on mount
    const interval = setInterval(checkTokenExpiration, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [state.expirationTime]);

  return (
    <AuthContextApi.Provider
      value={{
        token: state.token,
        isLoggedIn: userIsLoggedIn,
        onLogin,
        onLogout,
      }}
    >
      {props.children}
    </AuthContextApi.Provider>
  );
};

export default AuthContextApi;
