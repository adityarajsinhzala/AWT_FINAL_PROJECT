import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductProvider } from "./context/productContext";
import { CartProvider } from "./context/cartContext";
import { AuthContextProvider } from "./context/AuthContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </AuthContextProvider>
  </StrictMode>,
);
