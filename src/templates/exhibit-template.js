import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import moment from "moment"
import * as styles from "../components/exhibitPage.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import MediaCarousel from "../components/mediaCarousel"
import useWindowSize from "../utils/useWindowSize"
import SimpleCarousel from "../components/simpleCarousel"
import ExhibitionTile from "../components/exhibitionTile"
import PdfDownload from "../components/pdfDownload"

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
    relatedContent,
    relatedHeading,
    aboutDownloads,
  } = data.contentfulExhibition

  const { width } = useWindowSize()
  const isMobile = width < 700

  return (
    <Layout>
      <div className="pageContainer">
        <Link to="/exhibitions" className={styles.pageHeading}>
          Exhibitions
        </Link>
        <div className={styles.aboveTheFold}>
          <div className={styles.aboveLeft}>
            {artists?.map(artist => (
              <p key={artist.id} className={styles.aboveHeading}>
                {artist.name !== title && artist.name}
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
            {aboutDownloads && (
              <div className={styles.downloadContainer}>
                {aboutDownloads.map(item => (
                  <PdfDownload key={item.id} content={item}></PdfDownload>
                ))}
              </div>
            )}
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
            <p className={styles.sectionHeading}>Installation</p>
            {isMobile ? (
              <SimpleCarousel
                images={installationMedia}
                slideCount={1.15}
              ></SimpleCarousel>
            ) : (
              <MediaCarousel media={installationMedia}></MediaCarousel>
            )}
          </div>
        )}
        {workMedia && (
          <div className={styles.carouselHolder}>
            <p className={styles.sectionHeading}>Work</p>
            {isMobile ? (
              <SimpleCarousel
                images={workMedia}
                slideCount={1.15}
              ></SimpleCarousel>
            ) : (
              <MediaCarousel media={workMedia}></MediaCarousel>
            )}
          </div>
        )}
        {artists && artists.length > 0 && (
          <>
            <p className={styles.sectionHeading}>About</p>
            {artists.map(artist => (
              <div key={artist.id} className={styles.artistContainer}>
                <GatsbyImage
                  image={artist.headshot?.image?.gatsbyImageData}
                  alt={artist.headshot?.image?.description}
                  className={styles.artistImage}
                ></GatsbyImage>
                <div className={styles.artistBio}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        artist.featuredBiography?.childMarkdownRemark.html,
                    }}
                  ></div>
                  <Link
                    to={`/artist/${artist.slug}`}
                    className={styles.artistLink}
                  >
                    View Artist Page <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
        {relatedContent && (
          <div>
            <p className={styles.sectionHeading}>{relatedHeading}</p>
            <div className={styles.relatedContainer}>
              {relatedContent.map(content => {
                if (content.artistId) {
                  const { artistId, slug, featuredImage, name } = content
                  return (
                    <div key={artistId}>
                      <Link
                        to={`/artist/${slug}`}
                        className={styles.relatedArtistLink}
                      >
                        <div className={styles.artistTile}>
                          <GatsbyImage
                            image={featuredImage?.image.gatsbyImageData}
                            alt={featuredImage?.description}
                            className={styles.relatedTileImage}
                          ></GatsbyImage>
                          <p className={styles.relatedInfoText}>{name}</p>
                        </div>
                      </Link>
                    </div>
                  )
                } else if (content.exhibitId) {
                  return (
                    <ExhibitionTile
                      key={content.exhibitId}
                      content={content}
                    ></ExhibitionTile>
                  )
                } else {
                  return <div>Unknown Content</div>
                }
              })}
            </div>
          </div>
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
      aboutDownloads {
        id
        buttonText
        pdfFile {
          file {
            url
          }
        }
      }
      installationMedia {
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
          height
          width
        }
      }
      relatedHeading
      relatedContent {
        ... on ContentfulArtist {
          artistId: id
          name
          featuredImage {
            image {
              description
              gatsbyImageData
            }
          }
          slug
        }
        ... on ContentfulExhibition {
          exhibitId: id
          slug
          artists {
            id
            name
          }
          tileImage {
            image {
              description
              gatsbyImageData
            }
          }
          location
          region
          startDate
          endDate
        }
      }
    }
  }
`

export default Exhibit
