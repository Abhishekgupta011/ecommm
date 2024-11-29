import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Component/Context/AuthContext";
import { Provider } from "react-redux";

import ReduxStore from "./Component/Store/ReduxStore";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Provider store = { ReduxStore }>
          <App />
        </Provider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Uncomment the following line if you want to measure performance
// import reportWebVitals from "./reportWebVitals";
// reportWebVitals(console.log);
