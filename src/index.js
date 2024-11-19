import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Component/Context/CartContext";
import { AuthContextProvider } from "./Component/Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Uncomment the following line if you want to measure performance
// import reportWebVitals from "./reportWebVitals";
// reportWebVitals(console.log);
