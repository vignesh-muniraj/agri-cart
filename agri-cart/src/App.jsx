import "./styles.css";
import { Navbar } from "./Pages/Navbar";
import { Hero } from "./Pages/Hero";
import { ProductList } from "./Pages/ProductList";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Footer } from "./Pages/Footer";
import { Blog } from "./Pages/Blog";
import { About } from "./About";
import { Recomended } from "./Components/Recomended";
import { ContactPage } from "./Pages/ContactPage";
import { AddCartList } from "./Pages/AddCartList";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/AddCart" element={<AddCartList />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
