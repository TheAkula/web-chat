import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./theme/global";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AuthContextProvider } from "./context/auth-context";
import { ModalContextProvider } from "./context/modal-context";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
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
