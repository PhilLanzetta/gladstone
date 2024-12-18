import React, { useState } from "react"
import { graphql } from "gatsby"
import { FormattedMessage } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"
import useStore from "../context/StoreContext"
import Seo from "../components/seo"
import Slider from "react-slick"
import * as styles from "../components/shop.module.css"
import RelatedProducts from "../components/relatedProducts"

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
          strokeWidth="1"
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
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

const ProductPage = ({ data }) => {
  const [variantIndex, setVariantIndex] = useState(0)
  const {
    media,
    title,
    metafields,
    descriptionHtml,
    priceRangeV2,
    totalInventory,
    variants,
  } = data.shopifyProduct

  const artist = metafields.filter(field => field.key === "artist")[0]?.value

  const relatedProductsHandles = JSON.parse(
    metafields.filter(field => field.key === "related_titles")[0]?.value ||
      "null"
  )

  const { addVariantToCart } = useStore()

  const sizes = variants
    .map(variant =>
      variant.selectedOptions.filter(option => option.name === "Size")
    )
    .flat()

  const covers = variants
    .map(variant => {
      if (
        variant.selectedOptions?.filter(option => option.name === "Cover Image")
          .length > 0
      ) {
        return variant
      } else return false
    })
    .filter(item => item !== false)
    .flat()

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: true,
    nextArrow: <NextArrow addClassName={styles.nextArrowProduct} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrowProduct} />,
  }

  return (
    <div className="shopPageContainer">
      <div className={styles.productContainer}>
        <div className={styles.productLeft}>
          {media && media.length > 1 && (
            <Slider {...settings}>
              {media.map(image => (
                <div key={image.id}>
                  <div className={styles.productMediaContainer}>
                    <GatsbyImage
                      image={
                        image.image?.localFile?.childImageSharp?.gatsbyImageData
                      }
                      alt=""
                      className={styles.mediaImage}
                    ></GatsbyImage>
                  </div>
                </div>
              ))}
            </Slider>
          )}{" "}
          {media && media.length === 1 && (
            <GatsbyImage
              image={
                media[0].image?.localFile?.childImageSharp?.gatsbyImageData
              }
              alt=""
            ></GatsbyImage>
          )}
        </div>
        <div className={styles.productRight}>
          <h1 className={styles.productArtist}>{artist}</h1>
          <h2 className={styles.productTitle}>{title}</h2>
          {priceRangeV2.minVariantPrice.amount > 0 && totalInventory > 0 && (
            <p className={styles.productPrice}>
              ${priceRangeV2.minVariantPrice.amount}
            </p>
          )}
          <div
            className={styles.productDescription}
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></div>
          {totalInventory > 0 && (
            <>
              {sizes?.length > 0 && (
                <div className={styles.productSizeContainer}>
                  <p>Size</p>
                  <p>-</p>
                  <select
                    className={styles.productSizeSelect}
                    onChange={e => setVariantIndex(e.target.value * 1)}
                  >
                    {sizes.map((size, index) => (
                      <option key={index} value={index}>
                        {size.value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {covers?.length > 0 && (
                <>
                  <p className={styles.coverHeading}>Cover Image:</p>
                  <div className={styles.productCoverContainer}>
                    {covers.map((cover, index) => (
                      <button
                        className={`${styles.coverButton} ${
                          index === variantIndex ? styles.activeCover : ""
                        }`}
                        key={index}
                        onClick={() => setVariantIndex(index)}
                      >
                        <GatsbyImage
                          image={
                            cover.image?.localFile.childImageSharp
                              .gatsbyImageData
                          }
                        ></GatsbyImage>
                      </button>
                    ))}
                  </div>
                </>
              )}
              <button
                onClick={() =>
                  addVariantToCart(data.shopifyProduct, variantIndex, 1)
                }
                className={styles.addToCartBtn}
              >
                <FormattedMessage id="add_to_cart"></FormattedMessage>
              </button>
            </>
          )}
        </div>
      </div>
      {relatedProductsHandles?.length > 0 && (
        <RelatedProducts
          productHandles={relatedProductsHandles}
        ></RelatedProducts>
      )}
    </div>
  )
}

export const query = graphql`
  query getSingleProduct($handle: String) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      media {
        ... on ShopifyMediaImage {
          id
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
      title
      collections {
        title
      }
      metafields {
        key
        value
      }
      vendor
      descriptionHtml
      priceRangeV2 {
        minVariantPrice {
          amount
        }
      }
      totalInventory
      variants {
        shopifyId
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`
export const Head = ({ data }) => <Seo title={data.shopifyProduct.title} />

export default ProductPage
