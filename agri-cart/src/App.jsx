import "./styles.css";
import { Navbar } from "./Pages/Navbar";
import { Hero } from "./Pages/Hero";
import { AddCart } from "./Pages/AddCart";
import { Sample_Categore } from "./Pages/Sample_Categore";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Footer } from "./Pages/Footer";
import { Blog } from "./Pages/Blog";
import { About } from "./About";
import { Recomended } from "./Components/Recomended";
import { ContactPage } from "./Pages/ContactPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/Sample_Categore" element={<Sample_Categore />} />
      <Route path="/AddCart" element={<AddCart />} />
      <Route path="/about" element={<About/>} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/" element={<Home/>} />
      </Routes>
      <Footer/>
      </div>
  );
}

export default App;
