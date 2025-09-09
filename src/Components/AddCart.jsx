import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

function AddCart({ product, onDelete, onQuantityChange }) {
  const [error, setError] = useState("");

  return (
    <div className="cart-item">
      <img src={product.poster} alt={product.name} className="cart-img" />

      <div className="cart-info">
        <h3>{product.name}</h3>
        <p>{product.quantity}</p>
        <p className="cart-price">₹{product.price}</p>
         {error && <p className="error">{error}</p>}
   </div>
        {/* Quantity buttons */}
        <div className="cart-qty">
          <IconButton
            onClick={() => {
              if (product.count > 1) {
                onQuantityChange(product.id, product.count - 1);
                setError("");
              } else {
                setError("Minimum 1 required");
              }
            }}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>

          <span>{product.count}</span>

          <IconButton
            onClick={() => {
              onQuantityChange(product.id, product.count + 1);
              setError("");
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          </div>
         
          <div className="cart-actions">
          <p> ₹{product.price * product.count}</p>
          <IconButton onClick={() => onDelete(product.id)} color="error">
          <RemoveShoppingCartIcon />
          </IconButton>
          </div>
    </div>
  );
}

export { AddCart };
