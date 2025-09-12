import React, { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { API } from "./Global";
import { useNavigate } from "react-router-dom";

const addressSchema = object({
  name: string().required("Name is required"),
  phone: string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  pincode: string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pincode"),
  address: string().required("Address is required"),
  city: string().required("City/District/Town is required"),
  state: string().required("State is required"),
  // ✅ locality, landmark, altPhone are optional (no .required())
  locality: string(),
  landmark: string(),
  altPhone: string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
    .nullable()
    .notRequired(),
});

function PlaceOrder() {
  const [success, setSuccess] = useState(false); // ✅ separate success state
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        landmark: "",
        altPhone: "",
      },
      validationSchema: addressSchema,
      onSubmit: (formData) => {
        placeOrder(formData);
      },
    });

  const placeOrder = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");

      const response = await fetch(`${API}/orders/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, user_id: userId }),
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);
      if (response.ok) {
        setSuccess(true);
        setMessage("Order placed successfully!");
        setTimeout(() => navigate("/Home"), 10000);
      } else {
        setMessage(data.error ? data.error : "❌ Failed to place order");
      }
      console.log(success)
    } catch (error) {
      console.error("Checkout error:", error);
      setMessage("❌ Something went wrong. Try again!");
    }
  };

  return (
    <div className="success-msg">
      {success ? (
        <div className="order-success ">🎉 <h1>Order Placed</h1></div>
      ) : (
        <div className="address-container">
          <form onSubmit={handleSubmit} className="address-form">
            <h2>Shipping Address</h2>

            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Mobile Number"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Address (Area and Street)"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />

            <div className="add-flex">
              <TextField
                fullWidth
                margin="normal"
                label="Pincode"
                name="pincode"
                value={values.pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.pincode && Boolean(errors.pincode)}
                helperText={touched.pincode && errors.pincode}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Locality / Area"
                name="locality"
                value={values.locality}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <TextField
                fullWidth
                margin="normal"
                label="City/District/Town"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && Boolean(errors.city)}
                helperText={touched.city && errors.city}
              />
            </div>

            <div className="add-flex">
              <TextField
                select
                fullWidth
                margin="normal"
                label="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.state && Boolean(errors.state)}
                helperText={touched.state && errors.state}
              >
                <MenuItem value="">-- Select State --</MenuItem>
                <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                <MenuItem value="Karnataka">Karnataka</MenuItem>
                <MenuItem value="Kerala">Kerala</MenuItem>
                <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              </TextField>

              <TextField
                fullWidth
                margin="normal"
                label="Landmark (Optional)"
                name="landmark"
                value={values.landmark}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Alternate Phone (Optional)"
                name="altPhone"
                value={values.altPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.altPhone && Boolean(errors.altPhone)}
                helperText={touched.altPhone && errors.altPhone}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="success"
              className="address-btn"
            >
              Place Order
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export { PlaceOrder };
