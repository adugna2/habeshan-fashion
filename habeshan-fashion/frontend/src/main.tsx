// import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import { AdminAuthProvider } from "./auth/AdminAuthContext";
// import { CartProvider } from "./context/CartContext"; // ✅ import CartProvider
// import "./index.css";

// createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <AdminAuthProvider>
//       <CartProvider> {/* ✅ Wrap App with CartProvider */}
//         <App />
//       </CartProvider>
//     </AdminAuthProvider>
//   </React.StrictMode>
// );// src/index.tsx (or main.tsx)
import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot if React 18+
import App from "./App";
import { AdminAuthProvider } from "./auth/AdminAuthContext"; // Import your AdminAuthProvider
import { CartProvider } from "./context/CartContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <AdminAuthProvider> {/* <--- THIS IS CRUCIAL */}
      <CartProvider>
        <App />
      </CartProvider>
    </AdminAuthProvider>
  </React.StrictMode>
);