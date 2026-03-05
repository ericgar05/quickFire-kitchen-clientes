import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MenuProvider } from "./context/MenuProvider";
import { CarProvider } from "./context/CarProvider.jsx";
import { OrderProvider } from "./context/OrderProvider.jsx";
import { AuthProvider } from "./context/AuthProvider";
import { NotificationProvider } from "./context/NotificationProvider";
import AppToaster from "./components/AppToaster";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <CarProvider>
            <NotificationProvider>
              <OrderProvider>
                <App />
              </OrderProvider>
            </NotificationProvider>
          </CarProvider>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
