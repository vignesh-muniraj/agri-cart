// import React from "react";
// import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
// import { IconButton } from "@mui/material";
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// function Product({ product, addCart, onDelete }) {
//   const role = localStorage.getItem("role");
//   const status = product.status;
//   return (
//     <div className="product-card">
      
//       <img src={product.poster} alt={product.name} className="product-image" />

//       <h3 className="product-title">{product.name}</h3>
//       <p className="product-quantity">{product.quantity || "1 Piece"}</p>

//       <div className="product-price-row">
//         <div>
//           {/* <span className="old-price">{"₹" + product.old_price}</span> */}
//           <span className="new-price">{"₹" + product.price}</span>
//         </div>
//         {status == "inactive" ? (
//           <IconButton className="out-of-stock">
//           <p>out of stock</p>
//             <ProductionQuantityLimitsIcon />
//           </IconButton>
//         ) : (
//           <button className="add-btn" onClick={() => addCart(product)}>
//             Add
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export { Product };
import React from "react";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { IconButton } from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product({ product, addCart, onDelete }) {
  const role = localStorage.getItem("role");
  const status = product.status;

  const handleAddToCart = () => {
    addCart(product);
    toast.success(`${product.name} added to cart! 🛒`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="product-card">
      <img src={product.poster} alt={product.name} className="product-image" />

      <h3 className="product-title">{product.name}</h3>
      <p className="product-quantity">{product.quantity || "1 Piece"}</p>

      <div className="product-price-row">
        <div>
          {/* <span className="old-price">{"₹" + product.old_price}</span> */}
          <span className="new-price">{"₹" + product.price}</span>
        </div>
        {status === "inactive" ? (
          <IconButton className="out-of-stock">
            <p>out of stock</p>
            <ProductionQuantityLimitsIcon />
          </IconButton>
        ) : (
          <button className="add-btn" onClick={handleAddToCart}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export { Product };
