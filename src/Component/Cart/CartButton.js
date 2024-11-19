// CartButton.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Badge from "../Layout/Badge";
import Cart from "../Cart/Cart";

const CartButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cartOpenHandler = () => {
    navigate("/cart"); // Navigate to the cart route to open the cart
  };

  const closeCartHandler = () => {
    navigate(-1); // Navigate back to close the cart
  };

  return (
    <div className="cart-button">
      <button onClick={cartOpenHandler}>
        Cart <Badge />
      </button>

      {/* Render Cart only when the route is '/cart' */}
      {location.pathname === "/cart" && <Cart onClose={closeCartHandler} />}
    </div>
  );
};

export default CartButton;
