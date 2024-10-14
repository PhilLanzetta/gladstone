import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Slider from "react-slick"
import * as styles from "./simpleCarousel.module.css"

const SimpleCarousel = ({ images, slideCount }) => {
  const settings = {
    slidesToShow: slideCount,
    infinite: false,
    useTransform: false,
    dots: false,
    arrows: false,
  }

  return (
    <Slider {...settings}>
      {images.map(image => {
        return (
          <div
            key={image.id}
            className={styles.slide}
          >
            <div className={styles.slideContainer}>
              <figure>
                <GatsbyImage
                  image={image.image?.gatsbyImageData}
                  alt={image.image?.description}
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
