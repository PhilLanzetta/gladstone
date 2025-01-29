import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import * as styles from "./simpleCarousel.module.css"
import VideoPlayer from "./videoPlayer"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

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
  const [popUp, setPopUp] = useState(-1)

  useEffect(() => {
    if (popUp >= 0) {
      const scrollY = window.scrollY
      const body = document.body
      body.style.position = "fixed"
      body.style.top = `-${scrollY}px`
    } else {
      const body = document.body
      const scrollY = body.style.top
      body.style.position = ""
      body.style.top = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [popUp])

  const settings = {
    slidesToShow: slideCount,
    infinite: videos ? (videos.length > 1 ? true : false) : false,
    useTransform: false,
    centerMode: videos ? (videos.length > 1 ? true : false) : false,
    centerPadding: "15%",
    dots: false,
    arrows: videos
      ? videos.length > 1
        ? true
        : false
      : images?.length > 1
      ? true
      : false,
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
          images.map((image, index) => {
            return (
              <div key={image.id}>
                <div className={styles.slideContainer}>
                  <figure>
                    <button onClick={() => setPopUp(index)}>
                      <GatsbyImage
                        image={image.image?.gatsbyImageData}
                        alt={image.image?.description}
                      ></GatsbyImage>
                    </button>
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
      {popUp >= 0 && (
        <div className={styles.imagePopUpContainer}>
          <button className={styles.closePopUp} onClick={() => setPopUp(-1)}>
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 31L31 1" stroke="black" />
              <path d="M1 1L31 31" stroke="black" />
            </svg>
          </button>
          <TransformWrapper initialScale={1} centerOnInit={true}>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
                <TransformComponent
                  wrapperStyle={{
                    position: "relative",
                    height: "100vh",
                    width: "100vw",
                  }}
                >
                  <GatsbyImage
                    image={images[popUp].image?.gatsbyImageData}
                    alt={images[popUp].image?.description}
                    className={styles.popUpImageImg}
                  ></GatsbyImage>
                </TransformComponent>
                <div className={styles.popUpControls}>
                  <button
                    className={styles.popUpControlsBtn}
                    onClick={() => zoomOut()}
                  >
                    <svg
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="17.5" cy="17.5" r="16.5" stroke="black" />
                      <line x1="7" y1="17.5" x2="28" y2="17.5" stroke="black" />
                    </svg>
                  </button>
                  <button
                    className={styles.popUpControlsBtn}
                    onClick={() => zoomIn()}
                  >
                    <svg
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="17.5" cy="17.5" r="16.5" stroke="black" />
                      <line x1="17.5" y1="7" x2="17.5" y2="28" stroke="black" />
                      <line x1="7" y1="17.5" x2="28" y2="17.5" stroke="black" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </TransformWrapper>
        </div>
      )}
    </div>
  )
}

export default SimpleCarousel
