import React from "react";

function Product({ product,addCart }) {
  return (
    <div className="product-card">
      <div className="offer-badge">{product.discount_per}</div>
      <img src={product.poster} alt="Kiwi" className="product-image" />

      <h3 className="product-title">{product.name}</h3>
      <p className="product-quantity">1 Piece</p>

      <div className="price-row">
        <div>
          <span className="old-price">{"₹"+product.old_price}</span>
          <span className="new-price">{"₹"+product.price}</span>
        </div>
        <button className="add-btn" onClick={()=>addCart(product.id)}>Add</button>
      </div>
    </div>
  );
}

export { Product };
