// // App.tsx or App.jsx
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// // Public pages
// import Index from "./pages/Index";
// import Shop from "./pages/Shop";
// import Payment from "./pages/Payment";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";

// // Admin auth pages
// import AdminLogin from "./pages/AdminLogin";
// import AdminResetPassword from "./pages/AdminResetPassword";

// // Admin protected components
// import PrivateAdminRoute from "./components/Admin/PrivateAdminRoute";
// import AdminDashboard from "./components/Admin/AdminDashboard";
// import AdminProductList from "./components/Admin/AdminProductList";
// import AdminProductForm from "./components/Admin/AdminProductForm";
// import AdminEditProduct from "./components/Admin/AdminEditProduct";
// import AdminContactList from "./components/Admin/AdminContactList";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Index />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Admin Auth Routes */}
//         <Route path="/admin/login" element={<AdminLogin />} />
//         <Route path="/admin/reset-password" element={<AdminResetPassword />} />

//         {/* Protected Admin Routes */}
//         <Route
//           path="/admin"
//           element={
//             <PrivateAdminRoute>
//               <AdminDashboard />
//             </PrivateAdminRoute>
//           }
//         >
//           <Route index element={<AdminProductList />} />
//           <Route path="products" element={<AdminProductList />} />
//           <Route path="products/add" element={<AdminProductForm />} />
//           {/* <Route path="products/edit/:id" element={<AdminEditProduct />} /> */}
//           <Route path="contacts" element={<AdminContactList />} />
//           <Route path="/admin/products/edit/:id" element={<AdminEditProduct />} />
// <Route path="/admin/products" element={<AdminProductList />} />
//         </Route>

//         {/* Catch-All Route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
// App.tsx or App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin auth pages
import AdminLogin from "./pages/AdminLogin";
import AdminResetPassword from "./pages/AdminResetPassword";
import AdminOrderlist from "./components/Admin/AdminOrderList";
import AdminPaymentMethodList from "./components/Admin/AdminPaymentMethodList";
// Admin protected components
import PrivateAdminRoute from "./components/Admin/PrivateAdminRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminProductList from "./components/Admin/AdminProductList";
import AdminProductForm from "./components/Admin/AdminProductForm";
import AdminEditProduct from "./components/Admin/AdminEditProduct";
import AdminContactList from "./components/Admin/AdminContactList";
import CartPage from "./pages/CartPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
<Route path="/cart" element={<CartPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />

        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        >
          <Route index element={<AdminProductList />} />
          <Route path="products" element={<AdminProductList />} />
          <Route path="orders" element={<AdminOrderlist />} />
          <Route path="payment-methods" element={<AdminPaymentMethodList/>} />
          <Route path="products/add" element={<AdminProductForm />} />
          <Route path="products/edit/:id" element={<AdminEditProduct />} />
          <Route path="contacts" element={<AdminContactList />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
