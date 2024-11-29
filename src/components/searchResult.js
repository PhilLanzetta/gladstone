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
    isGladstoneArtist,
    featuredBiography,
    exhibitionDescription,
    startDate,
    endDate,
    tileImage,
    featuredImage,
    fairDescription,
    handle,
    metafield,
    newsText,
    newsImage,
    link,
  } = hit

  return (
    <>
      {searchCategory && (
        <div>
          {searchCategory === "Artist" && isGladstoneArtist && (
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
          {searchCategory === "Exhibition" && (
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
          {searchCategory === "News" && (
            <div className={styles.searchInfoContainer}>
              <div className={styles.searchInfoText}>
                <div className={styles.infoTextTop}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: newsText?.childMarkdownRemark.excerpt,
                    }}
                    className={styles.searchResultTitle}
                  ></div>
                  {link && (
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  )}
                </div>
                <p className={styles.category}>
                  <FormattedMessage id="news_events"></FormattedMessage>
                </p>
              </div>
              <GatsbyImage
                image={newsImage?.gatsbyImageData}
                alt={newsImage?.description}
                className={styles.searchResultImage}
              ></GatsbyImage>
            </div>
          )}
          {searchCategory === "Fair" && (
            <Link to={`/fair/${slug}`} className={styles.searchInfoContainer}>
              <div className={styles.searchInfoText}>
                <div className={styles.infoTextTop}>
                  <p className={styles.searchResultTitle}>{title}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: fairDescription?.childMarkdownRemark.excerpt,
                    }}
                  ></div>
                  <div className={styles.dates}>
                    {moment(startDate).format("MMMM D")} &mdash;{" "}
                    {moment(endDate).format("MMMM D, YYYY")}{" "}
                  </div>
                </div>
                <p className={styles.category}>
                  <FormattedMessage id="fair"></FormattedMessage>
                </p>
              </div>
              <GatsbyImage
                image={tileImage?.image.gatsbyImageData}
                alt={tileImage?.image.description}
                className={styles.searchResultImage}
              ></GatsbyImage>
            </Link>
          )}
          {searchCategory === "Shop" && (
            <Link to={`/shop/${handle}`} className={styles.searchInfoContainer}>
              <div className={styles.searchInfoText}>
                <div className={styles.infoTextTop}>
                  <p className={styles.searchResultTitle}>{metafield?.value}</p>
                  <p className={styles.searchResultTitle}>{title}</p>
                </div>
                <p className={styles.category}>
                  <FormattedMessage id="shop"></FormattedMessage>
                </p>
              </div>
              <GatsbyImage
                image={
                  featuredImage?.localFile?.childImageSharp?.gatsbyImageData
                }
                alt=""
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
