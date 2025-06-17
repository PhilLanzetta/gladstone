import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/aboutPage.module.css"
import useWindowSize from "../utils/useWindowSize"
import Seo from "../components/seo"

const About = ({ data }) => {
  const { width } = useWindowSize()
  const isMobile = width < 841
  const { aboutHeadlineText, locations, staffLeadership, staffSales, contact } =
    data.allContentfulAboutPage.nodes[0]

  const newYorkLocations = locations.filter(
    location =>
      location.streetAddress.childMarkdownRemark.html.includes("New York") ||
      location.streetAddress.childMarkdownRemark.html.includes("纽约") ||
      location.streetAddress.childMarkdownRemark.html.includes("뉴욕")
  )

  const brusselsLocations = locations.filter(
    location =>
      location.streetAddress.childMarkdownRemark.html.includes("Brussels") ||
      location.streetAddress.childMarkdownRemark.html.includes("브뤼셀") ||
      location.streetAddress.childMarkdownRemark.html.includes("布鲁塞尔")
  )

  const seoulLocations = locations.filter(
    location =>
      location.streetAddress.childMarkdownRemark.html.includes("Seoul") ||
      location.streetAddress.childMarkdownRemark.html.includes("汉城") ||
      location.streetAddress.childMarkdownRemark.html.includes("서울")
  )

  const allSales = staffSales.map(row => row.staffEntry).flat()

  return (
    <div className="pageContainer">
      <div
        className={styles.headlineText}
        dangerouslySetInnerHTML={{
          __html: aboutHeadlineText.childMarkdownRemark.html,
        }}
      ></div>
      <div className={styles.locationsOuterContainer}>
        <p className={styles.aboutSectionHeading} id="new_york">
          <FormattedMessage id="new_york"></FormattedMessage>
        </p>
        <div className={styles.locationContainer}>
          {newYorkLocations.map(location => (
            <div key={location.id} className={styles.locationTile}>
              <a
                href={location.googleMapLink}
                className={styles.locationLink}
                target="_blank"
                rel="noreferrer"
              >
                <GatsbyImage
                  image={
                    isMobile
                      ? location.mobileImage?.gatsbyImageData
                      : location.image?.gatsbyImageData
                  }
                  alt={location.image.description}
                  className={styles.locationImage}
                ></GatsbyImage>
              </a>
              <div
                className={styles.address}
                dangerouslySetInnerHTML={{
                  __html: location.streetAddress.childMarkdownRemark.html,
                }}
              ></div>
              <a href={`tel:${location.telephone}`}>{location.telephone}</a>
              <div
                className={styles.hours}
                dangerouslySetInnerHTML={{
                  __html: location.hours.childMarkdownRemark.html,
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className={styles.worldLocationContainer}>
          <p className={styles.aboutSectionHeading} id="brussels">
            <FormattedMessage id="brussels"></FormattedMessage>
          </p>
          {brusselsLocations.map(location => (
            <div key={location.id} className={styles.locationTile}>
              <a
                href={location.googleMapLink}
                className={styles.locationLink}
                target="_blank"
                rel="noreferrer"
              >
                <GatsbyImage
                  image={
                    isMobile
                      ? location.mobileImage?.gatsbyImageData
                      : location.image?.gatsbyImageData
                  }
                  alt={location.image.description}
                  className={styles.locationImage}
                ></GatsbyImage>
              </a>
              <div
                className={styles.address}
                dangerouslySetInnerHTML={{
                  __html: location.streetAddress.childMarkdownRemark.html,
                }}
              ></div>
              <a href={`tel:${location.telephone}`}>{location.telephone}</a>
              <div
                dangerouslySetInnerHTML={{
                  __html: location.hours.childMarkdownRemark.html,
                }}
                className={styles.hours}
              ></div>
            </div>
          ))}
        </div>
        <div className={styles.worldLocationContainer}>
          <p className={styles.aboutSectionHeading} id="seoul">
            <FormattedMessage id="seoul"></FormattedMessage>
          </p>
          {seoulLocations.map(location => (
            <div key={location.id} className={styles.locationTile}>
              <a
                href={location.googleMapLink}
                className={styles.locationLink}
                target="_blank"
                rel="noreferrer"
              >
                <GatsbyImage
                  image={
                    isMobile
                      ? location.mobileImage?.gatsbyImageData
                      : location.image?.gatsbyImageData
                  }
                  alt={location.image.description}
                  className={styles.locationImage}
                ></GatsbyImage>
              </a>
              <div
                className={styles.address}
                dangerouslySetInnerHTML={{
                  __html: location.streetAddress.childMarkdownRemark.html,
                }}
              ></div>
              <a href={`tel:${location.telephone}`}>{location.telephone}</a>
              <div
                className={styles.hours}
                dangerouslySetInnerHTML={{
                  __html: location.hours.childMarkdownRemark.html,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div id="staff">
        <div className={styles.staffOuterContainer}>
          <p className={styles.aboutSectionHeading}>Staff</p>
          <p className={styles.aboutSectionHeadingSub}>Leadership</p>
          <div className={styles.leadershipContainer}>
            {staffLeadership &&
              staffLeadership.map(row => (
                <div key={row.id} className={styles.leadershipInner}>
                  {row.staffEntry.map(entry => (
                    <div className={styles.staff} key={entry.id}>
                      <p>{entry.name}</p>
                      <p className={styles.title}>{entry.title}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
        <div className={styles.staffOuterContainer}>
          <p
            className={`${styles.aboutSectionHeadingSub} ${styles.extraSpace}`}
          >
            Sales
          </p>
          <div className={styles.staffContainer}>
            {staffSales &&
              !isMobile &&
              staffSales.map(row => (
                <div key={row.id} className={styles.staffInner}>
                  {row.staffEntry.map(entry => (
                    <div className={styles.staff} key={entry.id}>
                      <p>{entry.name}</p>
                      <p className={styles.title}>{entry.title}</p>
                    </div>
                  ))}
                </div>
              ))}
            {staffSales && isMobile && (
              <div className={styles.staffInner}>
                {allSales.map(entry => (
                  <div className={styles.staff} key={entry.id}>
                    <p>{entry.name}</p>
                    <p className={styles.title}>{entry.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.staffOuterContainer}>
          <p className={`${styles.aboutSectionHeading} ${styles.extraSpace}`}>
            Contact
          </p>
          <div className={styles.staffContainer}>
            {contact &&
              contact.map(row => (
                <div key={row.id} className={styles.staffInner}>
                  {row.staffEntry.map(entry => (
                    <div className={styles.staff} key={entry.id}>
                      <p>{entry.name}</p>
                      <p
                        className={styles.title}
                        dangerouslySetInnerHTML={{ __html: entry.title }}
                      ></p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query contentfulAbout($locale: String) {
    allContentfulAboutPage(filter: { node_locale: { eq: $locale } }) {
      nodes {
        aboutHeadlineText {
          childMarkdownRemark {
            html
          }
        }
        locations {
          id
          googleMapLink
          streetAddress {
            childMarkdownRemark {
              html
            }
          }
          telephone
          image {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
          mobileImage {
            gatsbyImageData(layout: FULL_WIDTH)
          }
          hours {
            childMarkdownRemark {
              html
            }
          }
        }
        staffLeadership {
          id
          staffEntry {
            id
            name
            title
          }
        }
        staffSales {
          id
          staffEntry {
            id
            name
            title
          }
        }
        contact {
          id
          staffEntry {
            name
            title
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title="About" />

export default About
