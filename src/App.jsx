import { Route, Routes } from "react-router-dom";
import { About } from "./About";
import { AddCartList } from "./Pages/AddCartList";
import { AdminPage } from "./Pages/AdminPage";
import { ContactPage } from "./Pages/ContactPage";
import { EditProductPage } from "./Pages/EditProductPage";
import { Footer } from "./Pages/Footer";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { MyOrders } from "./Pages/MyOrders";
import { MyProducts } from "./Pages/MyProducts";
import { Navbar } from "./Pages/Navbar";
import { OrdersTaken } from "./Pages/OrdersTaken";
import { PlaceOrder } from "./Pages/PlaceOrder";
import { ProductList } from "./Pages/ProductList";
import { SellerPage } from "./Pages/SellerPage";
import { Signup } from "./Pages/Signup";
import "./styles.css";

function App() {
  return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/AddCart" element={<AddCartList />} />
          <Route path="/about" element={<About />} />
          <Route path="/sellerpage" element={<SellerPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/MyProducts" element={<MyProducts />} />
          <Route path="/PlaceOrder" element={<PlaceOrder />} />
          <Route path="/MyOrders" element={<MyOrders />} />
          <Route path="/OrdersTaken" element={<OrdersTaken />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/EditProductPage" element={<EditProductPage />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
