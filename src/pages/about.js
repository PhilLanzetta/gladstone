import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/aboutPage.module.css"
import useWindowSize from "../utils/useWindowSize"
import Seo from "../components/seo"

const About = ({ data }) => {
  const { width } = useWindowSize()
  const isMobile = width < 701
  const { aboutHeadlineText, locations } = data.allContentfulAboutPage.nodes[0]

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
          <div className={styles.staffContainer}>
            <div className={styles.staff}>
              <p>Max Falkenstein</p>
              <p className={styles.title}>Senior Partner</p>
            </div>
            <div className={styles.staff}>
              <p>Gavin Brown</p>
              <p className={styles.title}>Partner</p>
            </div>
            <div className={`${styles.staff} ${styles.mobileHide}`}></div>
            <div className={`${styles.staff} ${styles.mobileHide}`}></div>
            <div className={styles.staff}>
              <p>Caroline Luce</p>
              <p className={styles.title}>Partner</p>
            </div>
            <div className={styles.staff}>
              <p>Paula Tsai</p>
              <p className={styles.title}>Partner</p>
            </div>
          </div>
        </div>
        <div className={styles.staffOuterContainer}>
          <p
            className={`${styles.aboutSectionHeadingSub} ${styles.extraSpace}`}
          >
            Sales
          </p>
          <div className={styles.staffContainer}>
            <div className={styles.staff}>
              <p>Trina Gordon</p>
              <p className={styles.title}>Senior Director</p>
            </div>
            <div className={styles.staff}>
              <p>Aaron Baldinger</p>
              <p className={styles.title}>Director</p>
            </div>
            <div className={styles.staff}>
              <p>Alissa Bennett</p>
              <p className={styles.title}>Director</p>
            </div>
            <div className={`${styles.staff} ${styles.mobileHide}`}></div>
            <div className={styles.staff}>
              <p>Julian Ehrlich</p>
              <p className={styles.title}>Director</p>
            </div>
            <div className={styles.staff}>
              <p>Maia Gianakos</p>
              <p className={styles.title}>Director</p>
            </div>
            <div className={styles.staff}>
              <p>Cooke Maroney</p>
              <p className={styles.title}>Director</p>
            </div>
            <div className={`${styles.staff} ${styles.mobileHide}`}></div>
            <div className={styles.staff}>
              <p>Giulia Ruberti</p>
              <p className={styles.title}>Director</p>
            </div>

            <div className={styles.staff}>
              <p>Frederick Schampers</p>
              <p className={styles.title}>Director</p>
            </div>
          </div>
          <div className={styles.staffContainer}>
            <div className={styles.staff}>
              <p>Erik Savercool</p>
              <p className={styles.title}>Associate Director</p>
            </div>
            <div className={styles.staff}>
              <p>Caressa Yan</p>
              <p className={styles.title}>Associate Director</p>
            </div>
          </div>
          <div className={styles.staffContainer}>
            <div className={styles.staff}>
              <p>Maxime de la Brousse</p>
              <p className={styles.title}>Director, Brussels</p>
            </div>
          </div>
          <div className={styles.staffContainer}>
            <div className={styles.staff}>
              <p>Jiwoong Jeong</p>
              <p className={styles.title}>Associate Director, Seoul</p>
            </div>
            <div className={styles.staff}>
              <p>Wonn Jeong</p>
              <p className={styles.title}>Associate Director, Seoul</p>
            </div>
            <div className={styles.staff}>
              <p>Qinrui Hua</p>
              <p className={styles.title}>Associate Director, Beijing</p>
            </div>
          </div>
        </div>
        <div className={styles.staffOuterContainer}>
          <p className={`${styles.aboutSectionHeading} ${styles.extraSpace}`}>
            Contact
          </p>
          <div className={styles.staffContainer}>
            <div className={styles.staff}>
              <p>Sales Inquiries</p>
              <p className={styles.title}>
                <a href="mailto:gg_sales@gladstonegallery.com">
                  sales@gladstonegallery.com
                </a>
              </p>
            </div>
            <div className={styles.staff}>
              <p>Press Inquiries</p>
              <p className={styles.title}>
                <a href="mailto:press@gladstonegallery.com">
                  press@gladstonegallery.com
                </a>
              </p>
            </div>
            <div className={styles.staff}>
              <p>General</p>
              <p className={styles.title}>
                <a href="mailto:info@gladstonegallery.com">
                  info@gladstonegallery.com
                </a>
              </p>
            </div>
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

export const Head = () => <Seo title="About" />

export default About
