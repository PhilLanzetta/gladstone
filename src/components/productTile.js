import React from "react"
import { Link } from "gatsby-plugin-intl"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import * as styles from "./productTile.module.css"

const ProductTile = ({ product, page, related }) => {
  const {
    handle,
    featuredImage,
    totalInventory,
    priceRangeV2,
    title,
    metafields,
    name,
    tileImage,
  } = product

  const artist = related
    ? name
    : metafields.filter(field => field.key === "artist")[0]?.value

  return (
    <div className={styles.productTile}>
      <Link to={`/shop/${handle}`}>
        <div
          className={
            related ? styles.relatedProductImage : styles.productTileImage
          }
        >
          {featuredImage ? (
            <GatsbyImage
              image={featuredImage?.localFile?.childImageSharp.gatsbyImageData}
              alt={title}
              className={styles.productTileImageImg}
            ></GatsbyImage>
          ) : tileImage ? (
            <GatsbyImage
              image={tileImage.gatsbyImageData}
              alt={tileImage.description}
              className={styles.productTileImageImg}
            ></GatsbyImage>
          ) : (
            <StaticImage
              src="../../static/place_holder.png"
              alt="placeholder"
            ></StaticImage>
          )}
        </div>
        <div className={styles.paymentInfo}>
          <div>
            <p className={styles.productArtist}>{artist}</p>
            <p className={styles.productTitle}>{title}</p>
          </div>
          {totalInventory > 0 && page !== "artist" && (
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
