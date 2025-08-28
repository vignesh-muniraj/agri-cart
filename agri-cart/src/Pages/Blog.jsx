// function Blog() {
//   return (
//     <div>
//       <iframe
//         width="100%"
//         height="750"
//         src="https://www.youtube.com/embed/QK_4ISycQW4"
//         title="AVENGERS: DOOMSDAY (2026) – FIRST TRAILER | Robert Downey Jr as Doctor Doom | Marvel Comics"
//         frameborder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerpolicy="strict-origin-when-cross-origin"
//         allowfullscreen
//       ></iframe>
//       <iframe
//         width="315"
//         height="560"
//         src="https://www.youtube.com/embed/QK_4ISycQW4"
//         title="YouTube Shorts"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerpolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//       ></iframe>
//       <iframe
//         width="315"
//         height="560"
//         src="https://www.youtube.com/embed/QK_4ISycQW4"
//         title="YouTube Shorts"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//       <iframe
//         width="315"
//         height="560"
//         src="https://www.youtube.com/embed/QK_4ISycQW4"
//         title="YouTube Shorts"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe><iframe
//         width="315"
//         height="560"
//         src="https://www.youtube.com/embed/QK_4ISycQW4"
//         title="YouTube Shorts"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
      
//     </div>
//   );
// }
// export { Blog };
import React from "react";

function Blog() {
  // Dummy blog data
  const blogPosts = [
    {
      id: 1,
      title: "Benefits of Eating Organic Vegetables",
      date: "August 20, 2025",
      image: "https://i.pinimg.com/736x/06/61/26/066126317ffb581ee0c93f73fc2efd2d.jpg", 
      excerpt: "Discover why organic vegetables are healthier, fresher, and better for the environment.",
    },
    {
      id: 2,
      title: "Sustainable Farming Practices We Follow",
      date: "August 10, 2025",
      image: "https://i.pinimg.com/736x/fb/af/79/fbaf797a492d9a5572bebd0064e530f4.jpg", 
      excerpt: "Learn about eco-friendly techniques we use to grow chemical-free crops.",
    },
    {
      id: 3,
      title: "Top 5 Seasonal Fruits You Must Try",
      date: "July 28, 2025",
      image: "https://i.pinimg.com/736x/9d/7d/d2/9d7dd2cc7f7677ea218f5c3a3314bdf7.jpg",
      excerpt: "Explore the freshest seasonal fruits and their amazing health benefits.",
    },
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">Our Blog</h1>
      <p className="blog-subtitle">Fresh insights on farming, health, and sustainability 🌱</p>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p className="blog-date">{post.date}</p>
              <p>{post.excerpt}</p>
              <button className="blog-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export {Blog};

