import { useEffect, useState } from "react";
import { API } from "./Global";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { IconButton } from "@mui/material";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); 
  const user_id = localStorage.getItem("id");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/myproducts/${user_id}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const markProductInactive = async (id, currentStatus) => {
    try {
      setDeletingId(id);
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      const response = await fetch(`${API}/products/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchProducts();
      } else {
        const errData = await response.json();
        console.error("Update failed:", errData);
      }
    } catch (error) {
      console.error("Update status error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const editProduct = (product) => {
    navigate("/EditProductPage", { state: { product } });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress color="success" size={60} />
      </Box>
    );
  }

  return (
    <div className="my-products1">
      <h2>My Products</h2>
      {products.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        products.map((p) => (
          <div key={p.id} className="product-card1">
            <div>
              <img src={p.poster} alt={p.name} width="150" />
            </div>
            <div>
              <h3>{p.name}</h3>
              <p>Category: {p.category}</p>
            </div>
            <div>
              <p>₹{p.price}</p>
              <p>Qty: {p.quantity}</p>
            </div>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => editProduct(p)}
                sx={{ height: 40, marginRight: 5 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                sx={{ height: 40 }}
                color={p.status === "active" ? "error" : "success"} 
                onClick={() => markProductInactive(p.id, p.status)}
                disabled={deletingId === p.id}
              >
                {deletingId === p.id ? (
                  <CircularProgress size={20} color="inherit" />
                ) : p.status === "active" ? (
                  " Inactive"
                ) : (
                  "Active"
                )}
              </Button>
            </div>
          </div>
        ))
      )}
      <IconButton onClick={() => navigate("/sellerpage")}>
        <ArrowBackIosIcon /> 
      </IconButton>
    </div>
  );
}

export { MyProducts };
