import React, { useState } from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import useWindowSize from '../utils/useWindowSize'
import useStore from '../context/StoreContext'
import Seo from '../components/seo'
import Slider from 'react-slick'

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role='button'
      tabIndex={0}
      aria-label='go to next'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 30 30'
        className='hero-svg'
      >
        <path
          id='Path_118'
          data-name='Path 118'
          d='M0,8,5.436,0,11,8'
          transform='translate(19.688 9.5) rotate(90)'
          fill='none'
        />
      </svg>
    </div>
  )
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role='button'
      tabIndex={0}
      aria-label='go to previous'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 30 30'
        className='hero-svg'
      >
        <path
          id='Path_118'
          data-name='Path 118'
          d='M0,0,5.436,8,11,0'
          transform='translate(18.313 9.5) rotate(90)'
          fill='none'
        />
      </svg>
    </div>
  )
}

const ProductPage = ({ location, data }) => {
  const { width } = useWindowSize()
  const [variantIndex, setVariantIndex] = useState(0)
  const isMobile = width < 601
  const {
    media,
    title,
    metafields,
    descriptionHtml,
    priceRangeV2,
    totalInventory,
    variants,
    collections,
  } = data.shopifyProduct

  const allCollections = data.allShopifyCollection.nodes

  const filteredCollections = collections.filter(
    (collection) => collection.title !== 'Everything'
  )

  const mediaImages = media.slice(1)

  const { addVariantToCart } = useStore()

  const sizes = variants
    .map((variant) =>
      variant.selectedOptions.filter((option) => option.name === 'Size')
    )
    .flat()

  const settings = {
    slidesToShow: 1,
    infinite: true,
    useTransform: false,
    dots: false,
    arrows: true,
    nextArrow: <NextArrow addClassName='next-button' />,
    prevArrow: <PrevArrow addClassName='prev-button' />,
  }

  return (
    <Layout
      location={location}
      collection={true}
      collectionTitle={filteredCollections[0]?.title}
    >
      <h2 className='collection-page-filter'>Filter:</h2>
      <div className='product-tag-container'>
        {allCollections.map((collection) => (
          <Link
            key={collection.id}
            to={`/collections/${collection.handle}`}
            className={
              collections[0]?.title === collection.title
                ? 'active-filter-button'
                : ''
            }
          >
            {collection.title}
          </Link>
        ))}
      </div>
      <div className='product-page-container'>
        <div className='product-left'>
          <Slider {...settings}>
            {mediaImages.map((image) => (
              <GatsbyImage
                key={image.id}
                image={image.image?.localFile?.childImageSharp?.gatsbyImageData}
                className='product-image'
              ></GatsbyImage>
            ))}
          </Slider>
        </div>
        <div className='product-right'>
            <h1 className='product-title'>{title}</h1>
          {priceRangeV2.minVariantPrice.amount > 0 && totalInventory > 0 && (
            <p className='product-price'>
              ${priceRangeV2.minVariantPrice.amount}
            </p>
          )}
          <div
            className='product-description'
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          ></div>
          {totalInventory > 0 && (
            <>
              {sizes?.length > 0 && (
                <div className='product-size-container'>
                  <p>Size</p>
                  <p>-</p>
                  <select
                    className='product-size-select'
                    onChange={(e) => setVariantIndex(e.target.value * 1)}
                  >
                    {sizes.map((size, index) => (
                      <option key={index} value={index}>
                        {size.value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={() =>
                  addVariantToCart(data.shopifyProduct, variantIndex, 1)
                }
                className='add-to-cart-btn'
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleProduct($handle: String) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      media {
        ... on ShopifyMediaImage {
          id
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
      }
      title
      collections {
        title
      }
      metafields {
        key
        value
      }
      vendor
      descriptionHtml
      priceRangeV2 {
        minVariantPrice {
          amount
        }
      }
      totalInventory
      variants {
        shopifyId
        selectedOptions {
          name
          value
        }
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
export const Head = ({ data }) => <Seo title={data.shopifyProduct.title} />

export default ProductPage
