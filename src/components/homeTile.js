import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import * as styles from "./homeTile.module.css"
import useWindowSize from "../utils/useWindowSize"

const HomeTile = ({ tile }) => {
  const { artist, image, workTitle, location, tileWidth, linkedContent } = tile

  const { width } = useWindowSize()
  const isMobile = width < 700

  return (
    <Link
      className={styles.tileContainer}
      style={isMobile ? { width: "100%" } : { width: tileWidth }}
      to={`/artist/${linkedContent.slug}`}
    >
      <GatsbyImage
        image={image?.gatsbyImageData}
        alt={image?.description}
        className={
          tileWidth === "100%" ? styles.tileMedia : styles.tileMediaHalf
        }
      ></GatsbyImage>
      <div
        className={`${styles.textContainer} ${
          tileWidth === "100%"
            ? styles.textContainerFull
            : styles.textContainerHalf
        }`}
      >
        <div>
          <div>{artist}</div>
          <div>
            <em>{workTitle}</em>
          </div>
        </div>
        {location && (
          <div
            className={styles.location}
            dangerouslySetInnerHTML={{
              __html: location.childMarkdownRemark.html,
            }}
          ></div>
        )}
      </div>
    </Link>
  )
}

export default HomeTile
