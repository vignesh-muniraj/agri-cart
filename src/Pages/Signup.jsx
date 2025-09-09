import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { object, string, ref } from "yup"; // ✅ add ref for confirm password
import TextField from "@mui/material/TextField";
  import { API } from "./Global";  
  
// ✅ Validation schema with confirm password
const signupSchema = object({
  username: string().required("Username is required "),
  email: string().email("Invalid email format").required("Email is required "),
  password: string()
    .required("Password is required ")
    .min(8, "Password must be at least 8 characters "),
  confirmPassword: string()
    .required("Confirm your password ")
    .oneOf([ref("password"), null], "Passwords must match 🔒"),
});

export function Signup() {
  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupSchema,
      onSubmit: (user) => {
        // don’t send confirmPassword to backend
        const { confirmPassword, ...newUser } = user;
        signupUser(newUser);
      },
    });

  // ✅ Signup API call
  const signupUser = async (user) => {
    try {
      const response = await fetch(`${API}/users/signup`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/home"); // redirect to homepage
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong, please try again!");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create Agri-Cart Account</h2>

        {/* Username */}
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

        {/* Email */}
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
           color="success"
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />

        {/* Password */}
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

        {/* Confirm Password */}
        <TextField
          fullWidth
          margin="normal"
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
           color="success"
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />

        <button type="submit" className="signup-btn">
          Signup
        </button>

        {/* Login Link */}
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
