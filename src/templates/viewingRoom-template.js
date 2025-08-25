import React from "react"
import { graphql } from "gatsby"
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl"
import * as styles from "../components/viewingRoom.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import ViewingRoomCarousel from "../components/viewingRoomCarousel"
import Seo from "../components/seo"
import CTABanner from "../components/ctaBanner"

const ViewingRoom = ({ data }) => {
  const { title, content, fair, cta } = data.allContentfulViewingRoom.nodes[0]

  const featuredImage = content[0]
  const remainingContent = content.slice(1)
  const featuredArtists = fair
    ? fair[0].artists?.sort((a, b) => a.lastName - b.lastName)
    : null

  return (
    <>
      <div className="pageContainer">
        <div className={styles.exhibitionsHeader}>
          <div className="pageHeading">
            <FormattedMessage id="viewing-room-preview"></FormattedMessage>
          </div>
          <div className={styles.headerLinkContainer}>
            {featuredArtists && (
              <a href="#featured-artists" className={styles.landingLink}>
                <FormattedMessage id="artists"></FormattedMessage>
              </a>
            )}
            <a href="#featured-art">
              <FormattedMessage id="artwork"></FormattedMessage>
            </a>
          </div>
        </div>
        <div className={styles.title}>{title}</div>
        {featuredArtists && (
          <div
            id="featured-artists"
            className={styles.featuredArtistsContainer}
          >
            <div className={styles.featuredHeading}>
              <FormattedMessage id="artists"></FormattedMessage>
            </div>
            <div className={styles.featuredArtists}>
              {featuredArtists.map(artist => (
                <a
                  className={styles.listArtistLink}
                  href={`#${artist.slug}`}
                  key={artist.id}
                >
                  {artist.name}
                </a>
              ))}
            </div>
          </div>
        )}
        <div className={styles.fullWidthImg}>
          <GatsbyImage
            image={featuredImage.image?.gatsbyImageData}
            alt={featuredImage.image?.description}
          ></GatsbyImage>
        </div>

        <div
          id="featured-art"
          className={styles.featuredArtistsContainer}
        ></div>
        <div>
          {remainingContent.map(item => {
            if (item.fullImgId) {
              return (
                <div className={styles.fullWidthImg} key={item.fullImgId}>
                  <GatsbyImage
                    image={item.image.gatsbyImageData}
                    alt={item.image.description}
                  ></GatsbyImage>
                </div>
              )
            } else if (item.carouselId) {
              return (
                <ViewingRoomCarousel
                  item={item}
                  title={title}
                  key={item.carouselId}
                ></ViewingRoomCarousel>
              )
            } else return null
          })}
        </div>
      </div>
      {cta && <CTABanner cta={cta} context={title}></CTABanner>}
    </>
  )
}

export const query = graphql`
  query getSingleViewingRoom($slug: String, $locale: String) {
    allContentfulViewingRoom(
      filter: {
        node_locale: { eq: $locale }
        fair: { elemMatch: { slug: { eq: $slug } } }
      }
    ) {
      nodes {
        title
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
        fair {
          artists {
            id
            name
            lastName
            slug
          }
        }
        content {
          ... on ContentfulImageWrapper {
            fullImgId: id
            caption {
              childMarkdownRemark {
                html
              }
            }
            image {
              gatsbyImageData(layout: FULL_WIDTH)
              description
            }
          }
          ... on ContentfulViewingRoomCarousel {
            carouselId: id
            artist {
              name
              slug
            }
            callToActionEmail
            carouselAlignment
            slides {
              caption {
                childMarkdownRemark {
                  html
                }
              }
              id
              image {
                description
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title="Viewing Room" />

export default injectIntl(ViewingRoom)
