import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Slider from "react-slick"
import * as styles from "./simpleCarousel.module.css"

const SimpleCarousel = ({ images, slideCount }) => {
  const settings = {
    slidesToShow: 1,
    infinite: false,
    useTransform: false,
    dots: false,
    arrows: false,
    variableWidth: true,
  }
  return (
    <Slider {...settings}>
      {images.map(image => {
        const imgWidth = (image.image?.width * 50) / image.image?.height
        return (
          <div
            key={image.id}
            style={{ width: `calc(${imgWidth}vh + 20px)` }}
            className={styles.slide}
          >
            <div className={styles.slideContainer}>
              <figure>
                <GatsbyImage
                  image={image.image?.gatsbyImageData}
                  alt={image.image?.description}
                  style={{ height: "50vh", width: `${imgWidth}vh` }}
                ></GatsbyImage>
                <figcaption
                  dangerouslySetInnerHTML={{
                    __html: image.caption?.childMarkdownRemark.html,
                  }}
                ></figcaption>
              </figure>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}

export default SimpleCarousel
