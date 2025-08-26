// import React, { useState, useEffect } from "react";
// import { Product } from "../Components/Products";
// // import { Product } from "../Components/Product";

// function ProductsList() {
//   const [productsList, setProductsList] = useState([]);

//   async function getProducts() {
//     const url = new URL(
//       "https://68959014039a1a2b288f7c48.mockapi.io/agri-cart"
//     );
//     try {
//       const response = await fetch(url, { method: "GET" });
//       const data = await response.json();
//       console.log("response " + response.status);
//       if (response.status === 404) {
//         throw new Error("Not found");
//       }
//       setProductsList(data);
//     } catch (error) {
//       console.log("Oops:", error);
//     }
//   }

//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <div className="productlist-container">
//       {productsList.map((product) => (
//         <Product key={product.id} product={product} />
//       ))}
//     </div>
//   );
// }

// export { ProductsList };
