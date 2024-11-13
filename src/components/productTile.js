import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const ProductTile = ({ product }) => {
  const {
    handle,
    featuredImage,
    totalInventory,
    priceRangeV2,
    metafields,
  } = product

  const artist = metafields.filter(
    (metafield) => metafield.key === 'artist'
  )[0]?.value

  return (
    <div className='product-tile'>
      <Link to={`/shop/${handle}`}>
        <div className='product-tile-image'>
          <GatsbyImage
            image={featuredImage?.localFile.childImageSharp.gatsbyImageData}
          ></GatsbyImage>
          <div className='payment-info'>
            {totalInventory > 0 && (
              <p>${priceRangeV2.minVariantPrice.amount}</p>
            )}
          </div>
          {totalInventory < 1 && (
            <div className='sold-out-sticker'>
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
