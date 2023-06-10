import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/AppRouter";
import GlobalStyle from "./theme/GlobalStyles";
import Theme from "./theme/Theme";
import { QueryClientProvider } from "react-query";
import queryClient from "./config/queryClient";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";
import { Provider } from "jotai";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
          <GlobalStyle />
        </Theme>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
