import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import Layout from "../components/layout"
import * as styles from "../components/artistPage.module.css"
import ExhibitionTile from "../components/exhibitionTile"
import MediaCarousel from "../components/mediaCarousel"
import moment from "moment"
import VariedWidthCarousel from "../components/variedWidthCarousel"
import useWindowSize from "../utils/useWindowSize"
import SimpleCarousel from "../components/simpleCarousel"
import PdfDownload from "../components/pdfDownload"

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
    callToActionText,
    callToActionEmail,
    aboutDownloads,
  } = data.contentfulArtist

  const { width } = useWindowSize()
  const isMobile = width < 700

  return (
    <Layout>
      <div className="pageContainer">
        <div className={styles.exhibitionsHeader}>
          <div className="pageHeading">{name}</div>
          <div className={styles.headerLinkContainer}>
            {artworksCarousel && (
              <a href="#art" className={styles.landingLink}>
                Artwork
              </a>
            )}
            <a href="#about">About</a>
            {exhibitions && <a href="#exhibitions">Exhibitions</a>}
            {press && <a href="#press">Press</a>}
            {studioVisit && <a href="#studio">Studio Visit</a>}
            {videos && <a href="#video">Video</a>}
            <a href="#publications">Publications</a>
          </div>
        </div>
        {artworksCarousel && (
          <div id="art">
            {isMobile ? (
              <SimpleCarousel
                images={artworksCarousel}
                slideCount={1.15}
              ></SimpleCarousel>
            ) : (
              <MediaCarousel media={artworksCarousel}></MediaCarousel>
            )}
          </div>
        )}
        <p className={styles.artistSectionHeading}>About</p>{" "}
        <div className={styles.aboutContainer} id="about">
          <div className={styles.artistImage}>
            <GatsbyImage
              image={headshot?.image?.gatsbyImageData}
              alt={headshot?.image?.description}
            ></GatsbyImage>
          </div>
          <div className={styles.artistBio}>
            <div
              dangerouslySetInnerHTML={{
                __html: featuredBiography?.childMarkdownRemark.html,
              }}
            ></div>
            <div className={styles.downloadContainer}>
              {aboutDownloads &&
                aboutDownloads.map(pdf => (
                  <PdfDownload key={pdf.id} content={pdf}></PdfDownload>
                ))}
            </div>
          </div>
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
                <div key={pressItem.id} className={styles.pressItem}>
                  <p>{pressItem.author}</p>
                  <p>{pressItem.title}</p>
                  <p>{pressItem.publication}</p>
                  <p className={styles.pressSecondary}>
                    {moment(pressItem.date).format("MMMM D, YYYY")}
                  </p>
                  {pressItem.articlePdf && (
                    <a
                      className={styles.pressSecondaryLink}
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
                      className={styles.pressSecondaryLink}
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
            <div id="studio" className={styles.studioContainer}>
              {isMobile ? (
                <SimpleCarousel
                  images={studioVisit}
                  slideCount={1.15}
                ></SimpleCarousel>
              ) : (
                <VariedWidthCarousel images={studioVisit}></VariedWidthCarousel>
              )}
            </div>
          </>
        )}
        {videos && (
          <>
            <p className={styles.artistSectionHeading}>Video</p>
            <div id="video">
              <SimpleCarousel
                videos={videos}
                slideCount={isMobile ? 1.15 : 1.5}
              ></SimpleCarousel>
            </div>
          </>
        )}
        {callToActionText && (
          <div className={styles.callToActionContainer}>
            <h2
              dangerouslySetInnerHTML={{
                __html: callToActionText.childMarkdownRemark.html,
              }}
            ></h2>
            <a href={`mailto:${callToActionEmail}`} className={styles.ctaLink}>
              Inquire here
            </a>
          </div>
        )}
      </div>
      <Link to="/artists" className={styles.explore}>
        Explore Gladstone Artists
      </Link>
    </Layout>
  )
}

export const query = graphql`
  query getSingleArtist($slug: String) {
    contentfulArtist(slug: { eq: $slug }) {
      slug
      name
      videos {
        id
        caption {
          childMarkdownRemark {
            html
          }
        }
        coverImage {
          gatsbyImageData
          description
        }
        source
      }
      callToActionText {
        childMarkdownRemark {
          html
        }
      }
      callToActionEmail
      featuredBiography {
        childMarkdownRemark {
          html
        }
      }
      aboutDownloads {
        buttonText
        pdfFile {
          file {
            url
          }
        }
        id
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
