import React from "react"
import Layout from "../components/layout"
import * as styles from "../components/artists.module.css"
import { graphql, Link } from "gatsby"

const Artists = ({ data }) => {
  const { nodes } = data.allContentfulArtist
  const alphabeticNames = nodes.sort((a, b) =>
    a.name.split(" ").pop().localeCompare(b.name.split(" ").pop())
  )
  return (
    <Layout>
      <div className="pageContainer">
        <div className="pageHeading">Artists</div>
        <div className={styles.artistContainer}>
          {alphabeticNames.map(artist => (
            <Link key={artist.id} to={`/artist/${artist.slug}`} className={styles.artistLink}>
              {artist.name}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulArtist {
      nodes {
        name
        id
        slug
      }
    }
  }
`

export default Artists
