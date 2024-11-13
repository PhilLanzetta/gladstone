import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ProductTile from "../components/productTile"
import Seo from "../components/seo"

const ArtistCollectionTemplate = ({ data, location }) => {
  const products = data.allShopifyProduct.nodes

  return (
    <Layout location={location} collection={true}>
      <div className="product-tiles-container">
        {products.map(product => (
          <ProductTile key={product.id} product={product}></ProductTile>
        ))}
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
  }
`

export const Head = () => <Seo title="Shop" />

export default ArtistCollectionTemplate
