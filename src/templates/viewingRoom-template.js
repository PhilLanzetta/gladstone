import React, { useState } from "react"
import { graphql } from "gatsby"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import * as styles from "../components/viewingRoom.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import slugify from "slugify"
import ViewingRoomCarousel from "../components/viewingRoomCarousel"

const ViewingRoom = ({ data }) => {
  const {
    title,
    featuredArtists,
    callToActionEmail,
    callToActionText,
    content,
  } = data.contentfulViewingRoom

  const featuredImage = content[0]
  const remainingContent = content.slice(1)

  return (
    <div className="pageContainer">
      <div className={styles.exhibitionsHeader}>
        <div className="pageHeading">
          <FormattedMessage id="viewing-room-preview"></FormattedMessage>
        </div>
        <div className={styles.headerLinkContainer}>
          <a href="#featured-artists" className={styles.landingLink}>
            <FormattedMessage id="featured_artists"></FormattedMessage>
          </a>
          <a href="#featured-art">
            <FormattedMessage id="featured_art"></FormattedMessage>
          </a>
        </div>
      </div>
      <div className={styles.title}>{title}</div>
      <div id="featured-artists" className={styles.featuredArtistsContainer}>
        <div className={styles.featuredHeading}>
          <FormattedMessage id="featured_artists"></FormattedMessage>
        </div>
        <div className={styles.featuredArtists}>
          {featuredArtists.map(artist => (
            <a
              className={styles.listArtistLink}
              href={`#${slugify(artist, { lower: true })}`}
            >
              {artist}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.fullWidthImg}>
        <GatsbyImage
          image={featuredImage.image.gatsbyImageData}
          alt={featuredImage.image.description}
        ></GatsbyImage>
      </div>
      <div id="featured-art" className={styles.featuredArtistsContainer}>
        <div className={styles.featuredHeading}>
          <FormattedMessage id="featured_art"></FormattedMessage>
        </div>
      </div>
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
            return <ViewingRoomCarousel item={item}></ViewingRoomCarousel>
          } else return null
        })}
      </div>
    </div>
  )
}

export const query = graphql`
  query getSingleViewingRoom($slug: String) {
    contentfulViewingRoom(fair: { elemMatch: { slug: { eq: $slug } } }) {
      title
      featuredArtists
      callToActionEmail
      callToActionText {
        childMarkdownRemark {
          html
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
          artist
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
`

export default ViewingRoom
