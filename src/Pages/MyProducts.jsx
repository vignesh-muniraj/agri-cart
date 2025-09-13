// import { useEffect, useState } from "react";
// import { API } from "./Global";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";

// function MyProducts() {
//   const [products, setProducts] = useState([]);
//   const user_id = localStorage.getItem("id"); // seller’s id
//   const navigate = useNavigate();

//   // Fetch seller’s products
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`${API}/myproducts/${user_id}`);
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Fetch products error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Delete product
//   const deleteProduct = async (id) => {
//     try {
//       const response = await fetch(`${API}/products/${id}`, {
//         method: "DELETE",
//       });
//       if (response.ok) {
//         fetchProducts(); // refresh after delete
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   // Edit product → navigate to SellerPage with product prefilled
//   const editProduct = (product) => {
//     navigate("/editProduct", { state: { product } });
//   };

//   return (
//     <div className="my-products">
//       <h2>My Products</h2>
//       {products.length === 0 ? (
//         <p>No products added yet.</p>
//       ) : (
//         products.map((p) => (
//           <div key={p.id} className="product-card">
//             <img src={p.poster} alt={p.name} width="100" />
//             <h3>{p.name}</h3>
//             <p>₹{p.price}</p>
//             <p>{p.quantity}</p>
//             <p>{p.category}</p>

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => editProduct(p)}
//               sx={{ marginRight: 1 }}
//             >
//               Edit
//             </Button>
//             <Button
//               variant="contained"
//               color="error"
//               onClick={() => deleteProduct(p.id)}
//             >
//               Delete
//             </Button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { API } from "./Global";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const user_id = localStorage.getItem("id");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API}/myproducts/${user_id}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch products error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const editProduct = (product) => {
    navigate("/editProduct", { state: { product } });
  };

  return (
    <div className="my-products1">
      <h2>My Products</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        products.map((p) => (
          <div key={p.id} className="product-card1">
            <img src={p.poster} alt={p.name} width="150" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p>Qty: {p.quantity}</p>
            <p>Category: {p.category}</p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => editProduct(p)}
              sx={{ marginRight: 1 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

export { MyProducts };

