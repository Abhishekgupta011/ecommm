import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  elementsArray: [],
};
const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    initiaProduct(state) {
      state.elementsArray = [
        {
          id: 1,
          title: "Colors",
          price: 100,
          imageUrl:
            "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
        },

        {
          id: 2,
          title: "Black and white Colors",
          price: 50,
          imageUrl:
            "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
        },

        {
          id: 3,
          title: "Yellow and Black Colors",
          price: 70,
          imageUrl:
            "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
        },
      ];
    },
  },
});
export const productActions = ProductSlice.actions;
export default ProductSlice.reducer;
