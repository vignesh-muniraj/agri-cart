import React, { useState, useEffect } from "react";
import { AddCart } from "../Components/AddCart";
import { API } from "./Global";

function AddCartList() {
  const [productsList, setProductsList] = useState([]);
  const user_id = localStorage.getItem("id"); // ✅ user_id from login

  // ✅ Fetch cart items for logged in user
  async function getProducts() {
    if (!user_id) {
      console.log("⚠️ User not logged in");
      return;
    }
    try {
      const response = await fetch(`${API}/cart/${user_id}`);
      const data = await response.json();
      setProductsList(data.map((item) => ({ ...item, count: item.count || 1 })));
    } catch (error) {
      console.log("Oops:", error);
    }
  }

  // ✅ Delete cart item from backend
  async function handleDelete(id) {
    try {
      await fetch(`${API}/cart/${id}`, {
        method: "DELETE",
      });
      setProductsList(productsList.filter((item) => item.id !== id));
    } catch (error) {
      console.log("failed:", error);
    }
  }

  // ✅ Update quantity (PUT request to backend)
  async function handleQuantityChange(id, newCount) {
    console.log("🔥🔥🔥🔥🔥🔥"+newCount)
    try {
      await fetch(`${API}/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: newCount }),
      });

      setProductsList((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, count: newCount } : item
        )
      );
    } catch (error) {
      console.log("failed:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // ✅ Price calculations
  const totalItems = productsList.length;
  const totalQuantity = productsList.reduce(
    (sum, item) => sum + (parseInt(item.count) || 1),
    0
  );
  const totalPrice = productsList.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * (parseInt(item.count) || 1),
    0
  );

  // Fake discount & coupon for UI
  const discount = 0;
  const coupon = 0;
  const deliveryFee = 0;
  const finalAmount = totalPrice - discount - coupon + deliveryFee;
  const totalSaved = discount + coupon;

  return (
    <div className="cart-container">
      {/* Left side */}
      <div className="cart-left">
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
          <p className="empty-cart">🛒 Your cart is empty</p>
        )}
      </div>

      {/* Right side - Flipkart style */}
      {productsList.length > 0 && (
        <div className="cart-right">
          <h4 className="price-title">PRICE DETAILS</h4>
          <hr />

          <div className="price-row">
            <span>Price ({totalItems} items)</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="price-row green">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>
          <div className="price-row green">
            <span>Coupons</span>
            <span>- ₹{coupon}</span>
          </div>
          <div className="price-row">
            <span>Platform Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <hr />
          <div className="price-row total">
            <span>Total Amount</span>
            <span>₹{finalAmount}</span>
          </div>
          <p className="saved">You will save ₹{totalSaved} on this order</p>
        </div>
      )}
    </div>
  );
}

export { AddCartList };
