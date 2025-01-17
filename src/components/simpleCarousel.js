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

const SimpleCarousel = ({ images, slideCount, videos, content }) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeVideo, setActiveVideo] = useState(null)

  const settings = {
    slidesToShow: slideCount,
    infinite: videos ? (videos.length > 1 ? true : false) : false,
    useTransform: false,
    centerMode: videos ? (videos.length > 1 ? true : false) : false,
    centerPadding: "15%",
    dots: false,
    arrows: videos ? (videos.length > 1 ? true : false) : true,
    draggable: videos ? false : true,
    afterChange: current => setActiveSlide(current),
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
  }

  const onlyOne =
    (videos && videos?.length === 1) ||
    (images && images?.length === 1) ||
    (content && content.length === 1)

  return (
    <div
      className={onlyOne ? styles.simpleContainerOne : styles.simpleContainer}
    >
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
      {content && content?.length > 1 && (
        <div className={styles.slideCount}>
          {Math.round(activeSlide + 1)} / {content.length}
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
          videos.map((video, index) => (
            <div
              key={video.id}
              className={
                index === activeSlide ? styles.activeSlide : styles.dormantSlide
              }
            >
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
        {content &&
          content.map(item => {
            if (item.studioImgId) {
              const { image, caption, studioImgId } = item
              return (
                <div key={studioImgId}>
                  <div className={styles.slideContainer}>
                    <figure>
                      <GatsbyImage
                        image={image?.gatsbyImageData}
                        alt={image?.description}
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
              return (
                <div key={item.studioVideoId}>
                  <div className={styles.slideContainer}>
                    <VideoPlayer
                      video={item}
                      videoId={item.studioVideoId}
                      activeVideo={activeVideo}
                      setActiveVideo={setActiveVideo}
                    ></VideoPlayer>
                  </div>
                </div>
              )
            } else return null
          })}
      </Slider>
    </div>
  )
}

export default SimpleCarousel
