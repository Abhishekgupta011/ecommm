import React from "react";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Slices/CartSlice";
import "./Cart.css";
const Cart = (props) => {
  const items = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeCartHandler = () => {
    navigate(-1);
  };

  const deleteCartHandler = async (generatedId) => {
    const modifiedMail = localStorage.getItem("modifiedMail");
    try {
      const response = await fetch(
        `https://optimizedcode-cbd45-default-rtdb.firebaseio.com/product/${modifiedMail}/${generatedId}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        dispatch(cartActions.removeFromCart(generatedId));
        console.log(`Item with ID ${generatedId} deleted successfully.`);
      } else {
        console.error(`Failed to delete item with ID ${generatedId}.`);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Modal onClose={closeCartHandler}>
      <div className="cart-header">
        <h1>Cart</h1>
      </div>
      <div className="cart-content">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.generatedId} className="cart-item">
              <p>{`${item.title} x ${item.quantity}`}</p>
              <button onClick={() => deleteCartHandler(item.generatedId)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
        <div className="cart-total">
          <h2>Total: ${totalAmount.toFixed(2)}</h2>
        </div>
        <button onClick={closeCartHandler}>Close</button>
      </div>
    </Modal>
  );
};

export default Cart;
