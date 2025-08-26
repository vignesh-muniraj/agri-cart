import "./styles.css";
import { Navbar } from "./Pages/Navbar";
import { Hero } from "./Pages/Hero";
import { ShoppingBag } from "./Pages/ShoppingBag";
// import {CategoriesList} from "./Pages/CategoriesList";
import { Sample_Categore } from "./Pages/Sample_Categore";
// import ShoppingBag from "./ShoppingBag";

function App() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Sample_Categore/>
       <ShoppingBag />
    </div>
  );
}

export default App;
