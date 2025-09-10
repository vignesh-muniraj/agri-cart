import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

function AddCart({ product, onDelete, onQuantityChange }) {
  const [count, setCount] = useState(product.count || 1);
  const [error, setError] = useState("");

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);              // ✅ instant update
    setError("");
    onQuantityChange(product.id, newCount); // sync to backend
  };

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);            // ✅ instant update
      setError("");
      onQuantityChange(product.id, newCount);
    } else {
      setError("Minimum 1 required");
    }
  };

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
        <IconButton onClick={handleDecrease}>
          <RemoveCircleOutlineIcon />
        </IconButton>

        <span>{count}</span>

        <IconButton onClick={handleIncrease}>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>

      <div className="cart-actions">
        <p>₹{product.price * count}</p>
        <IconButton onClick={() => onDelete(product.id)} color="error">
          <RemoveShoppingCartIcon />
        </IconButton>

      </div>
    </div>
  );
}
export { AddCart };
