import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "../components/artistPage.module.css"
import ExhibitionTile from "../components/exhibitionTile"
import MediaCarousel from "../components/mediaCarousel"

const Artist = ({ data }) => {
  const { name, exhibitions, headshot, featuredBiography, artworksCarousel } =
    data.contentfulArtist

  return (
    <Layout>
      <div className="pageContainer">
        <div className={styles.exhibitionsHeader}>
          <div className="pageHeading">{name}</div>
          <div className={styles.headerLinkContainer}>
            <a href="#art" activeClassName={styles.activeLink}>
              Artwork
            </a>
            <a activeClassName={styles.activeLink} href="#about">
              About
            </a>
            <a href="#exhibitions" activeClassName={styles.activeLink}>
              Exhibitions
            </a>
            <a activeClassName={styles.activeLink} href="#press">
              Press
            </a>
            <a activeClassName={styles.activeLink} href="#studio">
              Studio Visit
            </a>
            <a activeClassName={styles.activeLink} href="#video">
              Video
            </a>
            <a activeClassName={styles.activeLink} href="#publications">
              Publications
            </a>
          </div>
          <div></div>
        </div>
        {artworksCarousel && (
          <div id="art">
            <MediaCarousel media={artworksCarousel}></MediaCarousel>
          </div>
        )}
        <p className={styles.artistSectionHeading}>About</p>{" "}
        <div className={styles.aboutContainer} id="about">
          <GatsbyImage
            image={headshot?.image?.gatsbyImageData}
            alt={headshot?.image?.description}
            className={styles.artistImage}
          ></GatsbyImage>
          <div
            className={styles.artistBio}
            dangerouslySetInnerHTML={{
              __html: featuredBiography?.childMarkdownRemark.html,
            }}
          ></div>
        </div>
        {exhibitions && (
          <>
            <p className={styles.artistSectionHeading}>Exhibitions</p>{" "}
            <div id="exhibitions" className={styles.exhibitionContainer}>
              {" "}
              {exhibitions.map(exhibit => (
                <ExhibitionTile
                  key={exhibit.id}
                  content={exhibit}
                  artistPage={true}
                ></ExhibitionTile>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleArtist($slug: String) {
    contentfulArtist(slug: { eq: $slug }) {
      slug
      name
      featuredBiography {
        childMarkdownRemark {
          html
        }
      }
      headshot {
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
      exhibitions {
        artists {
          id
          name
        }
        id
        startDate
        endDate
        title
        slug
        location
        tileImage {
          image {
            description
            gatsbyImageData
          }
        }
      }
      artworksCarousel {
        caption {
          childMarkdownRemark {
            html
          }
        }
        id
        image {
          id
          gatsbyImageData
          width
          height
        }
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.contentfulArtist.name} />

export default Artist
