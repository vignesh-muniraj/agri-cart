import React, { useState, useEffect } from "react";
import { AddCart } from "../Components/AddCart";

function AddCartList() {
  const [productsList, setProductsList] = useState([]);

  // Fetch cart items
  async function getProducts() {
    try {
      const response = await fetch(
        "https://68b9551f6aaf059a5b572907.mockapi.io/cart/cart"
      );
      const data = await response.json();
      setProductsList(data);
    } catch (error) {
      console.log("Oops:", error);
    }
  }

  async function handleDelete(id) {
    try {
      await fetch(
        `https://68b9551f6aaf059a5b572907.mockapi.io/cart/cart/${id}`,
        { method: "DELETE" }
      );
      setProductsList(productsList.filter((item) => item.id !== id));
    } catch (error) {
      console.log("failed:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="cart-container">
      {/* Cart items */}
      <div className="addcart">
        {productsList.length > 0 ? (
          productsList.map((product) => (
            <AddCart key={product.id} product={product} onDelete={handleDelete} />
          ))
        ) : (
          <p>🛒 Your cart is empty</p>
        )}
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

