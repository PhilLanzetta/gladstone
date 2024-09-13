import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"


const Artist = ({ data }) => {
  const { name } =
    data.contentfulArtist

  return (
    <div>
      {name}
    </div>
  )
}

export const query = graphql`
  query getSingleArtist($slug: String) {
    contentfulArtist(slug: { eq: $slug }) {
      slug
      name
    }
  }
`

export const Head = ({ data }) => <Seo title={data.contentfulArtist.name} />

export default Artist
