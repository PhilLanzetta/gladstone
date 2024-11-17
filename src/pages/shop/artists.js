import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import * as styles from "../../components/shop.module.css"
import slugify from "slugify"

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
        <div className={styles.exhibitionsHeader}>
          <Link className="pageHeading" to="/shop">
            Shop
          </Link>
          <div className={styles.headerLinkContainer}>
            <Link to="/shop/featured" activeClassName={styles.activeLink}>
              Featured
            </Link>
            <Link to="/shop/new-releases" activeClassName={styles.activeLink}>
              New Releases
            </Link>
            <Link to="/shop/publications" activeClassName={styles.activeLink}>
              Publications
            </Link>
            <Link to="/shop/ephemera" activeClassName={styles.activeLink}>
              Ephemera
            </Link>
            <Link to="/shop/clothing" activeClassName={styles.activeLink}>
              Clothing
            </Link>
            <Link to="/shop/artists" activeClassName={styles.activeLink}>
              Artists
            </Link>
          </div>
        </div>
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
