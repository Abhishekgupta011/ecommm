import { createSlice } from "@reduxjs/toolkit";

const initialCart = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  status: "idle", // To track fetch status (idle, loading, succeeded, failed)
  error: null,    // To store any error messages
};

// Helper function to calculate totals
const calculateTotals = (cartItems) => {
  console.log("cartItems: cart", cartItems); // Logging the cart items for debugging
  return {
    totalAmount: cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ),
    totalQuantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
  };
};

const CartSlice = createSlice({
  name: "cart",
  initialState: initialCart,
  reducers: {
    // Initialize cart
    initialCart(state, action) {
      const { totalAmount, totalQuantity } = calculateTotals(action.payload);
      state.cartItems = action.payload || [];
      state.totalQuantity = totalQuantity || 0;
      state.totalAmount = totalAmount || 0;

      console.log("Initial Cart Loaded:", state);
    },

    // Add item to cart
    addToCart(state, action) {
      const newItem = action.payload;
      console.log("newItem", newItem.quantity);

      // Use generatedId instead of id to identify the product
      const existingItem = state.cartItems.find(
        (item) => item.generatedId === newItem.generatedId
      );

      if (existingItem) {
        // If the product already exists, update the quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If it's a new product, add it to the cart
        state.cartItems.push({ ...newItem });
      }

      // Recalculate totals
      const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;

      console.log("Updated Cart Items:", state.cartItems);
      console.log("Total Quantity:", state.totalQuantity);
      console.log("Total Amount:", state.totalAmount);
    },

    // Update cart (e.g., update product quantity)
    updateCart(state, action) {
      const updatedProduct = action.payload;
      
      // Use generatedId to identify the product to update
      const existingItem = state.cartItems.find(
        (item) => item.generatedId === updatedProduct.generatedId
      );

      if (existingItem) {
        // Update the quantity of the existing product
        existingItem.quantity = updatedProduct.quantity;
      } else {
        console.warn(`Item with ID ${updatedProduct.generatedId} not found.`);
      }

      // Recalculate totals
      const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;

      console.log("Cart Updated:", state.cartItems);
      console.log("New Total Amount:", state.totalAmount);
      console.log("New Total Quantity:", state.totalQuantity);
    },

    // Placeholder for removing items from the cart
    removeFromCart(state, action) {
      const idToRemove = action.payload;
      const updatedCartItems = state.cartItems.filter(item => item.generatedId !== idToRemove);
      state.cartItems = updatedCartItems;

      // Recalculate totals after item removal
      const { totalAmount, totalQuantity } = calculateTotals(state.cartItems);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;

      console.log("Updated Cart after removal:", state.cartItems);
      console.log("New Total Amount:", state.totalAmount);
      console.log("New Total Quantity:", state.totalQuantity);
    },
    setStatus(state, action) {
      // Update status for fetch lifecycle
      state.status = action.payload.status;
      state.error = action.payload.error || null;
    },
  },
});

// Custom thunk for fetching cart data
export const fetchCartData = (modifiedMail) => {
  return async (dispatch) => {
    dispatch(cartActions.setStatus({ status: "loading" }));

    try {
      const response = await fetch(
        `https://optimizedcode-cbd45-default-rtdb.firebaseio.com/product/${modifiedMail}.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart data.");
      }

      const cartData = await response.json();

      const cartItemsArray = Array.isArray(cartData)
        ? cartData
        : Object.values(cartData || {});


      // Dispatch actions to update state
      dispatch(
        cartActions.initialCart( cartItemsArray )
      );
      dispatch(cartActions.setStatus({ status: "succeeded" }));
    } catch (error) {
      dispatch(cartActions.setStatus({ status: "failed", error: error.message }));
    }
  };
};

export const cartActions = CartSlice.actions;
export default CartSlice.reducer;
