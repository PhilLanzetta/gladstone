import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const HomeTile = ({ tile }) => {
  const { artist, image, workTitle, location, tileWidth } = tile
  return (
    <div style={{ width: tileWidth }}>
      <GatsbyImage
        image={image?.gatsbyImageData}
        alt={image?.description}
      ></GatsbyImage>
    </div>
  )
}

export default HomeTile
