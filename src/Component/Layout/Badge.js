import React from "react";
import { useSelector } from "react-redux";
import "./Badge.css";

const Badge = () => {
  // Extract cart items using Redux's useSelector hook
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  console.log("Total Quantity in Badge:", totalQuantity);

  return (
    <div className="badge">
      <div className="badge__icon"></div>
      <div className="badge__text">{totalQuantity}</div>
    </div>
  );
};

export default Badge;
