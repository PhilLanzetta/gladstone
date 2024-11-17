import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ProductTile from "../components/productTile"
import Seo from "../components/seo"
import * as styles from "../components/shop.module.css"
import { AnimatePresence, motion } from "framer-motion"

const CollectionTemplate = ({ data, location }) => {
  const allProducts = data.shopifyCollection.products
  const [filterOpen, setFilterOpen] = useState(false)
  const [products, setProducts] = useState(allProducts)

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
            <Link to="/shop/artists" activeClassName={styles.activeLink}>
              Artists
            </Link>
          </div>
        </div>
        <div className={styles.filterContainer}>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={styles.filterButton}
          >
            Sort{" "}
            <span className={styles.filterIndicator}>
              {filterOpen ? "-" : "+"}
            </span>
          </button>
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                key="sort"
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: "300px" }}
                exit={{ opacity: 0, maxHeight: 0 }}
                className={styles.filterDropdown}
              >
                <button
                  className={styles.dropdownButton}
                  onClick={() => {
                    setProducts(
                      allProducts.sort(
                        (a, b) =>
                          a.priceRangeV2?.minVariantPrice?.amount -
                          b.priceRangeV2?.minVariantPrice?.amount
                      )
                    )
                    setFilterOpen(false)
                  }}
                >
                  Price: Low to High
                </button>
                <button
                  className={styles.dropdownButton}
                  onClick={() => {
                    setProducts(
                      allProducts.sort(
                        (a, b) =>
                          b.priceRangeV2?.minVariantPrice?.amount -
                          a.priceRangeV2?.minVariantPrice?.amount
                      )
                    )
                    setFilterOpen(false)
                  }}
                >
                  Price: High to Low
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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
