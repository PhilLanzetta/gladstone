import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import * as styles from "../components/newsItem.module.css"
import NewsItem from "../components/newsItem"
import { FormattedMessage } from "gatsby-plugin-intl"
import Seo from "../components/seo"

const News = ({ data }) => {
  const allNews = data.allContentfulNewsEntry.nodes
  const [newsItems, setNewsItems] = useState(allNews)
  const [filter, setFilter] = useState()

  useEffect(() => {
    if (filter === "Featured") {
      const filteredContent = allNews.filter(item => item.isFeatured === true)
      setNewsItems(filteredContent)
    } else if (filter) {
      const filteredContent = allNews.filter(item => item.category === filter)
      setNewsItems(filteredContent)
    } else {
      setNewsItems(allNews)
    }
  }, [filter, allNews])

  return (
    <div className="pageContainer">
      <div className={styles.newsHeader}>
        <button
          className={`pageHeading ${styles.allNewsBtn}`}
          onClick={() => setFilter()}
        >
          <FormattedMessage id="news_events"></FormattedMessage>
        </button>
        <div className={styles.headerLinkContainer}>
          <button
            onClick={() => setFilter()}
            className={filter ? styles.buttonInactive : styles.buttonActive}
          >
            <FormattedMessage id="all"></FormattedMessage>
          </button>
          <button
            onClick={() =>
              filter === "Featured" ? setFilter() : setFilter("Featured")
            }
            className={
              filter === "Featured"
                ? styles.buttonActive
                : styles.buttonInactive
            }
          >
            <FormattedMessage id="featured"></FormattedMessage>
          </button>
          <button
            onClick={() =>
              filter === "Exhibition" ? setFilter() : setFilter("Exhibition")
            }
            className={
              filter === "Exhibition"
                ? styles.buttonActive
                : styles.buttonInactive
            }
          >
            <FormattedMessage id="museum_exhibitions"></FormattedMessage>
          </button>
          <button
            onClick={() =>
              filter === "Event" ? setFilter() : setFilter("Event")
            }
            className={
              filter === "Event" ? styles.buttonActive : styles.buttonInactive
            }
          >
            <FormattedMessage id="events"></FormattedMessage>
          </button>
          <button
            onClick={() =>
              filter === "Announcement"
                ? setFilter()
                : setFilter("Announcement")
            }
            className={
              filter === "Announcement"
                ? styles.buttonActive
                : styles.buttonInactive
            }
          >
            <FormattedMessage id="announcements"></FormattedMessage>
          </button>
        </div>
      </div>
      <div className={styles.newsContainer}>
        {newsItems.map((item, index) => {
          let newLine
          if (
            !item.isFeatured &&
            index < newsItems.length - 1 &&
            item.category !== newsItems[index + 1].category
          ) {
            newLine = true
          }
          return (
            <NewsItem key={item.id} content={item} newLine={newLine}></NewsItem>
          )
        })}
      </div>
    </div>
  )
}

export const query = graphql`
  query contentfulNews($locale: String) {
    allContentfulNewsEntry(
      sort: { date: DESC }
      filter: { node_locale: { eq: $locale } }
    ) {
      nodes {
        category
        id
        isFeatured
        link {
          label
          url
        }
        download {
          buttonText
          id
          pdfFile {
            file {
              url
            }
          }
        }
        secondaryPage {
          slug
        }
        newsImage {
          gatsbyImageData(layout: FULL_WIDTH)
          description
        }
        newsText {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title="News" />

export default News
