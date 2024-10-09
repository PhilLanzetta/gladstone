import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import moment from "moment"
import * as styles from "../components/exhibitPage.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import MediaCarousel from "../components/mediaCarousel"

const Exhibit = ({ data }) => {
  const {
    title,
    artists,
    endDate,
    exhibitionDescription,
    featuredImage,
    installationMedia,
    startDate,
    location,
    openingReception,
    workMedia,
  } = data.contentfulExhibition
  return (
    <Layout>
      <div className="pageContainer">
        <Link to="/exhibitions" className="pageHeading">
          Exhibitions
        </Link>
        <div className={styles.aboveTheFold}>
          <div className={styles.aboveLeft}>
            {artists?.map(artist => (
              <p key={artist.id} className={styles.aboveHeading}>
                {artist.name}
              </p>
            ))}
            <p className={styles.aboveHeading}>{title}</p>
            <p className={styles.aboveInfo}>
              {moment(startDate).format("MMMM D")} &mdash;{" "}
              {moment(endDate).format("MMMM D, YYYY")}{" "}
            </p>
            {openingReception && (
              <p className={styles.aboveInfo}>
                Opening Reception: {openingReception}
              </p>
            )}
            <p className={styles.aboveInfo}>{location}</p>
            <div className={styles.aboveDescription}>
              {exhibitionDescription.exhibitionDescription}
            </div>
          </div>
          <div className={styles.aboveRight}>
            <GatsbyImage
              image={featuredImage.image.gatsbyImageData}
              alt={featuredImage.image.description}
            ></GatsbyImage>
          </div>
        </div>
        {installationMedia && (
          <div className={styles.carouselHolder}>
            <p className={styles.aboveHeading}>Installation</p>
            <MediaCarousel media={installationMedia}></MediaCarousel>
          </div>
        )}
        {workMedia && (
          <div className={styles.carouselHolder}>
            <p className={styles.aboveHeading}>Work</p>
            <MediaCarousel media={workMedia}></MediaCarousel>
          </div>
        )}
        {artists && artists.length > 0 && (
          <>
            <p className={styles.aboveHeading}>About</p>
            {artists.map(artist => (
              <div key={artist.id} className={styles.artistContainer}>
                <Link
                  to={`/artist/${artist.slug}`}
                  className={styles.artistLink}
                >
                  <GatsbyImage
                    image={artist.featuredImage?.image?.gatsbyImageData}
                    alt={artist.featuredImage?.image?.description}
                    className={styles.artistImage}
                  ></GatsbyImage>
                </Link>
                <div
                  className={styles.artistBio}
                  dangerouslySetInnerHTML={{
                    __html: artist.featuredBiography?.childMarkdownRemark.html,
                  }}
                ></div>
              </div>
            ))}
          </>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleExhibit($slug: String) {
    contentfulExhibition(slug: { eq: $slug }) {
      artists {
        id
        name
        slug
        featuredBiography {
          childMarkdownRemark {
            html
          }
        }
        featuredImage {
          caption {
            childMarkdownRemark {
              html
            }
          }
          image {
            description
            gatsbyImageData
          }
        }
      }
      endDate
      exhibitionDescription {
        exhibitionDescription
      }
      featuredImage {
        image {
          description
          gatsbyImageData
        }
      }
      installationMedia {
        image {
          description
          gatsbyImageData
        }
        caption {
          childMarkdownRemark {
            html
          }
        }
        id
      }
      location
      openingReception
      startDate
      title
      workMedia {
        caption {
          childMarkdownRemark {
            html
          }
        }
        id
        image {
          description
          gatsbyImageData
        }
      }
    }
  }
`

export default Exhibit
