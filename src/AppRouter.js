import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import NotFound from "./modules/not-found/NotFound";

import StoreFront from "./modules/store-front/StoreFront";
import Cart from "./modules/cart/Cart";

export default function AppRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<StoreFront />} />
      <Route exact path="/cart" element={<Cart />} />

      {/* Fallback */}
      <Route exact path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}
