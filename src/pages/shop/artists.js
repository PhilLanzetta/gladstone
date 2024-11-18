import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import * as styles from "../../components/shop.module.css"
import slugify from "slugify"
import ShopHeading from "../../components/shopHeading"

const Artists = ({ data }) => {
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const artists = data.allShopifyMetafield.nodes
    .map(node => node.value)
    .filter(onlyUnique)
    .sort((a, b) => a.split(" ").pop().localeCompare(b.split(" ").pop()))
  return (
    <Layout>
      <div className="pageContainer">
        <ShopHeading></ShopHeading>
        <div className={styles.shopSectionHeadingArtists}>Browse by Artist</div>
        <div className={styles.artistListing}>
          {artists.map((artist, index) => (
            <Link
              key={index}
              to={`/shop/${slugify(artist, { lower: true })}`}
              className={styles.artistLink}
            >
              {artist}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allShopifyMetafield(filter: { key: { eq: "artist" } }) {
      nodes {
        value
      }
    }
  }
`

export default Artists