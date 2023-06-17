import React from "react";
import ReactDOM from "react-dom/client";
import {

  BrowserRouter,
} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import GlobalStyle from "./theme/GlobalStyles";
import Theme from "./theme/Theme";
import { QueryClientProvider } from "react-query";
import queryClient from "./config/queryClient";
import "./index.css";
import "./i18n";
import { Provider as ProviderRedux } from "react-redux";
import Store from "./redux/store";

const store = Store();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProviderRedux store={store}>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>

          <GlobalStyle />
        </Theme>
      </QueryClientProvider>
    </ProviderRedux>
  </React.StrictMode>
);
