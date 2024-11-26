import React, { useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./homeTile.module.css"
import useWindowSize from "../utils/useWindowSize"
import ReactPlayer from "react-player"
import { AnimatePresence, motion } from "framer-motion"

const HomeTile = ({ tile, pageContext }) => {
  const {
    artist,
    image,
    video,
    workTitle,
    location,
    tileWidth,
    link,
    mobileVideo,
    mobileImage,
    linkIsExternal,
  } = tile

  const { width } = useWindowSize()
  const isMobile = width < 700
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <a
      className={styles.tileContainer}
      style={isMobile ? { width: "100%" } : { width: tileWidth }}
      href={
        linkIsExternal
          ? link
          : `${process.env.GATSBY_BASE_LINK}/${pageContext.language}${link}`
      }
      target={linkIsExternal ? "_blank" : "_self"}
      rel="noreferrer"
    >
      {image && !video && (
        <GatsbyImage
          image={
            isMobile && mobileImage
              ? mobileImage?.gatsbyImageData
              : image?.gatsbyImageData
          }
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
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${styles.videoCover} ${
                  tileWidth === "100%" ? styles.tileMedia : styles.tileMediaHalf
                }`}
              >
                <GatsbyImage
                  image={
                    isMobile && mobileImage
                      ? mobileImage?.gatsbyImageData
                      : image?.gatsbyImageData
                  }
                  alt={image?.description}
                  className={
                    tileWidth === "100%"
                      ? styles.tileMedia
                      : styles.tileMediaHalf
                  }
                ></GatsbyImage>
              </motion.div>
            )}
          </AnimatePresence>
          <ReactPlayer
            url={isMobile && mobileVideo ? mobileVideo : video}
            width={"100%"}
            height={"100%"}
            playing={true}
            playsinline
            muted={true}
            controls={false}
            loop
            className={styles.videoPlayer}
            onStart={() => setTimeout(() => setIsPlaying(true), 500)}
            onError={() => setIsPlaying(false)}
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
