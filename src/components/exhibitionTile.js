import React from "react"
import * as styles from "./exhibitionTile.module.css"
import moment from "moment"
import { GatsbyImage } from "gatsby-plugin-image"
import { FormattedMessage, Link } from "gatsby-plugin-intl"
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
          image={tileImage?.image?.gatsbyImageData}
          alt={tileImage?.image?.description}
          className={styles.tileImage}
        ></GatsbyImage>
        <div className={styles.exhibitInfo}>
          <div className={styles.infoLeft}>
            {!fair &&
              artists?.map(artist => (
                <h2
                  key={artist.id}
                  className={
                    mobilePast ? styles.mobileHeading : styles.infoHeading
                  }
                >
                  {artist.name}
                </h2>
              ))}
            <h3
              className={`${
                mobilePast ? styles.mobileHeading : styles.infoHeading
              } ${styles.title}`}
            >
              {!titleIsArtist && (
                <span dangerouslySetInnerHTML={{ __html: title }}></span>
              )}
            </h3>
            {artistPage && <p className={styles.infoHeading}>{location}</p>}
            {mobilePast && (
              <p className={styles.mobileHeading}>
                {region && region !== "Offsite" ? (
                  <FormattedMessage
                    id={region.toLowerCase().replace(" ", "_")}
                  ></FormattedMessage>
                ) : (
                  location
                )}
              </p>
            )}
            <p className={styles.date}>
              {moment(startDate).year() === moment(endDate).year() ? (
                <span>
                  {moment(startDate).format("MMMM D")} &mdash;
                  {moment(endDate).format("MMMM D, YYYY")}
                </span>
              ) : (
                <span>
                  {moment(startDate).format("MMMM D, YYYY")} &mdash;{" "}
                  {moment(endDate).format("MMMM D, YYYY")}
                </span>
              )}
            </p>
          </div>
          {!mobilePast && (
            <div className={styles.infoRight}>
              <h3 className={styles.infoHeading}>
                {!fair &&
                  region &&
                  (region !== "Offsite" ? (
                    <FormattedMessage
                      id={region.toLowerCase().replace(" ", "_")}
                    ></FormattedMessage>
                  ) : (
                    location
                  ))}
                {fair && city}
              </h3>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default ExhibitionTile
