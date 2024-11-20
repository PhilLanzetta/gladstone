import React, { useState } from "react"
import { graphql } from "gatsby"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import moment from "moment"
import * as styles from "../components/exhibitPage.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import useWindowSize from "../utils/useWindowSize"
import PdfDownload from "../components/pdfDownload"
import Slider from "react-slick"

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to next"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.carouselSVG}
        viewBox="0 0 13.047 28.672"
      >
        <path
          id="Polygon_3"
          data-name="Polygon 3"
          d="M0,12.009,14.011,0,28.021,12.009"
          transform="translate(12.389 0.325) rotate(90)"
          fill="none"
          stroke="#000"
          stroke-width="1"
        />
      </svg>
    </div>
  )
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      aria-label="go to previous"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.carouselSVG}
        viewBox="0 0 13.047 28.672"
      >
        <path
          id="Polygon_4"
          data-name="Polygon 4"
          d="M0,12.009,14.011,0,28.021,12.009"
          transform="translate(0.659 28.346) rotate(-90)"
          fill="none"
          stroke="#000"
          stroke-width="1"
        />
      </svg>
    </div>
  )
}

const Fair = ({ data }) => {
  const {
    title,
    endDate,
    fairDescription,
    featuredImages,
    startDate,
    location,
    openingReception,
    aboutDownloads,
    aboutLinks,
    viewingRoomPreview,
    slug,
  } = data.contentfulFair

  const [activeSlide, setActiveSlide] = useState(0)

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
    afterChange: current => setActiveSlide(current),
  }

  const { width } = useWindowSize()
  const isMobile = width < 700

  return (
    <div className="pageContainer">
      <Link to="/fairs" className={styles.pageHeading}>
        <FormattedMessage id="fairs"></FormattedMessage>
      </Link>
      <div className={styles.aboveTheFold}>
        <div className={styles.aboveLeft}>
          <p className={styles.aboveHeading}>{title}</p>
          <p className={styles.aboveInfo}>
            {moment(startDate).format("MMMM D")} &mdash;{" "}
            {moment(endDate).format("MMMM D, YYYY")}{" "}
          </p>
          {openingReception && (
            <p className={styles.aboveInfo}>
              <FormattedMessage id="opening_reception"></FormattedMessage>{" "}
              {openingReception}
            </p>
          )}
          {location && (
            <p
              className={styles.aboveInfo}
              dangerouslySetInnerHTML={{
                __html: location.childMarkdownRemark.html,
              }}
            ></p>
          )}
          {fairDescription && (
            <div
              className={styles.aboveDescription}
              dangerouslySetInnerHTML={{
                __html: fairDescription.childMarkdownRemark.html,
              }}
            ></div>
          )}
          <div className={styles.downloadContainer}>
            {aboutLinks &&
              aboutLinks.map(item => (
                <PdfDownload
                  key={item.id}
                  content={item}
                  external={true}
                ></PdfDownload>
              ))}
            {aboutDownloads &&
              aboutDownloads.map(item => (
                <PdfDownload key={item.id} content={item}></PdfDownload>
              ))}
          </div>
        </div>
        <div className={styles.fairAboveRight}>
          <Slider {...settings}>
            {featuredImages.map(featuredImage => (
              <div key={featuredImage.id}>
                <div className={styles.fairSlide}>
                  <GatsbyImage
                    image={featuredImage.image.gatsbyImageData}
                    alt={featuredImage.image.description}
                    className={styles.fairImage}
                  ></GatsbyImage>
                </div>
              </div>
            ))}
          </Slider>
          {featuredImages?.length > 1 && (
            <div className={styles.slideCount}>
              {Math.round(activeSlide + 1)} / {featuredImages.length}
            </div>
          )}
        </div>
      </div>
      {viewingRoomPreview && (
        <div>
          <Link to={`/fair/${slug}/viewing-room`}>
            <FormattedMessage id="viewing-room-preview"></FormattedMessage> →
          </Link>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query getSingleFair($slug: String) {
    contentfulFair(slug: { eq: $slug }) {
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
      fairDescription {
        childMarkdownRemark {
          html
        }
      }
      featuredImages {
        id
        image {
          description
          gatsbyImageData
        }
      }
      aboutLinks {
        id
        label
        url
      }
      location {
        childMarkdownRemark {
          html
        }
      }
      startDate
      title
      slug
      viewingRoomPreview {
        id
      }
    }
  }
`

export default Fair
