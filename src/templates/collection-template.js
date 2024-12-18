import React, { useState } from "react"
import { graphql } from "gatsby"
import { FormattedMessage } from "gatsby-plugin-intl"
import ProductTile from "../components/productTile"
import Seo from "../components/seo"
import * as styles from "../components/shop.module.css"
import { AnimatePresence, motion } from "framer-motion"

const CollectionTemplate = ({ data, location }) => {
  const allProducts = data.shopifyCollection.products.filter(
    product => product.totalInventory > 0
  )
  const [filterOpen, setFilterOpen] = useState(false)
  const [products, setProducts] = useState(allProducts)

  return (
    <div className="shopPageContainer">
      <div className={styles.filterContainer}>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className={styles.filterButton}
        >
          <FormattedMessage id="sort"></FormattedMessage>{" "}
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
                <FormattedMessage id="sort_low"></FormattedMessage>
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
                <FormattedMessage id="sort_high"></FormattedMessage>
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
  )
}

export const query = graphql`
  query getSingleCollection($handle: String) {
    shopifyCollection(handle: { eq: $handle }) {
      products {
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
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
