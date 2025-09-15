import React from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { IconButton } from "@mui/material";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
function Product({ product, addCart, onDelete }) {
  const role = localStorage.getItem("role");
  const status = product.status;
  return (
    <div className="product-card">
      {/*<div className="offer-badge">Brand</div>*/}
      <p>{status}</p>
      <img src={product.poster} alt={product.name} className="product-image" />

      <h3 className="product-title">{product.name}</h3>
      <p className="product-quantity">{product.quantity || "1 Piece"}</p>

      <div className="product-price-row">
        <div>
          {/* <span className="old-price">{"₹" + product.old_price}</span> */}
          <span className="new-price">{"₹" + product.price}</span>
        </div>
        {status == "inactive" ? (
          <IconButton className="out-of-stock">
          <p>out of stock</p>
            <ProductionQuantityLimitsIcon />
          </IconButton>
        ) : (
          <button className="add-btn" onClick={() => addCart(product)}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export { Product };
