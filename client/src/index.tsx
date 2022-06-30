import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./theme/global";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AuthContextProvider } from "./context/auth-context";
import { ModalContextProvider } from "./context/modal-context";
import { setContext } from "@apollo/client/link/context";
import { USER_TOKEN_KEY } from "./constants";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(USER_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <ModalContextProvider>
          <Router>
            <App />
            <GlobalStyles />
          </Router>
        </ModalContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
