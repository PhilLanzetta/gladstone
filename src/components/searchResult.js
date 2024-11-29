import React from "react"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./searchResult.module.css"
import moment from "moment"

const Hit = ({ hit }) => {
  const {
    title,
    slug,
    searchCategory,
    name,
    artists,
    featuredBiography,
    exhibitionDescription,
    startDate,
    endDate,
    tileImage,
    featuredImage,
  } = hit

  return (
    <>
      {searchCategory && (
        <div>
          {searchCategory === "artist" && (
            <Link to={`/artist/${slug}`} className={styles.searchInfoContainer}>
              <div className={styles.searchInfoText}>
                <div className={styles.infoTextTop}>
                  <p className={styles.searchResultTitle}>{name}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: featuredBiography?.childMarkdownRemark.excerpt,
                    }}
                    className={styles.artistBio}
                  ></div>
                </div>
                <p className={styles.category}>
                  <FormattedMessage id="artist"></FormattedMessage>
                </p>
              </div>
              <GatsbyImage
                image={featuredImage?.image.gatsbyImageData}
                alt={featuredImage?.image.description}
                className={styles.searchResultImage}
              ></GatsbyImage>
            </Link>
          )}{" "}
          {searchCategory === "exhibition" && (
            <Link
              to={`/exhibit/${slug}`}
              className={styles.searchInfoContainer}
            >
              <div className={styles.searchInfoText}>
                <div className={styles.infoTextTop}>
                  <p className={styles.searchResultTitle}>
                    {artists && artists[0].name + " — "}
                    {title}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        exhibitionDescription?.childMarkdownRemark.excerpt,
                    }}
                  ></div>
                  <div className={styles.dates}>
                    {moment(startDate).format("MMMM D")} &mdash;{" "}
                    {moment(endDate).format("MMMM D, YYYY")}{" "}
                  </div>
                </div>
                <p className={styles.category}>
                  <FormattedMessage id="exhibition"></FormattedMessage>
                </p>
              </div>
              <GatsbyImage
                image={tileImage?.image.gatsbyImageData}
                alt={tileImage?.image.description}
                className={styles.searchResultImage}
              ></GatsbyImage>
            </Link>
          )}
        </div>
      )}
    </>
  )
}

export default Hit
