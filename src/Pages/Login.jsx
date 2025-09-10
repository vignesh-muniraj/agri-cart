import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { object, string } from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { API } from "./Global";  

// ✅ Validation schema
const loginSchema = object({
  username: string().required("Username is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: { username: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: (user) => {
        loginUser(user);
      },
    });

  useEffect(() => {
    localStorage.clear();
  }, []);

  // ✅ Login API call
  const loginUser = async (user) => {
    try {
      const response = await fetch(`${API}/users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user.id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.role); // optional
        navigate("/home");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong, please try again!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Agri-Cart Login</h2>

        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
           color="success"
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />

        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          color="success"
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="signup-btn">
          Login
        </button>

        <p className="signup-link">
          Don’t have an account? <Link to="/Signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
