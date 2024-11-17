import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ProductTile from "../components/productTile"
import Seo from "../components/seo"
import * as styles from "../components/shop.module.css"
import { AnimatePresence, motion } from "framer-motion"
import slugify from "slugify"

const ArtistCollectionTemplate = ({ data, location }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const allProducts = data.allShopifyProduct.nodes

  const artists = data.allShopifyMetafield.nodes
    .map(node => node.value)
    .filter(onlyUnique)
    .sort((a, b) => a.split(" ").pop().localeCompare(b.split(" ").pop()))

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
        <div className={styles.shopSectionHeading}>Browse by Artist</div>
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
    </Layout>
  )
}

export const query = graphql`
  query getSingleCollection($artist: String) {
    allShopifyProduct(
      filter: { metafields: { elemMatch: { value: { eq: $artist } } } }
    ) {
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
