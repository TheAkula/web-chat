import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode, useMemo } from "react";
import { LocalStorageKeys } from "../constants";
import { onError } from "@apollo/client/link/error";
import { AuthActions, useAuthContext } from "./auth-context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { getMainDefinition } from "@apollo/client/utilities";

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

  const wsLink = useMemo(
    () =>
      new WebSocketLink(
        new SubscriptionClient("ws://localhost:4000/graphql", {
          reconnect: true,
        })
      ),
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
          // authDispatch({ type: AuthActions.LOGOUT });
        }
      }),
    [authDispatch]
  );

  const link = useMemo(
    () =>
      split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink
      ),
    [httpLink, wsLink]
  );

  const client = useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(link),
      }),
    [authLink, link]
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
