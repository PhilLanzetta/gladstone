import React from "react"
import { graphql } from "gatsby"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import * as styles from "../components/artistPage.module.css"
import ExhibitionTile from "../components/exhibitionTile"
import MediaCarousel from "../components/mediaCarousel"
import VariedWidthCarousel from "../components/variedWidthCarousel"
import useWindowSize from "../utils/useWindowSize"
import SimpleCarousel from "../components/simpleCarousel"
import PdfDownload from "../components/pdfDownload"
import Pagination from "../components/pagination"

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

  const publications = data.allShopifyProduct.nodes

  const { width } = useWindowSize()
  const isMobile = width < 700

  return (
    <>
      <div className="pageContainer">
        <div className={styles.exhibitionsHeader}>
          <div className="pageHeading">{name}</div>
          <div className={styles.headerLinkContainer}>
            {artworksCarousel && (
              <a href="#art" className={styles.landingLink}>
                <FormattedMessage id="artwork"></FormattedMessage>
              </a>
            )}
            <a href="#about">
              <FormattedMessage id="about"></FormattedMessage>
            </a>
            {exhibitions && (
              <a href="#exhibitions">
                <FormattedMessage id="exhibitions"></FormattedMessage>
              </a>
            )}
            {publications && (
              <a href="#publications">
                <FormattedMessage id="publications"></FormattedMessage>
              </a>
            )}
            {press && (
              <a href="#press">
                <FormattedMessage id="press"></FormattedMessage>
              </a>
            )}
            {studioVisit && (
              <a href="#studio">
                <FormattedMessage id="studio_visit"></FormattedMessage>
              </a>
            )}
            {videos && (
              <a href="#video">
                <FormattedMessage id="video"></FormattedMessage>
              </a>
            )}
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
        <p className={styles.artistSectionHeading}>
          <FormattedMessage id="about"></FormattedMessage>
        </p>{" "}
        <div className={styles.aboutContainer} id="about">
          {headshot && (
            <div className={styles.artistImage}>
              <GatsbyImage
                image={headshot?.image?.gatsbyImageData}
                alt={headshot?.image?.description}
              ></GatsbyImage>
            </div>
          )}
          <div className={headshot ? styles.artistBio : styles.artistBioFull}>
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
            <p className={styles.artistSectionHeading}>
              <FormattedMessage id="exhibitions"></FormattedMessage>
            </p>{" "}
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
        {publications && (
          <>
            <p className={styles.artistSectionHeading}>
              <FormattedMessage id="publications"></FormattedMessage>
            </p>
            <div id="publications" className={styles.pressContainer}>
              <Pagination
                type="product"
                data={publications}
                showNum={6}
              ></Pagination>
            </div>
          </>
        )}
        {press && (
          <>
            <p className={styles.artistSectionHeading}>
              <FormattedMessage id="press"></FormattedMessage>
            </p>
            <div id="press" className={styles.pressContainer}>
              <Pagination type="press" data={press} showNum={8}></Pagination>
            </div>
          </>
        )}
        {studioVisit && (
          <>
            <p className={styles.artistSectionHeading}>
              <FormattedMessage id="studio_visit"></FormattedMessage>
            </p>
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
            <p className={styles.artistSectionHeading}>
              <FormattedMessage id="video"></FormattedMessage>
            </p>
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
              <FormattedMessage id="inquire_here"></FormattedMessage>
            </a>
          </div>
        )}
      </div>
      <Link to="/artists" className={styles.explore}>
        <FormattedMessage id="explore"></FormattedMessage>
      </Link>
    </>
  )
}

export const query = graphql`
  query getSingleArtist($slug: String, $name: String) {
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
        aspectRatio
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
    allShopifyProduct(
      filter: {
        collections: { elemMatch: { title: { eq: "Publications" } } }
        metafields: {
          elemMatch: { key: { eq: "artist" }, value: { eq: $name } }
        }
      }
    ) {
      nodes {
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        handle
        id
        title
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        totalInventory
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.contentfulArtist.name} />

export default Artist
