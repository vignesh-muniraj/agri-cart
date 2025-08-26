import "./styles.css";
import { Navbar } from "./Pages/Navbar";
import { Hero } from "./Pages/Hero";
import { ShoppingBag } from "./Pages/ShoppingBag";
import { Sample_Categore } from "./Pages/Sample_Categore";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/Sample_Categore" element={<Sample_Categore />} />
        <Route path="/ShoppingBag" element={<ShoppingBag />} />
        <Route path="/" element={<Home/>} />

      </Routes>
    </div>
  );
}

export default App;
