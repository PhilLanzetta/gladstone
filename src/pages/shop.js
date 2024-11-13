import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Shop = ({ data }) => {
  const products = data.artistProduct.edges
    .map(edge => edge.node.metafield?.value)
    .filter(node => node !== undefined)
  console.log(products)
  return (
    <Layout>
      <div>Shop</div>
    </Layout>
  )
}

export const query = graphql`
  query {
    artistProduct: allShopifyProduct {
      edges {
        node {
          metafield(key: "artist", namespace: "custom") {
            value
          }
        }
      }
    }
  }
`

export default Shop
