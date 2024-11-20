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
      <div className={isFeatured ? styles.featuredNewsText : styles.newsText}>
        <div
          dangerouslySetInnerHTML={{
            __html: newsText.childMarkdownRemark.html,
          }}
        ></div>
        {download && (
          <a
            className={styles.downloadLink}
            href={download.pdfFile.file.url}
            target="_blank"
            rel="noreferrer"
          >
            {download.buttonText} &darr;
          </a>
        )}
        {link && (
          <a
            className={styles.downloadLink}
            href={link.url}
            target="_blank"
            rel="noreferrer"
          >
            {link.label} &#8599;
          </a>
        )}
      </div>
    </div>
  )
}

export default NewsItem
