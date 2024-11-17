import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import useStore from "../context/StoreContext"

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
    <section className="product-row-container">
      <GatsbyImage
        image={
          product.media[0]?.image.localFile.childImageSharp.gatsbyImageData
        }
        className="product-row-image"
      ></GatsbyImage>
      <article className="product-row-info">
        <p className="cart-product-title">
          <span>{product.title}</span>
        </p>
        {size && <p className="product-row-size">Size - {size.value}</p>}
        <p>
          <span>{`$${product.priceRangeV2.minVariantPrice.amount}`}</span>
        </p>
        <article className="product-row-quantity">
          <p>QUANTITY</p>
          <div className="quantity-buttons">
            <button
              className="quantity-btn"
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
            <p>{quantity}</p>
            <button
              onClick={() =>
                addCartItemQuantity(
                  product.variants[variantIndex]?.shopifyId,
                  variantIndex
                )
              }
              className="quantity-btn"
            >
              +
            </button>
          </div>
        </article>
        <button
          onClick={() =>
            removeLineItem(
              product.variants[variantIndex]?.shopifyId,
              variantIndex
            )
          }
          className="cart-remove"
        >
          Remove from cart
        </button>
      </article>
    </section>
  )
}

export default ProductRow
