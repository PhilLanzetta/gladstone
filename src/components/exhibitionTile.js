import React from "react"
import * as styles from "./exhibitionTile.module.css"
import moment from "moment"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import useWindowSize from "../utils/useWindowSize"

const ExhibitionTile = ({ content, artistPage, past, fair }) => {
  const {
    title,
    artists,
    endDate,
    startDate,
    tileImage,
    region,
    slug,
    location,
    city,
  } = content

  const { width } = useWindowSize()
  const mobilePast = width < 1100 && past
  const titleIsArtist = artists?.filter(artist => artist.name === title).length

  return (
    <div className={past ? styles.tileContainerPast : styles.tileContainer}>
      <Link to={`${fair ? "/fair/" : "/exhibit/"}${slug}`}>
        <GatsbyImage
          image={tileImage?.image.gatsbyImageData}
          alt={tileImage?.image.description}
          className={styles.tileImage}
        ></GatsbyImage>
        <div className={styles.exhibitInfo}>
          <div className={styles.infoLeft}>
            {!fair &&
              artists?.map(artist => (
                <p
                  key={artist.id}
                  className={
                    mobilePast ? styles.mobileHeading : styles.infoHeading
                  }
                >
                  {artist.name}
                </p>
              ))}
            <p
              className={`${
                mobilePast ? styles.mobileHeading : styles.infoHeading
              } ${styles.title}`}
            >
              {!titleIsArtist && title}
            </p>
            {artistPage && <p className={styles.infoHeading}>{location}</p>}
            {mobilePast && (
              <p className={styles.mobileHeading}>
                {region !== "Offsite" ? region : location}
              </p>
            )}
            <p className={styles.date}>
              {moment(startDate).format("MMMM D")} &mdash;{" "}
              {moment(endDate).format("MMMM D, YYYY")}{" "}
            </p>
          </div>
          {!mobilePast && (
            <div className={styles.infoRight}>
              <p className={styles.infoHeading}>
                {!fair && region !== "Offsite" ? region : location}
                {fair && city}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default ExhibitionTile
