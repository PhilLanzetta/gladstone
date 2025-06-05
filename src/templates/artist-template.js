import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { Link, FormattedMessage, injectIntl } from "gatsby-plugin-intl"
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
import moment from "moment"
import { AnimatePresence, motion } from "framer-motion"
import CtaBanner from "../components/ctaBanner"

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
    flexSectionTitle,
    aboutDownloads,
    publications,
    cta,
  } = data.allContentfulArtist.nodes[0]

  const allPublications = data.allShopifyProduct.nodes

  const orderedPublications = publications
    ?.map(handle => allPublications?.filter(pub => pub.handle === handle))
    .flat()

  const initialPress = press?.slice(0, 8)
  const morePress = press?.length > 8

  const { width } = useWindowSize()
  const isMobile = width < 700

  const [pressOpen, setPressOpen] = useState(false)

  useEffect(() => {
    if (pressOpen === true) {
      const scrollY = window.scrollY
      const body = document.body
      body.style.position = "fixed"
      body.style.top = `-${scrollY}px`
    } else {
      const body = document.body
      const scrollY = body.style.top
      body.style.position = ""
      body.style.top = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [pressOpen])

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
                {flexSectionTitle ? (
                  flexSectionTitle
                ) : (
                  <FormattedMessage id="studio_visit"></FormattedMessage>
                )}
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
              <figcaption
                className={styles.artistImgCaption}
                dangerouslySetInnerHTML={{
                  __html: headshot?.caption?.childMarkdownRemark.html,
                }}
              ></figcaption>
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
                page="artist"
                data={orderedPublications}
                showNum={6}
              ></Pagination>
            </div>
          </>
        )}
        {press && (
          <>
            <p className={styles.artistSectionHeading}>
              <FormattedMessage id="featured_press"></FormattedMessage>
            </p>
            <div id="press" className={styles.paginationContainer}>
              {initialPress.map(pressItem => (
                <div key={pressItem.id} className={styles.pressItem}>
                  <p>{pressItem.title}</p>
                  {pressItem.articleLink ? (
                    <a
                      href={pressItem.articleLink}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.pressPub}
                    >
                      <em>{pressItem.publication}</em> &#8599;
                    </a>
                  ) : (
                    <p className={styles.pressPub}>
                      <em>{pressItem.publication}</em>
                    </p>
                  )}
                  <p className={styles.pressPub}>{pressItem.author}</p>
                  <p className={styles.pressSecondary}>
                    {pressItem.showDate === false
                      ? moment(pressItem.date).format("MMMM, YYYY")
                      : moment(pressItem.date).format("MMMM D, YYYY")}
                  </p>
                  {pressItem.articlePdf && (
                    <a
                      className={styles.pressSecondaryLink}
                      href={pressItem.articlePdf.file.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FormattedMessage id="download_pdf"></FormattedMessage>{" "}
                      &darr;
                    </a>
                  )}
                </div>
              ))}
              {morePress && (
                <button
                  onClick={() => setPressOpen(true)}
                  className={styles.loadMoreBtn}
                >
                  <FormattedMessage id="view_more"></FormattedMessage>
                </button>
              )}
            </div>
            <AnimatePresence>
              {pressOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.pressPopUp}
                >
                  <div className={styles.paginationOuter}>
                    <p className={styles.artistPressSectionHeading}>
                      <FormattedMessage id="press"></FormattedMessage>
                      <button
                        className={styles.closePress}
                        onClick={() => setPressOpen(false)}
                      >
                        <svg
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 31L31 1" stroke="black" />
                          <path d="M1 1L31 31" stroke="black" />
                        </svg>
                      </button>
                    </p>
                    <div id="press" className={styles.paginationContainer}>
                      {press.map(pressItem => (
                        <div key={pressItem.id} className={styles.pressItem}>
                          <p>{pressItem.title}</p>
                          {pressItem.articleLink ? (
                            <a
                              href={pressItem.articleLink}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.pressPub}
                            >
                              <em>{pressItem.publication}</em> &#8599;
                            </a>
                          ) : (
                            <p className={styles.pressPub}>
                              <em>{pressItem.publication}</em>
                            </p>
                          )}
                          <p className={styles.pressPub}>{pressItem.author}</p>
                          <p className={styles.pressSecondary}>
                            {pressItem.showDate === false
                              ? moment(pressItem.date).format("MMMM, YYYY")
                              : moment(pressItem.date).format("MMMM D, YYYY")}
                          </p>
                          {pressItem.articlePdf && (
                            <a
                              className={styles.pressSecondaryLink}
                              href={pressItem.articlePdf.file.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FormattedMessage id="download_pdf"></FormattedMessage>{" "}
                              &darr;
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        {studioVisit && (
          <>
            <p className={styles.artistSectionHeading}>
              {flexSectionTitle ? (
                flexSectionTitle
              ) : (
                <FormattedMessage id="studio_visit"></FormattedMessage>
              )}
            </p>
            <div id="studio" className={styles.studioContainer}>
              {isMobile ? (
                <SimpleCarousel
                  content={studioVisit}
                  slideCount={1.15}
                ></SimpleCarousel>
              ) : (
                <VariedWidthCarousel
                  content={studioVisit}
                ></VariedWidthCarousel>
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
              <SimpleCarousel videos={videos} slideCount={1}></SimpleCarousel>
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
      {cta && <CtaBanner cta={cta}></CtaBanner>}
      <Link to="/artists" className={styles.explore}>
        <FormattedMessage id="explore"></FormattedMessage>
      </Link>
    </>
  )
}

export const query = graphql`
  query getSingleArtist($slug: String, $name: String, $locale: String) {
    allContentfulArtist(
      filter: { node_locale: { eq: $locale }, slug: { eq: $slug } }
    ) {
      nodes {
        slug
        name
        cta {
          backgroundImage {
            description
            gatsbyImageData
          }
          buttonText
          buttonType
          headlineText
          subtitle
          textColor
        }
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
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        press {
          id
          articleLink
          date
          showDay
          articlePdf {
            file {
              url
            }
          }
          author
          publication
          title
        }
        publications
        flexSectionTitle
        studioVisit {
          ... on ContentfulImageWrapper {
            studioImgId: id
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
    allShopifyProduct(
      filter: {
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
        metafields {
          key
          value
        }
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.allContentfulArtist.nodes[0].name} />
)

export default injectIntl(Artist)
