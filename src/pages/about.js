import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/aboutPage.module.css"
import useWindowSize from "../utils/useWindowSize"

const About = ({ data }) => {
  const { width } = useWindowSize()
  const isMobile = width < 700
  const { aboutHeadlineText, locations, leadershipstaff } =
    data.contentfulAboutPage

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
          <p className={styles.aboutSectionHeading}>New York</p>
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
            <p className={styles.aboutSectionHeading}>Brussels</p>
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
            <p className={styles.aboutSectionHeading}>Seoul</p>
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
  query {
    contentfulAboutPage {
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
`

export default About
