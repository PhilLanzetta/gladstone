import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ProductTile from "../components/productTile"
import Seo from "../components/seo"
import * as styles from "../components/shop.module.css"

const CollectionTemplate = ({ data, location }) => {
  const products = data.shopifyCollection.products

  return (
    <Layout location={location} collection={true}>
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
          </div>
          <button>Sort +</button>
        </div>
        <div className={styles.productTilesContainer}>
          {products.map(product => (
            <ProductTile key={product.id} product={product}></ProductTile>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleCollection($handle: String) {
    shopifyCollection(handle: { eq: $handle }) {
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
        collections {
          title
        }
        metafields {
          key
          value
        }
        title
        priceRangeV2 {
          minVariantPrice {
            amount
          }
        }
        totalInventory
      }
    }
    allShopifyCollection(sort: { title: ASC }) {
      nodes {
        id
        title
        handle
      }
    }
  }
`

export const Head = () => <Seo title="Shop" />

export default CollectionTemplate
