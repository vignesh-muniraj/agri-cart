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

  // ✅ Price calculations
  const totalItems = productsList.length;
  const totalQuantity = productsList.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const totalPrice = productsList.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-container">
      {/*left side */}
      <div className="addcart">
        {productsList.length > 0 ? (
          productsList.map((product) => (
            <AddCart key={product.id} product={product} onDelete={handleDelete} />
          ))
        ) : (
          <p>🛒 Your cart is empty</p>
        )}
      </div>

      {/* right side */}
      {productsList.length > 0 && (
        <div className="delivery-items">
          <h4>PRICE DETAILS</h4>
          <hr />

       
          <div className="price-row header">
            <span>Item name</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>

          
          {productsList.map((item) => (
            <div className="price-row" key={item.id}>
              <span className="item-name">{item.name}</span>
              <span>{item.quantity || 1}</span>
              <span>{(item.price || 0) * (item.quantity || 1)}</span>
            </div>
          ))}

      
          <div className="price-row summary">
            <span><strong>{totalItems} items</strong></span>
            <span><strong>{totalQuantity}</strong></span>
            <span><strong>Total: {totalPrice}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}

export { AddCartList };




// https://68b9551f6aaf059a5b572907.mockapi.io/cart/cart

//  <div className="deliver-form">
//         <form>
//           <h2>🚚 Delivery</h2>
//           <input type="text" name="name" placeholder="Enter Name" />
//           <input type="email" name="email" placeholder="Enter Email" />
//           <input type="text" name="phone" placeholder="Enter Phone" />
//           <input type="password" name="password" placeholder="Enter Password" />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//           />
//           <input type="number" name="age" placeholder="Enter Age" />
//           <textarea name="address" placeholder="Enter Address"></textarea>
//           <br />
//           <button type="submit">Submit</button>
//         </form>
//       </div>