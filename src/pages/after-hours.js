import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/afterHours.module.css"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import SimpleCarousel from "../components/simpleCarousel"
import VideoPlayer from "../components/videoPlayer"
import AfterHoursCarousel from "../components/afterHoursCarousel"

const AfterHours = ({ data, pageContext }) => {
  const { entries } = data.allContentfulAfterHoursPage.nodes[0]

  const allData = entries
  const featuredData = entries
    .filter(entry => entry.isFeatured === true)
    .map(entry => entry.entry)
  const notFeaturedData = entries
    .filter(entry => entry.isFeatured === false)
    .map(entry => entry.entry)

 const [activeVideo, setActiveVideo] = useState(featuredData[0].videoId)

  return (
    <div className="pageContainer">
      <h1 className="pageHeading">
        <FormattedMessage id="after_hours"></FormattedMessage>
      </h1>
      <div className={styles.contentContainer}>
        <div className={styles.featuredContainer}>
          {featuredData.map((entry, index) => {
            if (entry.videoId) {
              return (
                <VideoPlayer
                  key={index}
                  isFirst={index === 0}
                  video={entry}
                  videoId={entry.videoId}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                ></VideoPlayer>
              )
            } else if (entry.carouselId) {
              return (
                <AfterHoursCarousel
                  key={index}
                  images={entry.images}
                ></AfterHoursCarousel>
              )
            } else {
              return (
                <div key={index}>
                  <a
                    href={
                      entry.isExternal
                        ? entry.link
                        : `${process.env.GATSBY_BASE_LINK}/${pageContext.language}${entry.link}`
                    }
                    target={entry.isExternal ? "_blank" : "_self"}
                    rel="noreferrer"
                  >
                    <GatsbyImage
                      image={entry.image?.gatsbyImageData}
                      alt={entry.image?.description}
                      className={styles.imageLink}
                    ></GatsbyImage>
                    <div>
                      {entry.title} {entry.isExternal ? "  ↗" : ""}
                    </div>
                  </a>
                </div>
              )
            }
          })}
        </div>
        <div className={styles.notFeaturedContainer}>
          {notFeaturedData.map((entry, index) => {
            if (entry.videoId) {
              return (
                <VideoPlayer
                  key={index}
                  video={entry}
                  videoId={entry.videoId}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                ></VideoPlayer>
              )
            } else if (entry.carouselId) {
              return (
                <AfterHoursCarousel
                  key={index}
                  images={entry.images}
                ></AfterHoursCarousel>
              )
            } else {
              return (
                <div key={index}>
                  <a
                    href={
                      entry.isExternal
                        ? entry.link
                        : `${process.env.GATSBY_BASE_LINK}/${pageContext.language}${entry.link}`
                    }
                    target={entry.isExternal ? "_blank" : "_self"}
                    rel="noreferrer"
                  >
                    <GatsbyImage
                      image={entry.image?.gatsbyImageData}
                      alt={entry.image?.description}
                      className={styles.imageLink}
                    ></GatsbyImage>
                    <div>
                      {entry.title} {entry.isExternal ? "  ↗" : ""}
                    </div>
                  </a>
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query contentfulAfter($locale: String) {
    allContentfulAfterHoursPage(filter: { node_locale: { eq: $locale } }) {
      nodes {
        id
        entries {
          entry {
            ... on ContentfulAfterHoursCarousel {
              carouselId: id
              images {
                id
                caption {
                  childMarkdownRemark {
                    html
                  }
                }
                image {
                  description
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
            ... on ContentfulLinkWithImage {
              linkId: id
              image {
                description
                gatsbyImageData(layout: FULL_WIDTH)
              }
              isExternal
              link
              title
            }
            ... on ContentfulVideoWrapper {
              videoId: id
              aspectRatio
              caption {
                childMarkdownRemark {
                  html
                }
              }
              coverImage {
                description
                gatsbyImageData(layout: FULL_WIDTH)
              }
              source
            }
          }
          isFeatured
        }
      }
    }
  }
`

export default AfterHours
