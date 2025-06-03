import React from "react"
import * as styles from "./newsItem.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const NewsItem = ({ content, related, newLine }) => {
  const { isFeatured, link, newsImage, newsText, download, category } = content
  return (
    <>
      <div
        className={
          related ? "" : isFeatured ? styles.featuredNewsItem : styles.newsItem
        }
      >
        {" "}
        {newsImage && (
          <GatsbyImage
            image={newsImage.gatsbyImageData}
            alt={newsImage.description}
            className={
              related
                ? styles.relatedTileImage
                : isFeatured
                ? styles.featuredNewsImage
                : styles.newsImage
            }
          ></GatsbyImage>
        )}
        <div
          className={
            related
              ? styles.relatedInfoText
              : isFeatured
              ? styles.featuredNewsText
              : styles.newsText
          }
        >
          <div className={styles.category}>{category}</div>
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
      {newLine === true && <div className={styles.lineBreak}></div>}
    </>
  )
}

export default NewsItem
