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
