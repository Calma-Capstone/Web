import React from "react";
import { authReducer, initialState } from "../Reducer/AuthReducer";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token !== null) {
      dispatch({
        type: "LOGIN",
        payload: { token: token.replace(/['"]+/g, "") },
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
