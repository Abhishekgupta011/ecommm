import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import cartContextApi from "../Context/CartContext";
import { useNavigate } from "react-router";

const Cart = (props) => {
  const ctx = useContext(cartContextApi);
  const navigate = useNavigate();
  const closeCartHandler = ()=>{
    navigate(-1);
  }
    console.log("contextcart" , ctx.cartItems)
  return (
    <Modal onClose={closeCartHandler}>
      <div className="cart-header">
        <h1>Cart</h1>
      </div>
      <div className="cart-content">
        {ctx.cartItems.length > 0 ? (
          ctx.cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{`${item.title} x ${item.quantity}`}</p>
              {/* <p>{`$${item.price * item.quantity}`}</p> */}
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
        <div className="cart-total">
          <h2>Total: ${ctx.totalAmount.toFixed(2)}</h2>
        </div>
        <button onClick={closeCartHandler}>Close</button>
      </div>
    </Modal>
  );
};

export default Cart;
