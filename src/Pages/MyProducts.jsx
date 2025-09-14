import { useEffect, useState } from "react";
import { API } from "./Global";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);   // ✅ loader state
  const [deletingId, setDeletingId] = useState(null); // ✅ track which product is deleting
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

  const deleteProduct = async (id) => {
    try {
      setDeletingId(id); // show loader on that product’s delete button
      const response = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const editProduct = (product) => {
    navigate("/editProduct", { state: { product } });
  };

  // ✅ Show loader while fetching products
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
              disabled={deletingId === p.id} // disable while deleting
            >
              {deletingId === p.id ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

export { MyProducts };
