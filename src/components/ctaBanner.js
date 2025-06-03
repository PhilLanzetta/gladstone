import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import * as styles from "./ctaBanner.module.css"

const CTABanner = ({ cta }) => {
  const [isSubscribeOpen, setSubscribeOpen] = useState(false)
  const {
    headlineText,
    textColor,
    buttonType,
    buttonText,
    subtitle,
    backgroundImage,
  } = cta
  return (
    <div className={styles.bannerContainer}>
      {backgroundImage && (
        <div className={styles.imageHolder}>
          <div className={styles.overlay}></div>
          <GatsbyImage
            alt={backgroundImage.description}
            image={backgroundImage.gatsbyImageData}
            className={styles.bannerImage}
          ></GatsbyImage>
        </div>
      )}
      <div style={{ color: textColor }} className={styles.textContainer}>
        <h2 className={styles.ctaHeadline}>{headlineText}</h2>
        <p className={styles.ctaSubtitle}>{subtitle}</p>
        {buttonType === "Subscribe" && (
          <button
            className={styles.ctaButton}
            onClick={() => setSubscribeOpen(true)}
          >
            {buttonText}
          </button>
        )}
      </div>
      {isSubscribeOpen && (
        <div className={styles.subscribePopUp}>
          <h2 className={styles.popUpHeadline}>Stay In Touch</h2>
          <p>
            Sign up to be notified about upcoming exhibitions, art works,
            events, and more.{" "}
          </p>
        </div>
      )}
    </div>
  )
}

export default CTABanner
