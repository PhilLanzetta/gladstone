import React from "react"
import * as styles from "./exhibitionTile.module.css"
import moment from "moment"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ExhibitionTile = ({ content, artistPage }) => {
  const {
    title,
    artists,
    endDate,
    startDate,
    tileImage,
    region,
    slug,
    location,
  } = content
  return (
    <div className={styles.tileContainer}>
      <Link to={`/exhibit/${slug}`}>
        <GatsbyImage
          image={tileImage.image.gatsbyImageData}
          alt={tileImage.image.description}
          className={styles.tileImage}
        ></GatsbyImage>
        <div className={styles.exhibitInfo}>
          <div className={styles.infoLeft}>
            {artists?.map(artist => (
              <p key={artist.id}>{artist.name !== title && artist.name}</p>
            ))}
            <p className={styles.infoHeading}>{title}</p>
            {artistPage && <p className={styles.infoHeading}>{location}</p>}
            <p className={styles.date}>
              {moment(startDate).format("MMMM D")} &mdash;{" "}
              {moment(endDate).format("MMMM D, YYYY")}{" "}
            </p>
          </div>
          <div className={styles.infoRight}>
            <p>{region !== "Offsite" ? region : location}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ExhibitionTile
