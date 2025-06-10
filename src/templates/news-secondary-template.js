import React from "react"
import { graphql } from "gatsby"
import * as styles from "../components/newsSecondary.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import { FormattedMessage, Link } from "gatsby-plugin-intl"
import PdfDownload from "../components/pdfDownload"

const NewsSecond = ({ data }) => {
  const { bodyContent, downloads, dates, location, headlineText, heroImage } =
    data.allContentfulNewsSecondaryPage.nodes[0]
  return (
    <>
      <div className="pageContainer">
        <div className="pageHeading">
          <FormattedMessage id="news_events"></FormattedMessage>
        </div>
        {heroImage && (
          <GatsbyImage
            className={styles.heroImage}
            image={heroImage.gatsbyImageData}
            alt={heroImage.description}
          ></GatsbyImage>
        )}
        {headlineText && (
          <div
            className={styles.headlineText}
            dangerouslySetInnerHTML={{
              __html: headlineText.childMarkdownRemark.html,
            }}
          ></div>
        )}
        <div className={styles.bodyContainer}>
          <div className={styles.sideBody}>
            {location && <p>{location}</p>}
            {dates && <p>{dates}</p>}
            {downloads &&
              downloads.map(download => {
                if (download.pdfId) {
                  return (
                    <PdfDownload
                      key={download.pfdId}
                      content={download}
                    ></PdfDownload>
                  )
                }
                if (download.linkId) {
                  return (
                    <PdfDownload
                      key={download.linkId}
                      external
                      content={download}
                    ></PdfDownload>
                  )
                } else return null
              })}
          </div>
          <div className={styles.centerBody}>
            {bodyContent &&
              bodyContent.map(content => {
                if (content.bodyTextId) {
                  return (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: content.text?.childMarkdownRemark.html,
                      }}
                      className={styles.bodyText}
                    ></div>
                  )
                }
                if (content.bodyImageId) {
                  return (
                    <figure className={styles.bodyImage}>
                      {content.image && (
                        <GatsbyImage
                          image={content.image.gatsbyImageData}
                          alt={content.image.description}
                        ></GatsbyImage>
                      )}

                      {content.caption && (
                        <figcaption
                          dangerouslySetInnerHTML={{
                            __html: content.caption.childMarkdownRemark.html,
                          }}
                          className={styles.figcaption}
                        ></figcaption>
                      )}
                    </figure>
                  )
                } else return null
              })}
          </div>
          <div className={styles.sideBody}></div>
        </div>
      </div>
      <Link to="/news" className={styles.explore}>
        <FormattedMessage id="explore_news"></FormattedMessage>
      </Link>
    </>
  )
}

export const query = graphql`
  query getSingleNews($slug: String, $locale: String) {
    allContentfulNewsSecondaryPage(
      filter: { node_locale: { eq: $locale }, slug: { eq: $slug } }
    ) {
      nodes {
        bodyContent {
          ... on ContentfulImageWrapper {
            bodyImageId: id
            image {
              gatsbyImageData(layout: FULL_WIDTH)
              description
            }
            caption {
              childMarkdownRemark {
                html
              }
            }
          }
          ... on ContentfulTextModule {
            bodyTextId: id
            text {
              childMarkdownRemark {
                html
              }
            }
          }
        }
        downloads {
          ... on ContentfulExternalLink {
            linkId: id
            label
            url
          }
          ... on ContentfulPdfDownload {
            pdfId: id
            buttonText
            pdfFile {
              file {
                url
              }
            }
          }
        }
        dates
        location
        headlineText {
          childMarkdownRemark {
            html
          }
        }
        heroImage {
          gatsbyImageData(layout: FULL_WIDTH)
          description
        }
      }
    }
  }
`

export default NewsSecond
