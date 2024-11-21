import React, { useState } from "react"
import * as styles from "./viewingRoom.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import Slider from "react-slick"
import slugify from "slugify"
import { AnimatePresence, motion } from "framer-motion"
import { FormattedMessage } from "gatsby-plugin-intl"

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
          stroke-width="1"
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
          stroke-width="1"
        />
      </svg>
    </div>
  )
}

const ViewingRoomCarousel = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    adaptiveHeight: true,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
    afterChange: current => setCurrentIndex(current),
  }

  return (
    <div
      id={slugify(item.artist, { lower: true })}
      key={item.carouselId}
      className={
        item.carouselAlignment === "Left"
          ? styles.leftCarousel
          : styles.rightCarousel
      }
    >
      <div className={styles.sliderContainer}>
        <Slider {...settings}>
          {item.slides.map((slide, index) => (
            <div key={index}>
              <div className={styles.imageContainer}>
                <GatsbyImage
                  image={slide.image.gatsbyImageData}
                  alt={slide.image.description}
                  className={styles.carouselImage}
                ></GatsbyImage>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.imageInfo}>
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            dangerouslySetInnerHTML={{
              __html:
                item.slides[currentIndex].caption.childMarkdownRemark.html,
            }}
          ></motion.div>
        </AnimatePresence>
        <a
          href={item.callToActionEmail}
          className={styles.inquire}
          target="_blank"
          rel="noreferrer"
        >
          <FormattedMessage id="inquire"></FormattedMessage>
        </a>
      </div>
    </div>
  )
}

export default ViewingRoomCarousel
