import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/aboutPage.module.css"

const About = ({ data }) => {
  const { aboutHeadlineText, locations, leadershipstaff } =
    data.allContentfulAboutPage.nodes[0]

  const newYorkLocations = locations.filter(location =>
    location.streetAddress.childMarkdownRemark.html.includes("New York")
  )

  const brusselsLocations = locations.filter(location =>
    location.streetAddress.childMarkdownRemark.html.includes("Brussels")
  )

  const seoulLocations = locations.filter(location =>
    location.streetAddress.childMarkdownRemark.html.includes("Seoul")
  )

  return (
    <div className="pageContainer">
      <div
        className={styles.headlineText}
        dangerouslySetInnerHTML={{
          __html: aboutHeadlineText.childMarkdownRemark.html,
        }}
      ></div>
      <div className={styles.locationsOuterContainer}>
        <p className={styles.aboutSectionHeading}>
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
                  image={location.image.gatsbyImageData}
                  alt={location.image.description}
                  className={styles.locationImage}
                ></GatsbyImage>
                <div className={styles.grayBackground}></div>
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
          <p className={styles.aboutSectionHeading}>
            <FormattedMessage id="brussels.heading"></FormattedMessage>
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
                  image={location.image.gatsbyImageData}
                  alt={location.image.description}
                  className={styles.locationImage}
                ></GatsbyImage>
                <div className={styles.grayBackground}></div>
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
          <p className={styles.aboutSectionHeading}>
            <FormattedMessage id="seoul.heading"></FormattedMessage>
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
                  image={location.image.gatsbyImageData}
                  alt={location.image.description}
                  className={styles.locationImage}
                ></GatsbyImage>
                <div className={styles.grayBackground}></div>
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
        {leadershipstaff.map(section => (
          <div key={section.id} className={styles.staffOuterContainer}>
            <p className={styles.aboutSectionHeading}>{section.heading}</p>
            <div className={styles.staffContainer}>
              {section.staffMembers.map(staff => (
                <div key={staff.id} className={styles.staff}>
                  <p>{staff.name}</p>
                  <p className={styles.title}>{staff.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
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
          hours {
            childMarkdownRemark {
              html
            }
          }
        }
        leadershipstaff {
          id
          heading
          staffMembers {
            id
            name
            title
          }
        }
      }
    }
  }
`

export default About
