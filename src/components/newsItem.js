import React from "react"
import * as styles from "./newsItem.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const NewsItem = ({ content }) => {
  const { isFeatured, link, newsImage, newsText, download } = content
  return (
    <div className={isFeatured ? styles.featuredNewsItem : styles.newsItem}>
      <GatsbyImage
        image={newsImage.gatsbyImageData}
        alt={newsImage.description}
        className={isFeatured ? styles.featuredNewsImage : styles.newsImage}
      ></GatsbyImage>
      <div
        dangerouslySetInnerHTML={{ __html: newsText.childMarkdownRemark.html }}
        className={isFeatured ? styles.featuredNewsText : styles.newsText}
      ></div>
    </div>
  )
}

export default NewsItem
