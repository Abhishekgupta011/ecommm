import React, { useContext } from "react";
import cartContextApi from "../Context/CartContext";

const Badge = () => {
  const ctx = useContext(cartContextApi);
  const numberOfAddItems = ctx.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return (
    <div className="badge">
      <div className="badge__icon"></div>
      <div className="badge__text">{numberOfAddItems}</div>
    </div>
  );
};
export default Badge;
