import React from "react"
import { graphql } from "gatsby"
import HomeTile from "../components/homeTile"
import * as styles from "../components/index.module.css"
import Layout from "../components/layout"
import LocationListing from "../components/locationListing"

const Index = ({ data, location }) => {
  const { homeTiles } = data.contentfulHomePage
  return (
    <Layout location={location}>
      <div className={styles.homeContainer}>
        {homeTiles.map(item => (
          <HomeTile key={item.id} tile={item}></HomeTile>
        ))}
        <LocationListing></LocationListing>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulHomePage {
      id
      homeTiles {
        artist
        id
        image {
          description
          gatsbyImageData
        }
        tileWidth
        workTitle
        location {
          childMarkdownRemark {
            html
          }
        }
        linkedContent {
          slug
        }
      }
    }
  }
`

export default Index
