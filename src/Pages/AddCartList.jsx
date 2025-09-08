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
      setProductsList(data.map(item => ({ ...item, count: item.count || 1 })));
      // console.log("🔥🔥🔥🔥🔥🔥🔥")
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

  function handleQuantityChange(id, newCount) {
    setProductsList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, count: newCount } : item
      )
    );
  }

  useEffect(() => {
    getProducts();
  }, []);

  // ✅ Price calculations
  const totalItems = productsList.length;
  const totalQuantity = productsList.reduce(
    (sum, item) => sum + (item.count || 1),
    0
  );
  const totalPrice = productsList.reduce(
    (sum, item) => sum + (item.price || 0) * (item.count || 1),
    0
  );

  return (
    <div className="cart-container">
      {/* Left side */}
      <div className="addcart">
        {productsList.length > 0 ? (
          productsList.map((product) => (
            <AddCart
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onQuantityChange={handleQuantityChange}
            />
          ))
        ) : (
          <p>🛒 Your cart is empty</p>
        )}
      </div>

      {/* Right side */}
      {productsList.length > 0 && (
        <div className="delivery-items">
          <h4>Summary</h4>
          <hr />

          <div className="price-row header">
            <span>Item name</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>

          {productsList.map((item) => (
            <div className="price-row" key={item.id}>
              <span className="item-name">{item.name}</span>
              <span>{item.count}</span>
              <span>₹{item.price * item.count}</span>
            </div>
          ))}

          <div className="price-row summary">
            <span>
              <strong>{totalItems} items</strong>
            </span>
            <span>
              <strong>{totalQuantity}</strong>
            </span>
            <span>
              <strong>Total: ₹{totalPrice}</strong>
            </span>
          </div>

     
          <button className="checkout-btn">
             Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export { AddCartList };
