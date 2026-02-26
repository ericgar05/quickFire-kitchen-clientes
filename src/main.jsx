import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MenuProvider } from "./context/MenuProvider";
import { CarProvider } from "./context/CarProvider.jsx";
import { OrderProvider } from "./context/OrderProvider.jsx";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MenuProvider>
        <CarProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </CarProvider>
      </MenuProvider>
    </BrowserRouter>
  </StrictMode>,
);
