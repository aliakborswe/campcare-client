import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./app/store";
import { ThemeProvider } from "./providers/theme-provider";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <AuthProvider>
          <BrowserRouter>
            <HelmetProvider>
              <AppRoutes />
              <ToastContainer position='bottom-right' />
            </HelmetProvider>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
