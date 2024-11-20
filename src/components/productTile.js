import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import * as styles from "./productTile.module.css"

const ProductTile = ({ product }) => {
  const {
    handle,
    featuredImage,
    totalInventory,
    priceRangeV2,
    title,
  } = product

  return (
    <div className={styles.productTile}>
      <Link to={`/shop/${handle}`}>
        <div className={styles.productTileImage}>
          {featuredImage ? (
            <GatsbyImage
              image={featuredImage?.localFile.childImageSharp.gatsbyImageData}
              alt={title}
            ></GatsbyImage>
          ) : (
            <StaticImage
              src="../images/placeholder.png"
              alt="placeholder"
            ></StaticImage>
          )}
          </div>
          <div className={styles.paymentInfo}>
            <p>{title}</p>
            {totalInventory > 0 && (
              <p className={styles.price}>
                ${priceRangeV2.minVariantPrice.amount}
              </p>
            )}
          </div>
      </Link>
    </div>
  )
}

export default ProductTile
