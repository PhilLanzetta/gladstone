import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as styles from "../components/shop.module.css"
import Slider from "react-slick"
import ProductTile from "../components/productTile"

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
          stroke="#fff"
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
          stroke="#fff"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

const Shop = ({ data }) => {
  const products = data.allShopifyProduct.nodes
  const featured = products.filter(product =>
    product.collections?.some(item => item.title === "Featured")
  )
  const newProducts = products.filter(product =>
    product.collections?.some(item => item.title === "New Releases")
  )
  const publications = products.filter(product =>
    product.collections?.some(item => item.title === "Publications")
  )

  const ephemera = products.filter(product =>
    product.collections?.some(item => item.title === "Ephemera")
  )

  const clothing = products.filter(product =>
    product.collections?.some(item => item.title === "Clothing")
  )

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    nextArrow: <NextArrow addClassName={styles.nextArrow} />,
    prevArrow: <PrevArrow addClassName={styles.previousArrow} />,
  }

  return (
    <Layout>
      <div className="pageContainer">
        <div className={styles.exhibitionsHeader}>
          <div className="pageHeading">Shop</div>
          <div className={styles.headerLinkContainer}>
            <Link to="/shop/featured">Featured</Link>
            <Link to="/shop/new-releases">New Releases</Link>
            <Link to="/shop/featured/publications">Publications</Link>
            <Link to="/shop/ephemera">Ephemera</Link>
            <Link to="/shop/clothing">Clothing</Link>
          </div>
        </div>
        <Slider {...settings} className={styles.sliderContainer}>
          {featured.map(item => {
            const image = item.metafields.filter(
              field => field.key === "featured_image"
            )[0]
            const artist = item.metafields.filter(
              field => field.key === "artist"
            )[0]
            return (
              <div key={item.id} className={styles.featuredSlide}>
                <img
                  src={image.value}
                  alt={item.title}
                  className={styles.carouselImg}
                ></img>
                <Link
                  to={`/shop/${item.handle}`}
                  className={styles.featuredSlideInfo}
                >
                  <p>{artist.value}</p>
                  <p>{item.title}</p>
                </Link>
              </div>
            )
          })}
        </Slider>
        <div className={styles.shopSectionHeading}>New Releases</div>
        <div className={styles.productContainer}>
          {newProducts.map(product => (
            <ProductTile key={product.id} product={product}></ProductTile>
          ))}
        </div>
        <div className={styles.shopSectionHeading}>Publications</div>
        <div className={styles.productContainer}>
          {publications.map(product => (
            <ProductTile key={product.id} product={product}></ProductTile>
          ))}
        </div>
        <div className={styles.shopSectionHeading}>Ephemera</div>
        <div className={styles.productContainer}>
          {ephemera.map(product => (
            <ProductTile key={product.id} product={product}></ProductTile>
          ))}
        </div>
        <div className={styles.shopSectionHeading}>Clothing</div>
        <div className={styles.productContainer}>
          {clothing.map(product => (
            <ProductTile key={product.id} product={product}></ProductTile>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allShopifyProduct {
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
`

export default Shop
