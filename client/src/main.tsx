import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apolloClient.ts";
import { ApolloProvider } from "@apollo/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
