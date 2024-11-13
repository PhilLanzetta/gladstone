import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import ProductTile from '../components/productTile'
import Seo from '../components/seo'

const CollectionTemplate = ({ data, location }) => {
  const products = data.shopifyCollection.products
  console.log(products)

  return (
    <Layout location={location} collection={true}>
      <div className='product-tiles-container'>
        {products.map((product) => (
          <ProductTile key={product.id} product={product}></ProductTile>
        ))}
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

export const Head = () => <Seo title='Shop' />

export default CollectionTemplate
