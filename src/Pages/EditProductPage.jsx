import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "./Global";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function EditProductPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; // get product from navigate
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true); // show loader
      const res = await fetch(`${API}/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        // Product saved successfully
        setSuccessMessage("Product updated successfully!");

        // Update local product object to reflect saved values
        product.name = form.name;
        product.price = form.price;
        product.quantity = form.quantity;

        // Hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // stop loader
      navigate("/myproducts")
    }
  };

  if (!product) return <p>Product not found</p>;

  return (
    <Box sx={{ maxWidth: 400, margin: "20px auto" }}>
      <h2>Edit Product</h2>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="success"
        onClick={handleSave}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : "Save"}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/myproducts")}
        sx={{ marginTop: 2, marginLeft: 1 }}
      >
        Cancel
      </Button>

      {successMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
      )}
    </Box>
  );
}

export { EditProductPage };
