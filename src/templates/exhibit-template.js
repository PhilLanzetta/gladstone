import React from "react"
import { graphql } from "gatsby"
import { Link, FormattedMessage, injectIntl } from "gatsby-plugin-intl"
import moment from "moment"
import * as styles from "../components/exhibitPage.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import MediaCarousel from "../components/mediaCarousel"
import useWindowSize from "../utils/useWindowSize"
import SimpleCarousel from "../components/simpleCarousel"
import ExhibitionTile from "../components/exhibitionTile"
import PdfDownload from "../components/pdfDownload"
import NewsItem from "../components/newsItem"
import Seo from "../components/seo"

const Exhibit = ({ data, pageContext }) => {
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
    additionalLocations,
  } = data.allContentfulExhibition.nodes[0]

  const { width } = useWindowSize()
  const isMobile = width < 700
  const hasGladstoneArtist =
    artists && artists.filter(artist => artist.isGladstoneArtist === true)

  return (
    <div className="pageContainer">
      <Link to="/exhibitions" className={styles.pageHeading}>
        <FormattedMessage id="exhibitions"></FormattedMessage>
      </Link>
      <div className={styles.aboveTheFold}>
        <div className={styles.aboveLeft}>
          {artists?.map(artist => (
            <p key={artist.id} className={styles.aboveHeading}>
              {artist.name !== title && artist.name}
            </p>
          ))}
          <p className={styles.aboveHeading}>
            <em dangerouslySetInnerHTML={{ __html: title }}></em>
          </p>
          <p className={styles.aboveInfo}>
            {moment(startDate).format("MMMM D")} &mdash;{" "}
            {moment(endDate).format("MMMM D, YYYY")}{" "}
          </p>
          {openingReception && (
            <p className={styles.aboveInfo}>
              <FormattedMessage id="opening_reception"></FormattedMessage>:{" "}
              {openingReception}
            </p>
          )}
          <p className={styles.aboveInfo}>{location}</p>
          {additionalLocations &&
            additionalLocations.map((entry, index) => (
              <p className={styles.aboveInfo} key={index}>
                {entry}
              </p>
            ))}
          {exhibitionDescription && (
            <div
              className={styles.aboveDescription}
              dangerouslySetInnerHTML={{
                __html: exhibitionDescription.childMarkdownRemark.html,
              }}
            ></div>
          )}
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
          <p className={styles.sectionHeading}>
            <FormattedMessage id="installation"></FormattedMessage>
          </p>
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
          <p className={styles.sectionHeading}>
            <FormattedMessage id="work"></FormattedMessage>
          </p>
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
      {hasGladstoneArtist?.length > 0 && (
        <>
          <p className={styles.sectionHeading}>
            <FormattedMessage id="about"></FormattedMessage>
          </p>
          {hasGladstoneArtist.map(artist => (
            <div key={artist.id} className={styles.artistContainer}>
              {artist.headshot && (
                <div className={styles.artistImage}>
                  <GatsbyImage
                    image={artist.headshot?.image?.gatsbyImageData}
                    alt={artist.headshot?.image?.description}
                  ></GatsbyImage>
                  <figcaption
                    className={styles.artistImgCaption}
                    dangerouslySetInnerHTML={{
                      __html:
                        artist.headshot?.caption?.childMarkdownRemark.html,
                    }}
                  ></figcaption>
                </div>
              )}
              <div
                className={
                  artist.headshot ? styles.artistBio : styles.artistBioFull
                }
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: artist.featuredBiography?.childMarkdownRemark.html,
                  }}
                ></div>
                <Link
                  to={`/artist/${artist.slug}`}
                  className={styles.artistLink}
                >
                  <FormattedMessage id="view_artist_page"></FormattedMessage>{" "}
                  <span>&rarr;</span>
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
                    <Link to={`/artist/${slug}`}>
                      <div>
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
              } else if (content.fairId) {
                return (
                  <ExhibitionTile
                    key={content.fairId}
                    content={content}
                    fair={true}
                  ></ExhibitionTile>
                )
              } else if (content.linkId) {
                return (
                  <div key={content.linkId}>
                    {content.isExternal ? (
                      <a
                        href={content.linkImgLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GatsbyImage
                          image={content.image?.gatsbyImageData}
                          alt={content.image?.description}
                          className={styles.relatedTileImage}
                        ></GatsbyImage>
                        <div className={styles.relatedInfoText}>
                          {content.title}↗
                        </div>
                      </a>
                    ) : (
                      <Link to={content.linkImgLink}>
                        <GatsbyImage
                          image={content.image?.gatsbyImageData}
                          alt={content.image?.description}
                          className={styles.relatedTileImage}
                        ></GatsbyImage>
                        <div className={styles.relatedInfoText}>
                          {content.title}
                        </div>
                      </Link>
                    )}
                  </div>
                )
              } else if (content.newsId) {
                return (
                  <NewsItem
                    key={content.newsId}
                    content={content}
                    related={true}
                  ></NewsItem>
                )
              } else {
                return <div>Unknown Content</div>
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query getSingleExhibit($slug: String, $locale: String) {
    allContentfulExhibition(
      filter: { node_locale: { eq: $locale }, slug: { eq: $slug } }
    ) {
      nodes {
        artists {
          id
          name
          isGladstoneArtist
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
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
        endDate
        exhibitionDescription {
          childMarkdownRemark {
            html
          }
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
        additionalLocations
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
          ... on ContentfulFair {
            fairId: id
            slug
            tileImage {
              image {
                gatsbyImageData
                description
              }
            }
            endDate
            startDate
            title
          }
          ... on ContentfulLinkWithImage {
            linkId: id
            image {
              description
              gatsbyImageData
            }
            isExternal
            linkImgLink: link
            title
          }
          ... on ContentfulNewsEntry {
            newsId: id
            newsImage {
              description
              gatsbyImageData
            }
            newsText {
              childMarkdownRemark {
                html
              }
            }
            link {
              label
              url
            }
            download {
              buttonText
              pdfFile {
                file {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.allContentfulExhibition.nodes[0].title} />
)

export default injectIntl(Exhibit)
