
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { object, string, number } from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { API } from "./Global";

// ✅ Validation schema
const productSchema = object({
  name: string().required("Product name is required"),
  poster: string().url("Enter a valid image URL").required("Poster is required"),
  price: number().positive("Price must be positive").required("Price is required"),
  category: string().required("Category is required"),
  quantity: string().required("Quantity is required"),
});

function SellerPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        poster: "",
        price: "",
        category: "",
        quantity: "",
      },
      validationSchema: productSchema,
      onSubmit: (product) => {
        // ✅ also send user_id from localStorage
        const user_id = localStorage.getItem("id");  
        addProduct({ ...product, user_id });
      },
    });

  // ✅ API call to save product
  const addProduct = async (product) => {
    try {
      const response = await fetch(`${API}/products`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/productList");
      } else {
        setError(data.error || "Failed to add product");
      }
    } catch (error) {
      console.error("Add product error:", error);
      setError("Something went wrong, please try again!");
    }
  };

  return (
    <div className="sell-container">
      <form onSubmit={handleSubmit} className="sell-form">
        <h2>Sell Your Product</h2>

        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          color="success"
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Poster URL"
          name="poster"
          value={values.poster}
          onChange={handleChange}
          onBlur={handleBlur}
          color="success"
          error={touched.poster && Boolean(errors.poster)}
          helperText={touched.poster && errors.poster}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Price (₹)"
          name="price"
          type="number"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          color="success"
          error={touched.price && Boolean(errors.price)}
          helperText={touched.price && errors.price}
        />

        <TextField
          select
          fullWidth
          margin="normal"
          label="Quantity"
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
          onBlur={handleBlur}
          color="success"
          error={touched.quantity && Boolean(errors.quantity)}
          helperText={touched.quantity && errors.quantity}
        >
          <MenuItem value="500g">500g</MenuItem>
          <MenuItem value="1kg">1kg</MenuItem>
          <MenuItem value="2kg">2kg</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          margin="normal"
          label="Category"
          name="category"
          value={values.category}
          onChange={handleChange}
          onBlur={handleBlur}
          color="success"
          error={touched.category && Boolean(errors.category)}
          helperText={touched.category && errors.category}
        >
          <MenuItem value="Exotic Fruits">Exotic Fruits</MenuItem>
          <MenuItem value="Exotic Vegetables">Exotic Vegetables</MenuItem>
          <MenuItem value="Fresh Fruits">Fresh Fruits</MenuItem>
          <MenuItem value="Fresh Vegetables">Fresh Vegetables</MenuItem>
          <MenuItem value="Leaf & Herbs">Leaf & Herbs</MenuItem>
          <MenuItem value="Summer Deals">Summer Deals</MenuItem>
        </TextField>

        {error && <p className="error-text">{error}</p>}

        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit Product
        </Button>
      </form>
    </div>
  );
}

export { SellerPage };
