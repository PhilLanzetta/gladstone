import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import * as styles from "./homeTile.module.css"

const HomeTile = ({ tile }) => {
  const { artist, image, workTitle, location, tileWidth, linkedContent } = tile

  return (
    <Link
      className={styles.tileContainer}
      style={{ width: tileWidth }}
      to={`/artist/${linkedContent.slug}`}
    >
      <GatsbyImage
        image={image?.gatsbyImageData}
        alt={image?.description}
        className={
          tileWidth === "100%" ? styles.tileMedia : styles.tileMediaHalf
        }
      ></GatsbyImage>
      <div className={styles.textContainer}>
        <div>
          <div>{artist}</div>
          <div>
            <em>{workTitle}</em>
          </div>
        </div>
        <div className={styles.location}>
          <div>{location}</div>
        </div>
      </div>
    </Link>
  )
}

export default HomeTile
