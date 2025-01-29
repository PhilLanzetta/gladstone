import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import * as styles from "./mediaCarousel.module.css"
import useWindowSize from "../utils/useWindowSize"
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

const MediaCarousel = ({ media }) => {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const [slider1, setSlider1] = useState(null)
  const [slider2, setSlider2] = useState(null)
  const [popUp, setPopUp] = useState(-1)
  const { width } = useWindowSize()

  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [slider1, slider2])

  useEffect(() => {
    const captionDivs = document.getElementsByClassName("captionDiv")

    for (let i = 0; i < captionDivs.length; i++) {
      if (captionDivs[i].offsetHeight === 100) {
        captionDivs[i].classList.add("captionOverflow")
      }
    }
  }, [])

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

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
  }

  const slideNumber = Math.floor(width / 100)

  const settingsThumbs = {
    slidesToShow: media.length > slideNumber ? slideNumber : media.length,
    slidesToScroll: 1,
    infinite: false,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: media.length > slideNumber ? true : false,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
  }

  const thumbWidth =
    media.length > slideNumber
      ? "100%"
      : `${(100 / slideNumber) * media.length}%`

  return (
    <div className={styles.mainSliderWrapper}>
      <Slider
        {...settingsMain}
        asNavFor={nav2}
        ref={slider => setSlider1(slider)}
      >
        {media.map((mediaElement, index) => {
          const imgWidth =
            (mediaElement.image?.width * 60) / mediaElement.image?.height
          return (
            <div key={mediaElement.id}>
              <div className={styles.mainImage}>
                <figure>
                  <button onClick={() => setPopUp(index)}>
                    <GatsbyImage
                      image={mediaElement.image?.gatsbyImageData}
                      alt={mediaElement.image?.description}
                      style={{ height: "60vh", width: `${imgWidth}vh` }}
                      className={styles.mainImageImg}
                    ></GatsbyImage>
                  </button>
                  <figcaption
                    className={`captionDiv ${styles.mainCaption}`}
                    dangerouslySetInnerHTML={{
                      __html:
                        mediaElement.caption?.childMarkdownRemark.html.replace(
                          /\b(\d+)\/(\d+)/g,
                          "<span class='fraction'><sup>$1</sup>&frasl;<sub>$2</sub></span>"
                        ),
                    }}
                    style={{ width: `${imgWidth}vh` }}
                  ></figcaption>
                </figure>
              </div>
            </div>
          )
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
                    image={media[popUp].image?.gatsbyImageData}
                    alt={media[popUp].image?.description}
                    className={styles.popUpImageImg}
                    style={{
                      height: "80vh",
                      width: `${
                        (media[popUp].image?.width * 80) /
                        media[popUp].image?.height
                      }vh`,
                    }}
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
      {media.length > 1 && (
        <div
          className={styles.thumbSliderWrapper}
          style={{ width: thumbWidth }}
        >
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={slider => setSlider2(slider)}
          >
            {media.map(mediaElement => (
              <div key={mediaElement.id} className={styles.thumbnailContainer}>
                <GatsbyImage
                  image={mediaElement.image?.gatsbyImageData}
                  alt={mediaElement.image?.description}
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
