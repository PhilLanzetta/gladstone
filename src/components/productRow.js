import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import useStore from "../context/StoreContext"
import * as styles from "./cart.module.css"
import { FormattedMessage } from "gatsby-plugin-intl"

const ProductRow = ({ item }) => {
  const { product, quantity, variantIndex } = item

  const size = product.variants
    .map(variant =>
      variant.selectedOptions.filter(option => option.name === "Size")
    )
    ?.flat()[variantIndex]

  const { removeLineItem, lowerCartItemQuantity, addCartItemQuantity } =
    useStore()

  return (
    <div className={styles.productRowContainer}>
      <div className={styles.productSection}>
        <p className={styles.heading}>
          <FormattedMessage id="product"></FormattedMessage>
        </p>
        <div className={styles.productInfo}>
          <GatsbyImage
            image={
              product.media[0]?.image.localFile.childImageSharp.gatsbyImageData
            }
            className={styles.productRowImage}
          ></GatsbyImage>
          <p>
            <span>{product.title}</span>
          </p>
          {size && <p className="product-row-size">Size - {size.value}</p>}
        </div>
      </div>
      <div className={styles.rowRight}>
        <div className={styles.priceContainer}>
          <p className={styles.heading}>
            <FormattedMessage id="price"></FormattedMessage>
          </p>
          <p>
            <span>{`$${product.priceRangeV2.minVariantPrice.amount}`}</span>
          </p>
        </div>
        <div className={styles.quantityContainer}>
          <p className={styles.heading}>
            <FormattedMessage id="quantity"></FormattedMessage>
          </p>
          <div className={styles.quantityButtons}>
            <button
              className={styles.quantityBtn}
              onClick={() =>
                lowerCartItemQuantity(
                  product.variants[variantIndex]?.shopifyId,
                  variantIndex
                )
              }
              disabled={quantity === 1}
            >
              -
            </button>
            <p className={styles.quantityBtnNum}>{quantity}</p>
            <button
              onClick={() =>
                addCartItemQuantity(
                  product.variants[variantIndex]?.shopifyId,
                  variantIndex
                )
              }
              className={styles.quantityBtn}
            >
              +
            </button>
            <button
              onClick={() =>
                removeLineItem(
                  product.variants[variantIndex]?.shopifyId,
                  variantIndex
                )
              }
              className={styles.remove}
            >
              <FormattedMessage id="remove"></FormattedMessage>
            </button>
          </div>
        </div>
        <div className={styles.rowTotalContainer}>
          <p className={styles.heading}>
            <FormattedMessage id="total"></FormattedMessage>
          </p>
          <p>
            <span>{`$${
              product.priceRangeV2.minVariantPrice.amount * quantity
            }`}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductRow
