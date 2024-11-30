import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useRef } from "react"
import Slider from "react-slick"
import * as styles from "./afterHoursCarousel.module.css"

const AfterHoursCarousel = ({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef(null)

  const settings = {
    slidesToShow: 1,
    infinite: true,
    useTransform: false,
    dots: false,
    arrows: false,
    draggable: true,
    afterChange: current => {
      setActiveSlide(current)
    },
  }

  return (
    <div className={styles.simpleContainer}>
      <Slider {...settings} className={styles.afterCarousel} ref={sliderRef}>
        {images &&
          images.map(image => {
            return (
              <div key={image.id}>
                <div className={styles.slideContainer}>
                  <figure>
                    <GatsbyImage
                      image={image.image?.gatsbyImageData}
                      alt={image.image?.description}
                      className={styles.carouselImage}
                    ></GatsbyImage>
                  </figure>
                </div>
              </div>
            )
          })}
      </Slider>
      <div className={styles.underCarousel}>
        <div
          className={styles.figcaption}
          dangerouslySetInnerHTML={{
            __html: images[
              activeSlide
            ].caption.childMarkdownRemark.html.replace(
              /\b(\d+)\/(\d+)/g,
              "<span class='fraction'><sup>$1</sup>&frasl;<sub>$2</sub></span>"
            ),
          }}
        ></div>
        <div className={styles.slideCountContainer}>
          <div
            role="button"
            tabIndex={0}
            aria-label="go to previous"
            className={styles.previousArrow}
            onClick={() => sliderRef.current.slickPrevious()}
            onKeyDown={e =>
              e.code === "Enter" || e.code === "Space"
                ? sliderRef.current.slickPrevious()
                : null
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.carouselSVG}
              viewBox="0 0 13.047 28.672"
            >
              <path
                id="Polygon_4"
                data-name="Polygon 4"
                d="M0,12.009,14.011,0,28.021,12.009"
                transform="translate(0.659 28.346) rotate(-90)"
                fill="none"
                stroke="#fff"
                stroke-width="1"
              />
            </svg>
          </div>
          {images && images?.length > 1 && (
            <div className={styles.slideCount}>
              {Math.round(activeSlide + 1)} / {images.length}
            </div>
          )}
          <div
            role="button"
            tabIndex={0}
            aria-label="go to next"
            className={styles.nextArrow}
            onClick={() => sliderRef.current.slickNext()}
            onKeyDown={e =>
              e.code === "Enter" || e.code === "Space"
                ? sliderRef.current.slickNext()
                : null
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.carouselSVG}
              viewBox="0 0 13.047 28.672"
            >
              <path
                id="Polygon_3"
                data-name="Polygon 3"
                d="M0,12.009,14.011,0,28.021,12.009"
                transform="translate(12.389 0.325) rotate(90)"
                fill="none"
                stroke="#fff"
                stroke-width="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AfterHoursCarousel
