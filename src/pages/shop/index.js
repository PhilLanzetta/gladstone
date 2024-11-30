import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import { FormattedMessage, Link } from "gatsby-plugin-intl"
import * as styles from "../../components/shop.module.css"
import Slider from "react-slick"
import { GatsbyImage } from "gatsby-plugin-image"
import Pagination from "../../components/pagination"
import slugify from "slugify"

const Shop = ({ data }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef(null)

  const settings = {
    slidesToShow: 1,
    infinite: true,
    useTransform: false,
    dots: false,
    arrows: false,
    draggable: true,
    afterChange: current => {
      setActiveSlide(current)
    },
  }

  const collections = data.allShopifyCollection.nodes
  const featured = data.contentfulFeaturedShopCarousel.slides
  const newProducts = collections.filter(
    collection => collection.handle === "new-releases"
  )[0]
  // const publications = collections.filter(
  //   collection => collection.handle === "publications"
  // )[0]

  // const ephemera = collections.filter(
  //   collection => collection.handle === "ephemera"
  // )[0]

  // const clothing = collections.filter(
  //   collection => collection.handle === "clothing"
  // )[0]

  const artists = data.allShopifyMetafield.nodes
    .map(node => node.value)
    .filter(onlyUnique)
    .sort((a, b) => a.split(" ").pop().localeCompare(b.split(" ").pop()))

  return (
    <div className="shopPageContainer">
      <Slider {...settings} className={styles.sliderContainer} ref={sliderRef}>
        {featured.map(slide => (
          <div key={slide.id} className={styles.featuredSlide}>
            <Link to={`/shop/${slide.productHandle}`}>
              <GatsbyImage
                image={slide.image.gatsbyImageData}
                alt={slide.image.description}
                className={styles.carouselImg}
              ></GatsbyImage>
            </Link>
          </div>
        ))}
      </Slider>
      <div className={styles.underCarousel}>
        <div>
          <Link
            className={styles.featuredInfo}
            to={`/shop/${featured[activeSlide].productHandle}`}
            dangerouslySetInnerHTML={{
              __html: featured[activeSlide].tileText.childMarkdownRemark.html,
            }}
          ></Link>
        </div>
        <div className={styles.slideCountContainer}>
          <button
            aria-label="go to previous"
            className={styles.previousArrow}
            onClick={() => {
              sliderRef.current.slickPrevious()
            }}
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
                strokeWidth="1"
              />
            </svg>
          </button>
          {featured && featured?.length > 1 && (
            <div className={styles.slideCount}>
              {Math.round(activeSlide + 1)} / {featured.length}
            </div>
          )}
          <button
            aria-label="go to next"
            className={styles.nextArrow}
            onClick={() => {
              sliderRef.current.slickNext()
            }}
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
                strokeWidth="1"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.shopSectionHeading}>
        <FormattedMessage id="new_releases"></FormattedMessage>
      </div>
      <Pagination
        type="product"
        data={newProducts.products}
        showNum={3}
      ></Pagination>
      {/* <div className={styles.shopSectionHeading}>
        <FormattedMessage id="publications"></FormattedMessage>
      </div>
      <Pagination
        type="product"
        data={publications.products}
        showNum={9}
      ></Pagination>
      <div className={styles.shopSectionHeading}>
        <FormattedMessage id="ephemera"></FormattedMessage>
      </div>
      <Pagination
        type="product"
        data={ephemera.products}
        showNum={3}
      ></Pagination>
      <div className={styles.shopSectionHeading}>
        <FormattedMessage id="clothing"></FormattedMessage>
      </div>
      <Pagination
        type="product"
        data={clothing.products}
        showNum={3}
      ></Pagination> */}
      <div className={styles.shopSectionHeading}>
        <FormattedMessage id="artist_browse"></FormattedMessage>
      </div>
      <div className={styles.artistListing}>
        {artists.map((artist, index) => (
          <Link
            key={index}
            to={`/shop/${slugify(artist, { lower: true })}`}
            className={styles.artistLink}
          >
            {artist}
          </Link>
        ))}
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allShopifyCollection {
      nodes {
        id
        handle
        title
        products {
          featuredImage {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          handle
          id
          metafields {
            key
            value
          }
          priceRangeV2 {
            minVariantPrice {
              amount
            }
          }
          totalInventory
          title
          collections {
            title
          }
        }
      }
    }
    contentfulFeaturedShopCarousel {
      slides {
        id
        productHandle
        image {
          gatsbyImageData(layout: FULL_WIDTH)
          description
        }
        tileText {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    allShopifyMetafield(filter: { key: { eq: "artist" } }) {
      nodes {
        value
      }
    }
  }
`

export default Shop
