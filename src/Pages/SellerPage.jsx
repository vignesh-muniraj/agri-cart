import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { object, string, number } from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { API } from "./Global";

const productSchema = object({
  name: string().required("Product name is required"),
  poster: string()
    .url("Enter a valid image URL")
    .required("Poster is required"),
  price: number()
    .positive("Price must be positive")
    .required("Price is required"),
  category: string().required("Category is required"),
  quantity: string().required("Quantity is required"),
});

function SellerPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [seller_or_buyer, setSeller_or_buyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aadhar, setAadhar] = useState("");
  const userId = localStorage.getItem("id");

  // ✅ Fetch current user role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/users/${userId}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setSeller_or_buyer(data.seller_or_buyer);
      } catch (err) {
        console.error("Error fetching user role:", err);
        setSeller_or_buyer("buyer"); // fallback to buyer
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  // ✅ Auto-hide success/error messages
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000); // hide after 3 sec
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // ✅ Upgrade buyer to seller
  const handleUpgrade = async () => {
    if (aadhar.length !== 12 || !/^\d{12}$/.test(aadhar)) {
      setError("Enter a valid 12-digit Aadhaar number");
      return;
    }
    try {
      const res = await fetch(`${API}/users/${userId}/becomeseller`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhar_no: aadhar }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Upgraded to Seller ✅");
        setSeller_or_buyer("seller");
      } else {
        setError(data.error || "Failed to upgrade");
      }
    } catch (err) {
      console.error("Upgrade error:", err);
      setError("Something went wrong. Try again!");
    }
  };

  // ✅ Formik for product submission
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
      onSubmit: (product) => addProduct({ ...product, user_id: userId }),
    });

  const addProduct = async (product) => {
    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/myproducts");
      } else {
        setError(data.error || "Failed to add product");
      }
    } catch (err) {
      console.error("Add product error:", err);
      setError("Something went wrong, please try again!");
    }
  };

  // ✅ Loading spinner
  if (loading) {
    return (
      <div className="loading">
        <CircularProgress color="success" />
        <p>Loading seller data...</p>
      </div>
    );
  }

  // ✅ Buyer → show upgrade form
  if (seller_or_buyer === "buyer") {
    return (
      <div className="upgrade-container">
        <h2>Become a Seller</h2>
        <p>Enter your Aadhaar number to upgrade your account.</p>

        {success && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            sx={{ mb: 2 }}
          >
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Aadhaar Number"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          inputProps={{ maxLength: 12 }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleUpgrade}
          sx={{ mt: 2 }}
        >
          Upgrade to Seller
        </Button>
      </div>
    );
  }

  // ✅ Seller → show product form + dashboard
  if (seller_or_buyer === "seller") {
    return (
      <div
        className="sell-container"
        style={{
          backgroundImage:
            "url('')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "80vh",
          padding: "40px",
        }}
      >
        <div className="sell-form-container">
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
              label="Product URL"
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
              label="Price ₹"
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

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit Product
            </Button>
          </form>
        </div>
        <div>
          <div className="sell-dashboard">
            <h2>My Seller Dashboard</h2>
            <h3>Manage Your Store</h3>
            <p>Quick access to your products and orders</p>
            <div className="sell-actions">
              <button
                className="btn primary"
                onClick={() => navigate("/myproducts")}
              >
                Live Products
              </button>
              <button
                className="btn secondary"
                onClick={() => navigate("/OrdersTaken")}
              >
                Orders Taken
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <p>Unable to determine user role</p>;
}

export { SellerPage };
