import React, { useState } from "react"
import { graphql } from "gatsby"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import ProductTile from "../components/productTile"
import Seo from "../components/seo"
import * as styles from "../components/shop.module.css"
import { AnimatePresence, motion } from "framer-motion"
import slugify from "slugify"
import moment from "moment"

const ArtistCollectionTemplate = ({ data, location }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const allProducts = data.allShopifyProduct.nodes.sort((a, b) => {
    const dateOne = a.metafields.filter(
      item => item.key === "publication_date"
    )[0]?.value
    const dateTwo = b.metafields.filter(
      item => item.key === "publication_date"
    )[0]?.value
    if (
      dateOne !== undefined &&
      dateTwo !== undefined &&
      new Date(dateOne) < new Date(dateTwo)
    ) {
      console.log(new Date(dateOne))
      return 1
    } else if (
      dateOne !== undefined &&
      dateTwo !== undefined &&
      new Date(dateOne) > new Date(dateTwo)
    ) {
      console.log(new Date(dateTwo))
      return -1
    } else if (dateOne === undefined && dateTwo !== undefined) {
      console.log("dateOne undefined")
      return 1
    } else if (dateOne !== undefined && dateTwo === undefined) {
      console.log("date two undefined")
      return -1
    } else {
      console.log("zero ran")
      return 0
    }
  })

  const artists = data.allShopifyMetafield.nodes
    .map(node => node.value)
    .filter(onlyUnique)
    .sort((a, b) => a.split(" ").pop().localeCompare(b.split(" ").pop()))

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
      <div className={styles.shopSectionHeading}>
        <FormattedMessage id="artist_browse"></FormattedMessage>
      </div>
      <div className={styles.artistListing}>
        {artists.map((artist, index) => (
          <Link
            key={index}
            to={`/shop/artist/${slugify(artist, { lower: true })}`}
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
  query getSingleCollection($artist: String) {
    allShopifyProduct(
      filter: {
        metafields: { elemMatch: { value: { eq: $artist } } }
        totalInventory: { gt: 0 }
      }
    ) {
      nodes {
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
    allShopifyMetafield(filter: { key: { eq: "artist" } }) {
      nodes {
        value
      }
    }
  }
`

export const Head = () => <Seo title="Shop" />

export default ArtistCollectionTemplate
