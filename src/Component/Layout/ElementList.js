import React, { useContext } from "react";
import ElementsArray from "../ElementsArray";
import cartContextApi from "../Context/CartContext";
import { NavLink } from "react-router-dom";

const ElementList = () => {
  const ctx = useContext(cartContextApi);
  const modifiedMail = localStorage.getItem("modifiedMail");

  const addProductHandler = async (item) => {
    console.log("Add product button clicked:", item);

    const transformedObject = {
      ...item,
      quantity: 1,
    };
    
    const existingProduct = ctx.cartItems.find(
      (product) => product.id === item.id
    );
      console.log("existingProduct" , existingProduct)
    if (existingProduct) {
      // Update quantity for existing product
      const updatedProduct = {
        ...item,
        quantity: existingProduct.quantity + 1,
      };

      try {
        const response = await fetch(
          `https://optimizedcode-cbd45-default-rtdb.firebaseio.com/product/${modifiedMail}/${updatedProduct.id}.json`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
          }
        );

        if (response.ok) {
          console.log("Product quantity updated successfully:", updatedProduct);
          ctx.updateProduct(updatedProduct); // Update context
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    } else {
      // Add new product
      try {
        // POST request to Firebase
        const response = await fetch(
          `https://optimizedcode-cbd45-default-rtdb.firebaseio.com/product/${modifiedMail}.json`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transformedObject),
          }
        );

        // if (response.ok) {
        //   const responseData = await response.json();
        //   const uniqueId = responseData.name; // Retrieve the generated ID

        //   // Construct the new product with the Firebase-generated ID
        //   const newProduct = {
        //     ...transformedObject,
        //     id: uniqueId,
        //   };

        //   // Save the product using its unique ID (PUT request)
        //   const newProductResponse = await fetch(
        //     `https://optimizedcode-cbd45-default-rtdb.firebaseio.com/product/${modifiedMail}/${uniqueId}.json`,
        //     {
        //       method: "PUT",
        //       headers: { "Content-Type": "application/json" },
        //       body: JSON.stringify(newProduct),
        //     }
        //   );

          if (response.ok) {
            //console.log("New product posted successfully:", newProduct);
            ctx.addProduct(transformedObject); // Update context
            
          }
        // }
      } catch (error) {
        console.error("Error adding new product:", error);
      }
    }
  };
  console.log("Current cart items:", ctx.cartItems);
  return (
    <section>
      <h1>Element List</h1>
      <ul className="element-list">
        {ElementsArray.map((item) => (
          <li key={item.id} className="element-item">
            <NavLink to={`/store/${item.id}`}>
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
