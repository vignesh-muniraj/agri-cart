import Categories from "../Components/Categories";
import React, { useState, useEffect } from "react";
import { Product } from "../Components/Products";
import { API } from "./Global";

function ProductList() {
  const categories_data = [
    {
      poster:
        "https://www.thedailymeal.com/img/gallery/11-fruits-and-vegetables-that-arent-all-that-great-for-you/dreamstime_m_7134858_0.jpg",
      name: "All",
    },
    {
      poster:
        "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/category/1742213217766_oZBiV.png",
      name: "Exotic Fruits",
    },
    {
      poster:
        "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/category/1742213096127_sqlln.png",
      name: "Exotic Vegetables",
    },
    {
      poster:
        "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/category/1742213050592_u56OR.png",
      name: "Fresh Fruits",
    },
    {
      poster:
        "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/category/1742213065370_M4odj.png",
      name: "Fresh Vegetables",
    },
    {
      poster:
        "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/category/1742213105974_HdwLS.png",
      name: "Leaf & Herbs",
    },
    {
      poster:
        "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/category/1742537055618_wAsTg.png",
      name: "Summer Deals",
    },
  ];

  const [productsList, setProductsList] = useState([]);
  const [selectCategory, setselectCategory] = useState("All");

  // ✅ Fetch all products
  async function getProducts() {
    try {
      const response = await fetch(`${API}/products`);
      const data = await response.json();
      if (response.status === 404) {
        throw new Error("Not found");
      }
      setProductsList(data);
    } catch (error) {
      console.log("Oops:", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const selected_Category = (categorie) => {
    setselectCategory(categorie);
  };

  // ✅ Add to cart (connected to Flask backend)
  const addCart = async (product) => {
    console.log("Trying to add to cart:", product);

    const user_id = localStorage.getItem("id"); // get logged-in user_id
    console.log("❓❓❓❓❓❓❓"+user_id)
    if (!user_id) {
      alert("Please login first!");
      return;
    }

    try {
      const response = await fetch(`${API}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: parseInt(user_id), // backend expects int
          product_id: product.id,
          price: product.price,
          quantity: product.quantity || "500kg", // default if not set
          count: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const data = await response.json();
      console.log("✅ Added:", data);
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
    }
  };

  return (
    <div className="category-main">
      <div className="category-heading">
        <h3> CATEGORIES 🛒 </h3>
        <p>Discover boundless choices with over 500+ handpicked products</p>
      </div>

      <div className="categriesList-container">
        {categories_data.map((categorie, index) => (
          <Categories
            key={index}
            categorie={categorie}
            selected_Category={selected_Category}
          />
        ))}
      </div>

      <div className="productlist-container">
        {productsList
          .filter(
            (product) =>
              selectCategory === "All" || product.category === selectCategory
          )
          .map((product) => (
            <Product key={product.id} product={product} addCart={addCart} />
          ))}
      </div>
    </div>
  );
}

export { ProductList };
