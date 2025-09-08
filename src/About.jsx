import React from "react";

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>

      <p className="about-intro">
        Welcome to <span className="highlight">agri-cart</span>, your trusted
        source for fresh and natural agricultural products. We believe healthy
        living starts with healthy food, and that’s why we bring farm-fresh
        produce straight to your doorstep.
      </p>

      <div className="about-section">
        <h2>🌱 Our Mission</h2>
        <p>
          To provide high-quality, affordable, and eco-friendly farm products
          that enrich your meals and support sustainable farming practices.
        </p>
      </div>

      <div className="about-section">
        <h2>🌎 Our Vision</h2>
        <p>
          To build a sustainable future by empowering farmers and delivering
          healthy food to every family across the nation.
        </p>
      </div>

      <div className="about-section">
        <h2>💚 What Makes Us Unique?</h2>
        <ul>
          <li>Freshly harvested and delivered directly from farms.</li>
          <li>No harmful chemicals or middlemen.</li>
          <li>Fair prices that benefit both customers and farmers.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>👩‍🌾 Our Story</h2>
        <p>
          Our journey began with a simple idea — to make fresh, chemical-free
          fruits, vegetables, and grains accessible to every household while
          supporting local farmers.
        </p>
      </div>

      <div className="about-cta">
        <p>
          Join us in supporting local farmers and bringing nature’s goodness to
          your plate! 🌿
        </p>
        <button className="about-btn">Shop Now</button>
      </div>
    </div>
  );
}

export { About };
