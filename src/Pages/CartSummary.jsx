import React from "react";

function CartPage({ cartItems }) {
  // Calculate totals
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = 300; // example discount
  const coupon = 100;   // example coupon
  const platformFee = 9;
  const finalAmount = totalPrice - discount - coupon + platformFee;

  return (
    <div className="cart-page">
      {/* Left Side - Cart Items */}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-row">
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>{item.weight}</p>
              <div className="price-row">
                <span className="final-price">₹{item.price}</span>
                <span className="original-price">₹{item.mrp}</span>
                <span className="discount">{item.discount}% Off</span>
              </div>
              <div className="qty-controls">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side - Price Details */}
      <div className="price-details">
        <h3>PRICE DETAILS</h3>
        <div className="price-row">
          <span>Price ({totalItems} items)</span>
          <span>₹{totalPrice}</span>
        </div>
        <div className="price-row green-text">
          <span>Product Discount</span>
          <span>-₹{discount}</span>
        </div>
        <div className="price-row green-text">
          <span>Coupons for you</span>
          <span>-₹{coupon}</span>
        </div>
        <div className="price-row">
          <span>Platform Fee</span>
          <span>₹{platformFee}</span>
        </div>
        <hr />
        <div className="price-row total">
          <span>Total Amount</span>
          <span>₹{finalAmount}</span>
        </div>
        <p className="savings">
          You will save ₹{discount + coupon} on this order
        </p>

        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}

export default CartPage;
