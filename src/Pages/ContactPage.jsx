import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { number, object, string } from "yup";

// ✅ Validation Schema
const contactData = object({
  name: string().required("Please enter your name"),
  email: string().email("Invalid email").required("Please enter your email"),
  subject: string().required("Please enter subject"),
  phone: string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Please enter phone number"),
});

function ContactPage() {
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        subject: "",
        phone: "",
      },
      validationSchema: contactData,
      onSubmit: (data) => {
        console.log("Contact Form Submitted ✅", data);
        alert("Message sent successfully!");
      },
    });

  return (
    <form onSubmit={handleSubmit} className="contact-main">
      <TextField
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Name"
        variant="outlined"
        name="name"
        margin="normal"
        fullWidth
        helperText={touched.name && errors.name}
        error={touched.name && errors.name}
      />

      <TextField
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Email"
        variant="outlined"
        name="email"
        margin="normal"
        fullWidth
        helperText={touched.email && errors.email}
        error={touched.email && errors.email}
      />

      <TextField
        value={values.subject}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Subject"
        variant="outlined"
        name="subject"
        margin="normal"
        fullWidth
        helperText={touched.subject && errors.subject}
        error={touched.subject && errors.subject}
      />

      <TextField
        value={values.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        label="Phone Number"
        variant="outlined"
        name="phone"
        margin="normal"
        fullWidth
        helperText={touched.phone && errors.phone}
        error={touched.phone && errors.phone}
      />

      <Button type="submit" variant="contained" color="green" fullWidth className="contact-btn">
        📩 Send
      </Button>
    </form>
  );
}

export { ContactPage };
