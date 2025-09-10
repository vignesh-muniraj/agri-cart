import "./styles.css";
import { Navbar } from "./Pages/Navbar";
import { Hero } from "./Pages/Hero";
import { ProductList } from "./Pages/ProductList";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Footer } from "./Pages/Footer";
import { SellerPage } from "./Pages/SellerPage";
import { MyProducts } from "./Pages/MyProducts";
import { About } from "./About";
import { Recomended } from "./Components/Recomended";
import { ContactPage } from "./Pages/ContactPage";
import { AddCartList } from "./Pages/AddCartList";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/AddCart" element={<AddCartList />} />
        <Route path="/about" element={<About />} />
        <Route path="/sellerpage" element={<SellerPage/>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/MyProducts" element={<MyProducts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App; 