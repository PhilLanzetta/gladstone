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

  console.log(cart)
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
    nextArrow: <NextArrow addClassName={styles.nextArrowProduct} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrowProduct} />,
  }

  return (
    <Layout>
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
              <div className="shop-cart">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="shop-bag-button"
                >
                  <p>
                    Cart{"  "}
                    {cart.length > 0 ? (
                      <span className="cart-number">
                        (
                        {cart
                          .map(item => item.quantity)
                          .reduce((prev, next) => prev + next)}
                        )
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="cart-icon"
                    viewBox="0 0 43.963 36.303"
                  >
                    <path
                      id="Path_3"
                      data-name="Path 3"
                      d="M11.785,45.8a.3.3,0,0,0,.114.228v.057l.171.171h.057a.3.3,0,0,0,.228.114h0L35.039,54.35a.514.514,0,0,0,.285.057,1.2,1.2,0,0,0,.627-.228L55.215,34.915a.846.846,0,0,0,.228-.8.9.9,0,0,0-.57-.627l-.912-.228a24.972,24.972,0,0,1-.228-2.964,10.983,10.983,0,0,1,.057-1.368l1.368-1.368a.846.846,0,0,0,.228-.8.9.9,0,0,0-.57-.627L32.132,18.158a.809.809,0,0,0-.912.228L12.013,37.594h0c-.057.057-.114.114-.114.171v.057c0,.057-.057.057-.057.114v.114a21.318,21.318,0,0,0-.342,3.876,21.392,21.392,0,0,0,.285,3.876Zm11.057-3.078L33.5,46.485a25.951,25.951,0,0,0-.228,3.021,19.385,19.385,0,0,0,.171,2.565L14.065,45.231,13.381,45a17.765,17.765,0,0,1-.228-3.078,19.385,19.385,0,0,1,.171-2.565Zm30.036-9.29-1.026,1.026L34.583,51.671c-.057-.684-.114-1.425-.114-2.166a19.608,19.608,0,0,1,.171-2.622l.4.171a.514.514,0,0,0,.285.057,1.2,1.2,0,0,0,.627-.228L46.837,36l5.813-5.813v.171A18.651,18.651,0,0,0,52.878,33.433Z"
                      transform="translate(-11.5 -18.104)"
                    />
                  </svg>
                </button>
              </div>
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
