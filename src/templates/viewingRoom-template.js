import React, { useState } from "react"
import { graphql } from "gatsby"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import * as styles from "../components/viewingRoom.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import useWindowSize from "../utils/useWindowSize"
import Slider from "react-slick"
import slugify from "slugify"

const ViewingRoom = ({ data }) => {
  const {
    title,
    featuredArtists,
    callToActionEmail,
    callToActionText,
    content,
  } = data.contentfulViewingRoom
  return (
    <div className="pageContainer">
      <div className="pageHeading">{title}</div>
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
          id
          caption {
            childMarkdownRemark {
              html
            }
          }
          image {
            gatsbyImageData
            description
          }
        }
        ... on ContentfulViewingRoomCarousel {
          id
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
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`

export default ViewingRoom
