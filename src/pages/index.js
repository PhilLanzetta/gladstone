import React from "react"
import { graphql } from "gatsby"
import HomeTile from "../components/homeTile"
import * as styles from "../components/index.module.css"

const Index = ({ data }) => {
  const { homeTiles } = data.contentfulHomePage
  return (
    <div className={styles.homeContainer}>
      {homeTiles.map(item => (
        <HomeTile key={item.id} tile={item}></HomeTile>
      ))}
    </div>
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
        location
      }
    }
  }
`

export default Index
