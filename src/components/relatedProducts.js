import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import ProductTile from "./productTile"
import { FormattedMessage } from "gatsby-plugin-intl"
import * as styles from "./shop.module.css"

const RelatedProducts = ({ productHandles }) => {
  const data = useStaticQuery(graphql`
    {
      allShopifyProduct {
        nodes {
          featuredImage {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
          handle
          storefrontId
          id
          collections {
            title
          }
          metafields {
            key
            value
          }
          title
          tags
          priceRangeV2 {
            minVariantPrice {
              amount
            }
          }
          totalInventory
        }
      }
    }
  `)

  const productArray = productHandles
    .map(handle =>
      data.allShopifyProduct.nodes.filter(node => node.storefrontId === handle)
    )
    .flat()

  return (
    <div className={styles.relatedContainer}>
      <p className={styles.shopSectionHeading}>
        <FormattedMessage id="related_titles"></FormattedMessage>
      </p>
      <div className={styles.productTilesContainer}>
        {productArray.map(product => (
          <ProductTile product={product} key={product.id}></ProductTile>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
