import Categories from "../Components/Categories";

function CategoriesList() {
  const categories_data = [
    {
      poster:
        "https://egreensapp.s3.ap-south-1.amazonaws.com/LIVE/category/1742213217766_oZBiV.png",
      name: "Exotic fruits",
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

  return (
    <div className="categriesList-container">
      {categories_data.map((categorie, index) => (
        <Categories key={index} categorie={categorie} />
      ))}
    </div>
  );
}
export { CategoriesList };
