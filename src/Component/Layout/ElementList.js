import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Slices/CartSlice";
import ElementsArray from "../ElementsArray";
import "./ElementList.css";
const ElementList = () => {
  const dispatch = useDispatch();
  const modifiedMail = localStorage.getItem("modifiedMail");
  const items = useSelector((state) => state.cart.cartItems);

  const firebaseBaseUrl = `https://optimizedcode-cbd45-default-rtdb.firebaseio.com/product/${modifiedMail}`;

  const updateProductInFirebase = async (generatedId, updatedProduct) => {
    try {
      const response = await fetch(`${firebaseBaseUrl}/${generatedId}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to update product in Firebase.");
      }

      dispatch(cartActions.updateCart(updatedProduct));
      console.log("Product updated successfully:", updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const addNewProductToFirebase = async (transformedObject) => {
    try {
      const response = await fetch(`${firebaseBaseUrl}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformedObject),
      });

      if (!response.ok) {
        throw new Error("Failed to add new product to Firebase.");
      }

      const responseData = await response.json();
      const uniqueId = responseData.name;

      const newProduct = { ...transformedObject, generatedId: uniqueId };
      await updateProductInFirebase(uniqueId, newProduct); // Add the generatedId
      dispatch(cartActions.addToCart(newProduct));
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  const addProductHandler = (item) => {
    const existingProduct = items.find((product) => product.id === item.id);

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
      };
      updateProductInFirebase(existingProduct.generatedId, updatedProduct);
    } else {
      const transformedObject = { ...item, quantity: 1 };
      addNewProductToFirebase(transformedObject);
    }
  };

  return (
    <section>
      <ul className="element-list">
        {ElementsArray.map((item) => (
          <li key={item.id} className="element-item">
            <NavLink to={`/store/${item.generatedId}`}>
              {item.title || "Untitled"}
            </NavLink>
            <p>
              {item.price ? `$${item.price.toFixed(2)}` : "Price not available"}
            </p>
            <img
              src={item.imageUrl || "placeholder.jpg"}
              alt={item.title || "Untitled"}
              className="element-image"
            />
            <button onClick={() => addProductHandler(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ElementList;
