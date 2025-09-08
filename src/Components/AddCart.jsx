  import { useState } from "react"; // ✅ you forgot this import
  import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
  import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
  import { IconButton } from "@mui/material";
  import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

  function AddCart({ product, onDelete, onQuantityChange }) {
    const [error, setError] = useState("");

    return (
      <div className="cart-main">
        <div className="addcart-card">
          <div className="offer-badge">Brand</div>

          <img
            src={product.poster}
            alt={product.name}
            className="product-image"
          />

          <div className="cart-content">
            <div>
              <h1 className="product-title">{product.name}</h1>
              <p className="product-quantity">{product.quantity}</p>
            </div>

            {/* Quantity buttons */}
            <div className="cart-btn">
              <IconButton
                sx={{ color: "green" }}
                onClick={() => {
                  if (product.count > 1) {
                    onQuantityChange(product.id, product.count - 1);
                    setError("");
                  } else {
                    setError("Minimum quantity should be 1");
                  }
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>

              <p>{product.count}</p>

              <IconButton
                sx={{ color: "green" }}
                onClick={() => {
                  onQuantityChange(product.id, product.count + 1);
                  setError("");
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>

          {/* Price Row */}
          <div className="price-row">
            <div>
              <span className="new-price">₹{product.price}</span>
            </div>
            <div>
              <p className="lite">
                {product.count} × {product.quantity}
              </p>
              <p>₹{product.price * product.count}</p>
            </div>
            <IconButton
              sx={{ color: "crimson" }}
              onClick={() => onDelete(product.id)}
            >
              <RemoveShoppingCartIcon />
            </IconButton>
          </div>
          
          {/* Error message */}
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          </div>
      </div>
    );
  }

  export { AddCart };
