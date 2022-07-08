import React, {
  memo,
  Reducer,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { LocalStorageKeys } from "../constants";
import { MyUserInfoQuery, useMyUserInfoLazyQuery } from "../generated/graphql";

type AuthContextValue = {
  changeUserToken: (s: string) => void;
  userToken: string | null;
  changeAuthData: (s: MyUserInfoQuery["myUserInfo"]) => void;
} & Partial<MyUserInfoQuery["myUserInfo"]>;

const initialState: MyUserInfoQuery["myUserInfo"] = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
};

const AuthContext = React.createContext<AuthContextValue>({
  ...initialState,
  userToken: null,
  changeUserToken(s) {},
  changeAuthData(s) {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = memo(
  ({ children }: AuthContextProviderProps) => {
    const [userToken, setUserToken] = useState(
      localStorage.getItem(LocalStorageKeys.USER_TOKEN_KEY) || ""
    );

    const [authData, setAuthData] = useState<MyUserInfoQuery["myUserInfo"]>();

    useEffect(() => {
      if (userToken) {
      }
    }, [userToken]);

    const changeUserToken = (s: string) => {
      setUserToken(s);
    };

    const changeAuthData = (data: MyUserInfoQuery["myUserInfo"]) => {
      setAuthData(data);
    };

    const value: AuthContextValue = useMemo(
      () => ({ userToken, ...authData, changeUserToken, changeAuthData }),
      [authData, userToken]
    );

    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }
);

export const useAuthContext = () => useContext(AuthContext);
