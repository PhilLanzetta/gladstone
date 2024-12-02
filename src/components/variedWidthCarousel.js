import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import Slider from "react-slick"
import * as styles from "./variedWidthCarousel.module.css"
import VideoPlayer from "./videoPlayer"

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

const VariedWidthCarousel = ({ images, content }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeVideo, setActiveVideo] = useState(false)

  const settings = {
    slidesToShow: 1,
    infinite: false,
    useTransform: false,
    dots: false,
    arrows: true,
    afterChange: current => setActiveSlide(current),
    variableWidth: true,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
  }
  return (
    <div className={styles.sliderContainer}>
      {images?.length > 1 && (
        <div className={styles.slideCount}>
          {Math.round(activeSlide + 1)} / {images.length}
        </div>
      )}
      {content?.length > 1 && (
        <div className={styles.slideCount}>
          {Math.round(activeSlide + 1)} / {content.length}
        </div>
      )}
      <Slider {...settings}>
        {images?.map(image => {
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
                      __html: image.caption?.childMarkdownRemark.html.replace(
                        /\b(\d+)\/(\d+)/g,
                        "<span class='fraction'><sup>$1</sup>&frasl;<sub>$2</sub></span>"
                      ),
                    }}
                  ></figcaption>
                </figure>
              </div>
            </div>
          )
        })}
        {content?.map(item => {
          if (item.studioImgId) {
            const { image, caption, studioImgId } = item
            const imgWidth = (image?.width * 50) / image?.height
            return (
              <div
                key={studioImgId}
                style={{ width: `calc(${imgWidth}vh + 20px)` }}
                className={styles.slide}
              >
                <div className={styles.slideContainer}>
                  <figure>
                    <GatsbyImage
                      image={image?.gatsbyImageData}
                      alt={image?.description}
                      style={{ height: "50vh", width: `${imgWidth}vh` }}
                    ></GatsbyImage>
                    <figcaption
                      dangerouslySetInnerHTML={{
                        __html: caption?.childMarkdownRemark.html.replace(
                          /\b(\d+)\/(\d+)/g,
                          "<span class='fraction'><sup>$1</sup>&frasl;<sub>$2</sub></span>"
                        ),
                      }}
                    ></figcaption>
                  </figure>
                </div>
              </div>
            )
          } else if (item.studioVideoId) {
            const aspectRatioToNum = item.aspectRatio?.split(" / ").map(Number)
            const imgWidth = (aspectRatioToNum[0] * 50) / aspectRatioToNum[1]
            return (
              <div
                key={item.studioVideoId}
                style={{width: `calc(${imgWidth}vh + 20px)`}}
                className={styles.slide}
              >
                <VideoPlayer
                  video={item}
                  videoId={item.studioVideoId}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                  varied={true}
                  variedWidth={imgWidth}
                ></VideoPlayer>
              </div>
            )
          } else return null
        })}
      </Slider>
    </div>
  )
}

export default VariedWidthCarousel
