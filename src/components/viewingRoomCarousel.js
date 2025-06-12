import React, { useState } from "react"
import * as styles from "./viewingRoom.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import Slider from "react-slick"
import { FormattedMessage } from "gatsby-plugin-intl"
import InquirePop from "./inquirePop"
import { AnimatePresence } from "framer-motion"

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to next"
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
          stroke="#000"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to previous"
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
          stroke="#000"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

const ViewingRoomCarousel = ({ item, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isInquireOpen, setInquireOpen] = useState(false)

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
    beforeChange: (current, next) => {
      setCurrentIndex(next)
    },
  }

  console.log(item.slides)
  return (
    <div
      id={item.artist.slug}
      className={
        item.carouselAlignment === "Left"
          ? styles.leftCarousel
          : styles.rightCarousel
      }
    >
      <div className={styles.sliderContainer}>
        {item.slides.length > 1 ? (
          <Slider {...settings}>
            {item.slides.map(slide => (
              <div key={slide.id}>
                <div className={styles.imageContainer}>
                  <GatsbyImage
                    image={slide.image.gatsbyImageData}
                    alt={slide.image.description}
                    className={styles.carouselImage}
                    imgStyle={{ objectFit: "scale-down" }}
                  ></GatsbyImage>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className={styles.imageContainer}>
            <GatsbyImage
              image={item.slides[0].image.gatsbyImageData}
              alt={item.slides[0].image.description}
              className={styles.carouselImage}
              imgStyle={{ objectFit: "scale-down" }}
            ></GatsbyImage>
          </div>
        )}
      </div>
      <div className={styles.imageInfo}>
        <div
          key={currentIndex}
          dangerouslySetInnerHTML={{
            __html: item.slides[
              currentIndex
            ].caption.childMarkdownRemark.html.replace(
              /\b(\d+)\/(\d+)/g,
              "<span class='fraction'><sup>$1</sup>&frasl;<sub>$2</sub></span>"
            ),
          }}
        ></div>
        <button className={styles.inquire} onClick={() => setInquireOpen(true)}>
          <FormattedMessage id="inquire"></FormattedMessage>
        </button>
        <AnimatePresence>
          {isInquireOpen && (
            <InquirePop
              setInquireOpen={setInquireOpen}
              isInquireOpen={isInquireOpen}
              context={`${title} - ${item.artist.name}`}
            ></InquirePop>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ViewingRoomCarousel
