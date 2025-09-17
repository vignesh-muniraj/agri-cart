// import React from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";

// function Hero() {
//   return (
//     <div className="hero-container">
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showThumbs={false}
//         showStatus={false}
//         centerMode={true}
//         centerSlidePercentage={70}
//         // dynamicHeight={false}
//       >
//         <div className="slide-wrapper">
//           <img
//             alt=""
//             src="https://cdn.vegease.in/home-page/LIVE/1732088925357_Fbo5D.png"
//           />
//         </div>
//         <div className="slide-wrapper">
//           <img
//             alt=""
//             src="https://cdn.vegease.in/home-page/LIVE/1732088932433_epB85.png"
//           />
//         </div>
//         <div className="slide-wrapper">
//           <img
//             alt=""
//             src="https://cdn.vegease.in/home-page/LIVE/1732088901649_grM8g.png"
//           />
//         </div>
//         <div className="slide-wrapper">
//           <img
//             alt=""
//             src="https://cdn.vegease.in/home-page/LIVE/1732088918205_LiNr8.png"
//           />
//         </div>
//       </Carousel>

//      </div>
//   );
// }

// export { Hero };
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import mobileBanner from "../assets/Untitled.png"; // 👈 your local image
import { useNavigate } from "react-router-dom";

function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = [
    "https://cdn.vegease.in/home-page/LIVE/1732088925357_Fbo5D.png",
    "https://cdn.vegease.in/home-page/LIVE/1732088932433_epB85.png",
    "https://cdn.vegease.in/home-page/LIVE/1732088901649_grM8g.png",
    "https://cdn.vegease.in/home-page/LIVE/1732088918205_LiNr8.png",
  ];
  const navigate = useNavigate();
  return (
    <div className="hero-container">
      {isMobile ? (
        <img
          src={
            "https://ik.imagekit.io/vky/agri-cart/Untitled.png?updatedAt=1757947474535"
          }
          alt="mobile hero banner"
          style={{ width: "100%", height: "50%", borderRadius: "12px" }}
        />
      ) : (
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          emulateTouch
          centerMode
          centerSlidePercentage={80}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="slide-wrapper"
              role="button"
              tabIndex={0}
              onClick={() => navigate("/ProductList")}
              onKeyDown={(e) => e.key === "Enter" && navigate("/ProductList")}
            >
              <img src={src} alt={`banner-${i}`} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export { Hero };
