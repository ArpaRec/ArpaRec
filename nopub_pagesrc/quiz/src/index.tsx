import { ThemeProvider } from "styled-components";
// Use HashRouter because of GH Pages
// https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import GlobalStyle from "./styles/GlobalStyle";
import ReactDOM from "react-dom/client";
import theme from "./styles/Theme";
import React from "react";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <GlobalStyle></GlobalStyle>
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
