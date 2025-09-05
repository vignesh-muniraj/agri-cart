import React, { useState } from "react";
import { AddCart } from "../Components/AddCart";

function AddCartList() {
  const [quantity, setQuantity] = useState(1);
   const [productsList, setProductsList] = useState([]);
    const [selectCategory, setselectCategory] = useState("All");

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  async function getProducts() {
    try {
      const response = await fetch("https://68b9551f6aaf059a5b572907.mockapi.io/cart/cart");
      const data = await response.json();
      console.log("response", response.status);
      if (response.status === 404) {
        throw new Error("Not found");
      }
      setProductsList(data);
    } catch (error) {
      console.log("Oops:", error);
    }
  }

  return (
    <div className="cart-container">
      {/* LEFT SIDE - Product List */}
      <div className="addcart">
            {productsList
          .filter(
            (product) => selectCategory === "All" || product.category === selectCategory
          )
          .map((product) => (
            <Product
              key={product.id}
              product={product}
              addCart={addCart}  // ✅ pass function down
            />
          ))}
        </div>
      

      <div className="deliver-form">
        <form>
          <h2>🚚 Delivery</h2>
          <input type="text" name="name" placeholder="Enter Name" />
          <input type="email" name="email" placeholder="Enter Email" />
          <input type="text" name="phone" placeholder="Enter Phone" />
          <input type="password" name="password" placeholder="Enter Password" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <input type="number" name="age" placeholder="Enter Age" />
          <textarea name="address" placeholder="Enter Address"></textarea>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export { AddCartList };

// https://68b9551f6aaf059a5b572907.mockapi.io/cart/cart