import React, { useState } from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import useWindowSize from "../utils/useWindowSize"
import useStore from "../context/StoreContext"
import Seo from "../components/seo"
import Slider from "react-slick"
import * as styles from "../components/shop.module.css"
import Cart from "../components/cart"
import { AnimatePresence } from "framer-motion"

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

const ProductPage = ({ location, data }) => {
  const { width } = useWindowSize()
  const [variantIndex, setVariantIndex] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const isMobile = width < 700
  const {
    media,
    title,
    metafields,
    descriptionHtml,
    priceRangeV2,
    totalInventory,
    variants,
    collections,
  } = data.shopifyProduct

  const { addVariantToCart, cart } = useStore()

  const sizes = variants
    .map(variant =>
      variant.selectedOptions.filter(option => option.name === "Size")
    )
    .flat()

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: true,
    nextArrow: <NextArrow addClassName={styles.nextArrowProduct} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrowProduct} />,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1.15,
          arrows: false,
          fade: false,
          infinite: false,
        },
      },
    ],
  }

  return (
    <Layout>
      <AnimatePresence>
        {isCartOpen && (
          <Cart toggleCart={() => setIsCartOpen(!isCartOpen)}></Cart>
        )}
      </AnimatePresence>
      <div className="pageContainer">
        <div className={styles.exhibitionsHeader}>
          <Link className="pageHeading" to="/shop">
            Shop
          </Link>
          <div className={styles.headerLinkContainer}>
            <Link to="/shop/featured" activeClassName={styles.activeLink}>
              Featured
            </Link>
            <Link to="/shop/new-releases" activeClassName={styles.activeLink}>
              New Releases
            </Link>
            <Link to="/shop/publications" activeClassName={styles.activeLink}>
              Publications
            </Link>
            <Link to="/shop/ephemera" activeClassName={styles.activeLink}>
              Ephemera
            </Link>
            <Link to="/shop/clothing" activeClassName={styles.activeLink}>
              Clothing
            </Link>
            <Link to="/shop/artists" activeClassName={styles.activeLink}>
              Artists
            </Link>
            {cart.length > 0 && (
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={styles.shopBagButton}
              >
                <span className={styles.cartText}>Cart</span>
                {cart.length > 0 ? (
                  <span className={styles.cartNumber}>
                    {cart
                      .map(item => item.quantity)
                      .reduce((prev, next) => prev + next)}
                  </span>
                ) : (
                  ""
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.cartSVG}
                  viewBox="0 0 19 27"
                >
                  <g
                    id="Ellipse_2"
                    data-name="Ellipse 2"
                    transform="translate(2)"
                    fill="none"
                    stroke="#000"
                    stroke-width="1"
                  >
                    <circle cx="7.5" cy="7.5" r="7.5" stroke="none" />
                    <circle cx="7.5" cy="7.5" r="7" fill="none" />
                  </g>
                  <g
                    id="Rectangle_97"
                    data-name="Rectangle 97"
                    transform="translate(0 7)"
                    fill="#fff"
                    stroke="#000"
                    stroke-width="1"
                  >
                    <rect width="19" height="20" stroke="none" />
                    <rect x="0.5" y="0.5" width="18" height="19" fill="none" />
                  </g>
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className={styles.productContainer}>
          <div className={styles.productLeft}>
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
          </div>
          <div className={styles.productRight}>
            <h1 className={styles.productTitle}>{title}</h1>
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
                <button
                  onClick={() =>
                    addVariantToCart(data.shopifyProduct, variantIndex, 1)
                  }
                  className={styles.addToCartBtn}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
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
