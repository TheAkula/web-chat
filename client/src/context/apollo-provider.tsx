import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode, useMemo } from "react";
import { LocalStorageKeys } from "../constants";
import { onError } from "@apollo/client/link/error";
import { AuthActions, useAuthContext } from "./auth-context";

interface MyApolloProviderProps {
  children: ReactNode;
}

export const MyApolloProvider = ({ children }: MyApolloProviderProps) => {
  const { authDispatch } = useAuthContext();

  const httpLink = useMemo(
    () =>
      createHttpLink({
        uri: "http://localhost:4000/graphql",
      }),
    []
  );

  const authLink = useMemo(
    () =>
      setContext((_, { headers }) => {
        const token = localStorage.getItem(LocalStorageKeys.USER_TOKEN_KEY);

        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
          },
        };
      }),
    []
  );

  const errorLink = useMemo(
    () =>
      onError(({ networkError, graphQLErrors }) => {
        if (graphQLErrors) {
          authDispatch({ type: AuthActions.LOGOUT });
        }
      }),
    [authDispatch]
  );

  const client = useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([errorLink, authLink, httpLink]),
      }),
    [authLink, errorLink, httpLink]
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
