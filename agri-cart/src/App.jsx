import "./styles.css";
import { Navbar } from "./Pages/Navbar";
import { Hero } from "./Pages/Hero";
import { ProductsList } from "./Pages/ProductsList";
import {CategoriesList} from "./Pages/CategoriesList";

function App() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <CategoriesList/>
      <ProductsList />
    </div>
  );
}

export default App;
