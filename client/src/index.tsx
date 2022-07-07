import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyles } from "./theme/global";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { ModalContextProvider } from "./context/modal-context";
import { AppContextProvider } from "./context/app-context";
import { MyApolloProvider } from "./context/apollo-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <MyApolloProvider>
      <AppContextProvider>
        <ModalContextProvider>
          <Router>
            <App />
            <GlobalStyles />
          </Router>
        </ModalContextProvider>
      </AppContextProvider>
    </MyApolloProvider>
  </AuthContextProvider>
);
