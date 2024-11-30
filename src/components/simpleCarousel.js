import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import Slider from "react-slick"
import * as styles from "./simpleCarousel.module.css"
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

const SimpleCarousel = ({ images, slideCount, videos }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeVideo, setActiveVideo] = useState(null)

  const settings = {
    slidesToShow: slideCount,
    infinite: false,
    useTransform: false,
    dots: false,
    arrows: videos ? (videos.length > 1 ? true : false) : true,
    draggable: videos ? false : true,
    afterChange: current => setActiveSlide(current),
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
  }

  return (
    <div className={styles.simpleContainer}>
      {videos && videos?.length > 1 && (
        <div className={styles.slideCount}>
          {Math.round(activeSlide + 1)} / {videos.length}
        </div>
      )}
      {images && images?.length > 1 && (
        <div className={styles.slideCount}>
          {Math.round(activeSlide + 1)} / {images.length}
        </div>
      )}
      <Slider {...settings}>
        {images &&
          images.map(image => {
            return (
              <div key={image.id}>
                <div className={styles.slideContainer}>
                  <figure>
                    <GatsbyImage
                      image={image.image?.gatsbyImageData}
                      alt={image.image?.description}
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
        {videos &&
          videos.map(video => (
            <div key={video.id}>
              <div className={styles.slideContainer}>
                <VideoPlayer
                  video={video}
                  videoId={video.id}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                ></VideoPlayer>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  )
}

export default SimpleCarousel
