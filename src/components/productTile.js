import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./productTile.module.css"

const ProductTile = ({ product }) => {
  const {
    handle,
    featuredImage,
    totalInventory,
    priceRangeV2,
    metafields,
    title,
  } = product

  const artist = metafields.filter(metafield => metafield.key === "artist")[0]
    ?.value

  return (
    <div className={styles.productTile}>
      <Link to={`/shop/${handle}`}>
        <div className={styles.productTileImage}>
          <GatsbyImage
            image={featuredImage?.localFile.childImageSharp.gatsbyImageData}
          ></GatsbyImage>
          <div className={styles.paymentInfo}>
            <p>{title}</p>
            {totalInventory > 0 && (
              <p className={styles.price}>${priceRangeV2.minVariantPrice.amount}</p>
            )}
          </div>
          {totalInventory < 1 && (
            <div className={styles.soldOutSticker}>
              Sold <br />
              Out
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default ProductTile
