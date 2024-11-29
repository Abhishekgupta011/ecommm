import React, { useContext, useEffect, useReducer } from "react";
import AuthContextApi from "./AuthContext";

// Create the cart context
const cartContextApi = React.createContext({
  cartItems: [],
  addProduct: (item) => {},
  removeProduct: (id) => {},
  updateProduct: (item) => {},
  totalAmount: 0,
  totalQuantity: 0,
});

// Helper function to calculate totals
const calculateTotals = (cartItems) => ({
  totalAmount: cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ),
  totalQuantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
});

// Function to update cart data on the server
const updateCartOnServer = async (cartItems) => {
  const modifiedMail = localStorage.getItem("modifiedMail");
  if (!modifiedMail) return;

  try {
    await fetch(
      `https://optimizedcode-cbd45-default-rtdb.firebaseio.com/product/${modifiedMail}.json`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          cartItems.reduce((acc, item) => {
            acc[item.id] = { ...item, id: undefined }; // Remove id as Firebase uses it as the key
            return acc;
          }, {})
        ),
      }
    );
    console.log("Cart updated on server successfully.");
  } catch (error) {
    console.error("Error updating cart on server:", error);
  }
};

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case "INITIALCART": {
      const { totalAmount, totalQuantity } = calculateTotals(action.products);
      return {
        ...state,
        cartItems: action.products,
        totalAmount,
        totalQuantity,
      };
    }

    case "ADD_PRODUCT": {
      const existingCartIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems;
      if (existingCartIndex !== -1) {
        updatedItems = state.cartItems.map((item, index) =>
          index === existingCartIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.cartItems, action.payload];
      }

      const { totalAmount, totalQuantity } = calculateTotals(updatedItems);

      // Call the server update function
      updateCartOnServer(updatedItems);

      return {
        ...state,
        cartItems: updatedItems,
        totalAmount,
        totalQuantity,
      };
    }

    case "UPDATE_PRODUCT": {
      const updatedItems = state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      const { totalAmount, totalQuantity } = calculateTotals(updatedItems);

      // Call the server update function
      updateCartOnServer(updatedItems);

      return {
        ...state,
        cartItems: updatedItems,
        totalAmount,
        totalQuantity,
      };
    }

    case "REMOVE_PRODUCT": {
      const updatedItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      const { totalAmount, totalQuantity } = calculateTotals(updatedItems);

      // Call the server update function
      updateCartOnServer(updatedItems);

      return {
        ...state,
        cartItems: updatedItems,
        totalAmount,
        totalQuantity,
      };
    }

    default:
      return state;
  }
};

// Initial state for the cart
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

// CartProvider component
export const CartProvider = (props) => {
  const [cartState, dispatchCartActions] = useReducer(
    cartReducer,
    initialState
  );
  const authCtx = useContext(AuthContextApi);

  useEffect(() => {
    const getProducts = async () => {
      const currentMail = localStorage.getItem("mail");
      if (!currentMail || !authCtx.isLoggedIn) return;

      const modifiedMail = currentMail.replace(/[@.]/g, "_");
      localStorage.setItem("modifiedMail", modifiedMail);

      try {
        const response = await fetch(
          `https://optimizedcode-cbd45-default-rtdb.firebaseio.com/product/${modifiedMail}.json`
        );

        if (!response.ok) throw new Error("Failed to fetch products.");

        const products = await response.json();

        const productsArray = Object.entries(products || {}).map(
          ([key, value]) => ({
            ...value,
            id: key, // Attach the key (e.g., -OC3TkbpKxvEjjNy7Jew) as the id
          })
        );

        if (productsArray.length > 0) {
          dispatchCartActions({ type: "INITIALCART", products: productsArray });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [authCtx.isLoggedIn]);

  const cartStateObject = {
    cartItems: cartState.cartItems,
    addProduct: (item) =>
      dispatchCartActions({ type: "ADD_PRODUCT", payload: item }),
    removeProduct: (id) =>
      dispatchCartActions({ type: "REMOVE_PRODUCT", payload: { id } }),
    updateProduct: (item) =>
      dispatchCartActions({ type: "UPDATE_PRODUCT", payload: item }),
    totalAmount: cartState.totalAmount,
    totalQuantity: cartState.totalQuantity,
  };

  return (
    <cartContextApi.Provider value={cartStateObject}>
      {props.children}
    </cartContextApi.Provider>
  );
};

export default cartContextApi;