import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "../components/artistPage.module.css"
import ExhibitionTile from "../components/exhibitionTile"
import MediaCarousel from "../components/mediaCarousel"
import moment from "moment"
import SimpleCarousel from "../components/simpleCarousel"

const Artist = ({ data }) => {
  const {
    name,
    exhibitions,
    headshot,
    featuredBiography,
    artworksCarousel,
    press,
    studioVisit,
    videos,
  } = data.contentfulArtist

  return (
    <Layout>
      <div className="pageContainer">
        <div className={styles.exhibitionsHeader}>
          <div className="pageHeading">{name}</div>
          <div className={styles.headerLinkContainer}>
            {artworksCarousel && (
              <a href="#art" activeClassName={styles.activeLink}>
                Artwork
              </a>
            )}
            <a activeClassName={styles.activeLink} href="#about">
              About
            </a>
            {exhibitions && (
              <a href="#exhibitions" activeClassName={styles.activeLink}>
                Exhibitions
              </a>
            )}
            {press && (
              <a activeClassName={styles.activeLink} href="#press">
                Press
              </a>
            )}
            {studioVisit && (
              <a activeClassName={styles.activeLink} href="#studio">
                Studio Visit
              </a>
            )}
            {videos && (
              <a activeClassName={styles.activeLink} href="#video">
                Video
              </a>
            )}
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
        {press && (
          <>
            <p className={styles.artistSectionHeading}>Press</p>
            <div id="press" className={styles.pressContainer}>
              {press.map(pressItem => (
                <div key={pressItem.id}>
                  <p>{pressItem.author}</p>
                  <p>{pressItem.title}</p>
                  <p>{pressItem.publication}</p>
                  <p className={styles.pressSecondary}>
                    {moment(pressItem.date).format("MMMM D, YYYY")}
                  </p>
                  {pressItem.articlePdf && (
                    <a
                      className={styles.pressSecondary}
                      href={pressItem.articlePdf.file.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download PDF &darr;
                    </a>
                  )}
                  {pressItem.articleLink && (
                    <a
                      href={pressItem.articleLink}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.pressSecondary}
                    >
                      View Website &#8599;
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        {studioVisit && (
          <>
            <p className={styles.artistSectionHeading}>Studio Visit</p>
            <div id="studio">
              <SimpleCarousel
                images={studioVisit}
                slideCount={2.5}
              ></SimpleCarousel>
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
      videos
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
      press {
        id
        articleLink
        date
        articlePdf {
          file {
            url
          }
        }
        author
        publication
        title
      }
      studioVisit {
        image {
          description
          gatsbyImageData
          height
          width
        }
        caption {
          childMarkdownRemark {
            html
          }
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
