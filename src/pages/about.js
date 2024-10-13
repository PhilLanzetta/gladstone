import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/aboutPage.module.css"
import useWindowSize from "../utils/useWindowSize"

const About = ({ data }) => {
  const { width } = useWindowSize()
  const isMobile = width < 700
  const {
    aboutHeadlineText,
    leadershipColumn1,
    leadershipColumn2,
    leadershipColumn3,
    locations,
  } = data.contentfulAboutPage

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
    <Layout>
      <div className="pageContainer">
        <p className="pageHeading">About</p>
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
        <div>
          <p className={styles.aboutSectionHeading}>Leadership</p>
          <div className={styles.leadershipContainer}>
            <div className={styles.leadershipColumn}>
              {leadershipColumn1.map(leader => (
                <div key={leader.id}>
                  <p className={styles.leaderName}>{leader.name}</p>
                  <p className={styles.leaderTitle}>{leader.title}</p>
                </div>
              ))}
              {isMobile &&
                leadershipColumn2.map(leader => (
                  <div key={leader.id}>
                    <p className={styles.leaderName}>{leader.name}</p>
                    <p className={styles.leaderTitle}>{leader.title}</p>
                  </div>
                ))}
            </div>
            {!isMobile && (
              <div className={styles.leadershipColumn}>
                {leadershipColumn2.map(leader => (
                  <div key={leader.id}>
                    <p className={styles.leaderName}>{leader.name}</p>
                    <p className={styles.leaderTitle}>{leader.title}</p>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.leadershipColumn}>
              {leadershipColumn3.map(leader => (
                <div key={leader.id}>
                  <p className={styles.leaderName}>{leader.name}</p>
                  <p className={styles.leaderTitle}>{leader.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
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
      leadershipColumn1 {
        name
        id
        title
      }
      leadershipColumn2 {
        id
        name
        title
      }
      leadershipColumn3 {
        id
        name
        title
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
    }
  }
`

export default About
