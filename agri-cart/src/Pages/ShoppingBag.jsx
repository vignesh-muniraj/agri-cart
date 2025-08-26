import React, { useState } from "react";

function ShoppingBag() {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="shopping-bag">
      <img
        className="product-image"
        src="https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/sample_shoe.png"
        alt="Leather Oxfords"
      />

      <div className="product-details">
        <h3 className="product-title">Grand Cap Toe Leather Oxfords</h3>
        <p>Size: 7.5</p>
        <p>Color: Brown</p>
        <p>Style: Regular</p>

        <div className="actions">
          <div className="quantity-control">
            <button onClick={decreaseQty}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQty}>+</button>
          </div>
          <p className="price">${390.0 * quantity}.00</p>
        </div>

        <div className="delivery">
          <span>🚚 Ship to an address</span>
          <button className="pickup-btn">Pick this up</button>
        </div>

        <div className="links">
          <a href="#">Move to Wishlist</a>
          <a href="#">Remove</a>
        </div>
      </div>
    </div>
  );
}

export  {ShoppingBag};
