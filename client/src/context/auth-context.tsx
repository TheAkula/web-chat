import React, { memo, Reducer, useContext, useMemo, useReducer } from "react";
import { LocalStorageKeys } from "../constants";
import { AuthContextType } from "../types";

interface AuthAction {
  type: AuthActions;
  payload?: any;
}

type AuthContextValue = {
  authDispatch: React.Dispatch<AuthAction>;
} & AuthContextType;

const initialState: AuthContextType = {
  id: "",
  firstName: "",
  lastName: "",
  userToken: window.localStorage.getItem(LocalStorageKeys.USER_TOKEN_KEY) || "",
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
    case AuthActions.LOGOUT:
      localStorage.setItem(LocalStorageKeys.USER_TOKEN_KEY, "");
      return {
        ...initialState,
      };
    default:
      throw new Error(`Invalid action type: "${action.type}"`);
  }
};

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = memo(
  ({ children }: AuthContextProviderProps) => {
    const [authState, authDispatch] = useReducer(reducer, initialState);

    const value: AuthContextValue = useMemo(
      () => ({ ...authState, authDispatch }),
      [authState]
    );

    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }
);

export const useAuthContext = () => useContext(AuthContext);
