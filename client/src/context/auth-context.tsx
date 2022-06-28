import React, { Reducer, useContext, useReducer } from "react";
import { USER_TOKEN_KEY } from "../constants";
import { AuthContextType } from "../types";

interface AuthAction {
  type: AuthActions;
  payload: any;
}

type AuthContextValue = {
  authDispatch: React.Dispatch<AuthAction>;
} & AuthContextType;

const initialState: AuthContextType = {
  id: "",
  firstName: "",
  lastName: "",
  userToken: window.localStorage.getItem(USER_TOKEN_KEY) || "",
  email: "",
};

const AuthContext = React.createContext<AuthContextValue>({
  ...initialState,
  authDispatch: () => {},
});

export enum AuthActions {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
  LOGOUT = "LOGOUT",
  ACTIVATE_USER = "ACTIVATE_USER",
}

const reducer: Reducer<AuthContextType, AuthAction> = (state, action) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        ...action.payload,
      };
    case AuthActions.SIGNUP:
      return {
        ...action.payload,
      };
    default:
      throw new Error(`Invalid action type: "${action.type}"`);
  }
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authState, authDispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ ...authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
