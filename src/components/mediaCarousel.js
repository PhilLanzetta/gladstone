import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import * as styles from "./mediaCarousel.module.css"

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
  }

  const settingsThumbs = {
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    asNavFor: styles.sliderFor,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
  }

  return (
    <div className={styles.mainSliderWrapper}>
      <Slider
        {...settingsMain}
        asNavFor={nav2}
        ref={slider => setSlider1(slider)}
      >
        {media.map(mediaElement => (
          <div key={mediaElement.id}>
            <div className={styles.mainImage}>
              <figure>
                <GatsbyImage
                  image={mediaElement.image.gatsbyImageData}
                  alt={mediaElement.image.description}
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
        ))}
      </Slider>
      {media.length > 1 && (
        <div className={styles.thumbSliderWrapper}>
          <Slider
            {...settingsThumbs}
            asNavFor={nav1}
            ref={slider => setSlider2(slider)}
          >
            {media.map(mediaElement => (
              <GatsbyImage
                key={mediaElement.id}
                image={mediaElement.image.gatsbyImageData}
                alt={mediaElement.image.description}
              ></GatsbyImage>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default MediaCarousel
