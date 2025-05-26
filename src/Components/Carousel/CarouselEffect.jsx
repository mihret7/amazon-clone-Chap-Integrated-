
// importing react
import React from "react";

// importing react-responsive-carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// importing images data
import { img } from "./img/data";

// importing css
import styles from "./Carousel.module.css";




function CarouselEffect() {
  return (

    <div>

      
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false} 
      >
        {img.map((imageItemLink) => {
          return <img key={imageItemLink} src={imageItemLink} />;
        })}
      </Carousel>



      {/* to make the lower part fadding */}
      <div className={styles.hero__img}></div>
    </div>
  );
}

export default CarouselEffect;