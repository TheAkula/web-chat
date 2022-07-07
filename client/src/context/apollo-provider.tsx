import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { memo, ReactNode, useMemo } from "react";
import { LocalStorageKeys } from "../constants";
import { onError } from "@apollo/client/link/error";
import { AuthActions, useAuthContext } from "./auth-context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

interface MyApolloProviderProps {
  children: ReactNode;
}

export const MyApolloProvider = memo(({ children }: MyApolloProviderProps) => {
  const { authDispatch, userToken } = useAuthContext();

  const httpLink = useMemo(
    () =>
      createHttpLink({
        uri: "http://localhost:4000/graphql",
      }),
    []
  );

  const wsLink = useMemo(() => {
    return new GraphQLWsLink(
      createClient({
        url: "ws://localhost:4000/graphql",
        shouldRetry(errOrCloseEvent) {
          return true;
        },
        connectionParams: {
          isWebSocket: true,
          authorization: "Bearer " + userToken,
        },
      })
    );
  }, [userToken]);

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
});
