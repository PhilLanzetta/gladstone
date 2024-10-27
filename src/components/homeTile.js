import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./homeTile.module.css"
import useWindowSize from "../utils/useWindowSize"
import ReactPlayer from "react-player"

const HomeTile = ({ tile }) => {
  const { artist, image, video, workTitle, location, tileWidth, link } = tile

  const { width } = useWindowSize()
  const isMobile = width < 700

  return (
    <a
      className={styles.tileContainer}
      style={isMobile ? { width: "100%" } : { width: tileWidth }}
      href={`${process.env.GATSBY_BASE_LINK}${link}`}
    >
      {image && (
        <GatsbyImage
          image={image?.gatsbyImageData}
          alt={image?.description}
          className={
            tileWidth === "100%" ? styles.tileMedia : styles.tileMediaHalf
          }
        ></GatsbyImage>
      )}
      {video && (
        <div
          className={
            tileWidth === "100%" ? styles.tileMedia : styles.tileMediaHalf
          }
        >
          <ReactPlayer
            url={video}
            width={"100%"}
            height={"100%"}
            playing={true}
            playsinline
            muted={true}
            controls={false}
            loop
            className={styles.videoPlayer}
          ></ReactPlayer>
        </div>
      )}
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
    </a>
  )
}

export default HomeTile
