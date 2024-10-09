import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import * as styles from "./mediaCarousel.module.css"

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
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.carouselSVG}>
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
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.carouselSVG}>
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

const MediaCarousel = ({ media }) => {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const [slider1, setSlider1] = useState(null)
  const [slider2, setSlider2] = useState(null)

  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [slider1, slider2])

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: styles.sliderNav,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
  }

  const settingsThumbs = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    asNavFor: styles.sliderFor,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
  }

  return (
    <div className={styles.mainSliderWrapper}>
      <Slider
        {...settingsMain}
        asNavFor={nav2}
        ref={slider => setSlider1(slider)}
      >
        {media.map(mediaElement => {
          const imgWidth =
            (mediaElement.image?.width * 80) / mediaElement.image?.height
          return (
            <div key={mediaElement.id}>
              <div className={styles.mainImage}>
                <figure>
                  <GatsbyImage
                    image={mediaElement.image.gatsbyImageData}
                    alt={mediaElement.image.description}
                    style={{ height: "80vh", width: `${imgWidth}vh` }}
                    className={styles.mainImageImg}
                  ></GatsbyImage>
                  <figcaption
                    className={styles.mainCaption}
                    dangerouslySetInnerHTML={{
                      __html: mediaElement.caption?.childMarkdownRemark.html,
                    }}
                  ></figcaption>
                </figure>
              </div>
            </div>
          )
        })}
      </Slider>
      {media.length > 1 && (
        <div className={styles.thumbSliderWrapper}>
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={slider => setSlider2(slider)}
          >
            {media.map(mediaElement => (
              <div key={mediaElement.id} className={styles.thumbnailContainer}>
                <GatsbyImage
                  image={mediaElement.image.gatsbyImageData}
                  alt={mediaElement.image.description}
                ></GatsbyImage>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default MediaCarousel
