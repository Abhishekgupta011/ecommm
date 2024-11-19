import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import cartContextApi from "../Context/CartContext";
import ElementsArray from "../ElementsArray";

const Review = () => {
  const ctx = useContext(cartContextApi);
  const params = useParams();
  const [rating, setRating] = useState("");

  const product = ctx.cartItems.find((item) => {
    console.log("Checking items:", ctx.cartItems); // Logs each item's ID
    console.log("Checking item ID:", item.id); // Logs each item's ID
    console.log("Checking params ID:", params.productId); // Logs each item's ID
    return item.id === params.productId;
  });
  console.log("Checking items:", ctx.cartItems); // Logs each item's ID
  if (!product) {
    return <div>Product not found</div>;
  }

  const ratingChangeHandler = (event) => {
    setRating(event.target.value);
  };

  return (
    <div className="review">
      <h2>Review for "product"</h2>
      <p>Write a review for this product</p>
      <form>
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={rating}
          onChange={ratingChangeHandler}
          aria-label="Rating"
        >
          <option value="" disabled>
            Select rating
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </form>
    </div>
  );
};

export default Review;
