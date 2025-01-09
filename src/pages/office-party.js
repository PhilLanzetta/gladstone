import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/afterHours.module.css"
import { FormattedMessage } from "gatsby-plugin-intl"
import VideoPlayer from "../components/videoPlayer"
import AfterHoursCarousel from "../components/afterHoursCarousel"
import useWindowSize from "../utils/useWindowSize"
import Seo from "../components/seo"

const OfficeParty = ({ data, pageContext }) => {
  const { entries } = data.allContentfulAfterHoursPage.nodes[0]
  const { width } = useWindowSize()
  const isMobile = width < 701

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
        <FormattedMessage id="office_party"></FormattedMessage>
      </h1>
      <div className={styles.contentContainer}>
        {!isMobile && (
          <>
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
                      officeParty={true}
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
                      officeParty={true}
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
          </>
        )}
        {isMobile && (
          <div className={styles.mobileContainer}>
            {allData.map((item, index) => {
              if (item.entry.videoId) {
                return (
                  <div
                    key={index}
                    className={
                      item.isFeatured ? styles.mobileFull : styles.mobileHalf
                    }
                  >
                    <VideoPlayer
                      isFirst={index === 0}
                      video={item.entry}
                      videoId={item.entry.videoId}
                      activeVideo={activeVideo}
                      setActiveVideo={setActiveVideo}
                    ></VideoPlayer>
                  </div>
                )
              } else if (item.entry.carouselId) {
                return (
                  <div
                    key={index}
                    className={
                      item.isFeatured ? styles.mobileFull : styles.mobileHalf
                    }
                  >
                    <AfterHoursCarousel
                      images={item.entry.images}
                    ></AfterHoursCarousel>
                  </div>
                )
              } else {
                return (
                  <div
                    key={index}
                    className={
                      item.isFeatured ? styles.mobileFull : styles.mobileHalf
                    }
                  >
                    <a
                      href={
                        item.entry.isExternal
                          ? item.entry.link
                          : `${process.env.GATSBY_BASE_LINK}/${pageContext.language}${item.entry.link}`
                      }
                      target={item.entry.isExternal ? "_blank" : "_self"}
                      rel="noreferrer"
                    >
                      <GatsbyImage
                        image={item.entry.image?.gatsbyImageData}
                        alt={item.entry.image?.description}
                        className={styles.imageLink}
                      ></GatsbyImage>
                      <div>
                        {item.entry.title} {item.entry.isExternal ? "  ↗" : ""}
                      </div>
                    </a>
                  </div>
                )
              }
            })}
          </div>
        )}
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

export const Head = () => <Seo title="Office Party" />

export default OfficeParty
