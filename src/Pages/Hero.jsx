import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Hero() {
  return (
    <div className="hero-container">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        centerMode={true}
        centerSlidePercentage={70}
        // dynamicHeight={false}
      > 
        <div className="slide-wrapper">
          <img
            alt=""
            src="https://cdn.vegease.in/home-page/LIVE/1732088925357_Fbo5D.png"
          />
        </div>
        <div className="slide-wrapper">
          <img
            alt=""
            src="https://cdn.vegease.in/home-page/LIVE/1732088932433_epB85.png"
          />
        </div>
        <div className="slide-wrapper">
          <img
            alt=""
            src="https://cdn.vegease.in/home-page/LIVE/1732088901649_grM8g.png"
          />
        </div>
        <div className="slide-wrapper">
          <img
            alt=""
            src="https://cdn.vegease.in/home-page/LIVE/1732088918205_LiNr8.png"
          />
        </div>
      </Carousel>
    
     </div>
  );
}

export { Hero };
