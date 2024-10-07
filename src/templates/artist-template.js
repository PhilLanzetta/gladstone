import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "../components/artistPage.module.css"
import ExhibitionTile from "../components/exhibitionTile"

const Artist = ({ data }) => {
  const { name, exhibition, featuredImage, featuredBiography } =
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
            <a activeClassName={styles.activeLink} href="#about">
              Biography
            </a>
            <a activeClassName={styles.activeLink} href="#about">
              Bibliography
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
        <p className={styles.artistSectionHeading}>About</p>{" "}
        <div className={styles.aboutContainer} id="about">
          <GatsbyImage
            image={featuredImage?.image?.gatsbyImageData}
            alt={featuredImage?.image?.description}
            className={styles.artistImage}
          ></GatsbyImage>
          <div
            className={styles.artistBio}
            dangerouslySetInnerHTML={{
              __html: featuredBiography?.childMarkdownRemark.html,
            }}
          ></div>
        </div>
        {exhibition && (
          <>
            <p className={styles.artistSectionHeading}>Exhibitions</p>{" "}
            <div id="exhibitions" className={styles.exhibtionContainer}>
              {" "}
              {exhibition.map(exhibit => (
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
      exhibition {
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
    }
  }
`

export const Head = ({ data }) => <Seo title={data.contentfulArtist.name} />

export default Artist
