import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

function AddCart({ product, onDelete }) {
  const [increament, setIncrement] = useState(1);
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
        <div >
        <h1 className="product-title">{product.name}</h1>
        <p className="product-quantity">{product.quantity}</p>
        </div>
             <div className="cart-btn" >
        <IconButton
          sx={{ color: "green" }}
          onClick={() => {
            if (increament > 1) {
              setIncrement(increament - 1);
              setError("");
            } else {
              setError("Minimum quantity should be 1");
            }
          }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <p>{increament}</p>
        <IconButton
          sx={{ color: "green" }}
          onClick={() => {
            setIncrement(increament + 1);
            setError("");
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
        </div>
        <div className="price-row">
          <div>
            <span className="new-price">
              {"₹" + product.price}
            </span>
          </div>
           <div>
            <span className="new-price">
             <p className="lite">{increament + " ×  " + product.quantity } </p><p>{ " ₹" + product.price * increament}</p>
              
            </span>
          </div>
          <IconButton
            sx={{ color: "crimson" }}
            onClick={() => onDelete(product.id)}
          >
            <RemoveShoppingCartIcon />
          </IconButton>
        </div>
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
      </div>
      
    </div>
  );
}

export { AddCart };
