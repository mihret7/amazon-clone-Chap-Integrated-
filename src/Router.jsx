// import React from 'react'
import React from "react";

// import react router dom
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// import pages
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import PaymentNewChapa from "./Pages/Payment/PaymentNewChapa";
import Orders from "./Pages/Orders/Orders";
import OrderSuccess from "./Pages/Orders/OrderSuccess";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";


// protected route
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";



function Routing() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/payments"
          element={
            <ProtectedRoute
              message="You need to login to make a payment"
              redirect="/payments"
            >
              <PaymentNewChapa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              message="You need to login to view your orders"
              redirect="/orders"
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;