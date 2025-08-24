import React from "react";

function Categories({ categorie }) {
  return (
    <div>
      <div className="category-card">
        <div className="category-image">
          <img src={categorie.poster} alt={categorie.name} />
        </div>
        <p className="category-name">{categorie.name}</p>
      </div>
    </div>
  );
}

export default Categories;
