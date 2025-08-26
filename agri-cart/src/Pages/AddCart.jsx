import React, { useState } from "react";

function AddCart() {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(quantity + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="cart-container">
      {/* LEFT SIDE - Product List */}
      <div className="addcart">
        {/* Product 1 */}
        <div className="shopping-bag">
          <img
            className="product-image"
            src="https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO497/1753521358798_grTz5.webp"
            alt="Product"
          />
          <div className="product-details">
            <p>Apple</p>
            <p>Quantity: 500gm</p>
            <p className="price">₹{390 * quantity}</p>
            <div className="actions">
              <div className="quantity-control">
                <button onClick={decreaseQty}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>+</button>
              </div>
            </div>
            <div className="links">
              <a href="#">Remove</a>
            </div>
          </div>
        </div>

        {/* Product 2 */}
        <div className="shopping-bag">
          <img
            className="product-image"
            src="https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO497/1753521358798_grTz5.webp"
            alt="Product"
          />
          <div className="product-details">
            <p>Banana</p>
            <p>Quantity: 1kg</p>
            <p className="price">₹{120 * quantity}</p>
            <div className="actions">
              <div className="quantity-control">
                <button onClick={decreaseQty}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>+</button>
              </div>
            </div>
            <div className="links">
              <a href="#">Remove</a>
            </div>
          </div>
        </div>

        {/* Product 3 */}
        <div className="shopping-bag">
          <img
            className="product-image"
            src="https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/product/PRO497/1753521358798_grTz5.webp"
            alt="Product"
          />
          <div className="product-details">
            <p>Orange</p>
            <p>Quantity: 1kg</p>
            <p className="price">₹{200 * quantity}</p>
            <div className="actions">
              <div className="quantity-control">
                <button onClick={decreaseQty}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>+</button>
              </div>
            </div>
            <div className="links">
              <a href="#">Remove</a>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
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

export { AddCart };
