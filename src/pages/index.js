import React from "react"
import { graphql } from "gatsby"
import HomeTile from "../components/homeTile"
import * as styles from "../components/index.module.css"
import LocationListing from "../components/locationListing"

const Index = ({ data, location }) => {
  const { homeTiles } = data.allContentfulHomePage.nodes[0]
  return (
    <div className={styles.homeContainer}>
      {homeTiles.map(item => (
        <HomeTile key={item.id} tile={item} webLocation={location}></HomeTile>
      ))}
      <LocationListing></LocationListing>
    </div>
  )
}

export const query = graphql`
  query contentfulHome($locale: String) {
    allContentfulHomePage(filter: { node_locale: { eq: $locale } }) {
      nodes {
        id
        homeTiles {
          artist
          id
          image {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
          mobileImage {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
          tileWidth
          workTitle
          location {
            childMarkdownRemark {
              html
            }
          }
          link
          linkIsExternal
        }
      }
    }
  }
`

export default Index
