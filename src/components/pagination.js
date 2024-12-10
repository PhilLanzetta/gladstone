import React, { useEffect, useState } from "react"
import moment from "moment"
import * as styles from "./pagination.module.css"
import ProductTile from "./productTile"
import ExhibitionTile from "./exhibitionTile"
import { FormattedMessage } from "gatsby-plugin-intl"

const Pagination = ({ type, data, showNum, fair, page }) => {
  const allData = data
  const [dataList, setDataList] = useState([...allData.slice(0, showNum)])
  const [loadMoreData, setLoadMoreData] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(allData?.length > showNum)

  const handleLoadMore = () => {
    setLoadMoreData(true)
  }

  useEffect(() => {
    if (loadMoreData && hasMoreData) {
      const currentLength = dataList?.length
      const isMore = currentLength < allData.length
      const nextResults = isMore
        ? allData.slice(currentLength, currentLength + showNum)
        : []
      setDataList([...dataList, ...nextResults])
      setLoadMoreData(false)
    }
  }, [loadMoreData, hasMoreData, allData, dataList, showNum])

  //Check if there is more
  useEffect(() => {
    const isMore = dataList?.length < allData?.length
    setHasMoreData(isMore)
  }, [dataList, allData?.length])

  return (
    <div className={styles.paginationContainer}>
      {type === "press" &&
        dataList.map(pressItem => (
          <div key={pressItem.id} className={styles.pressItem}>
            <p>{pressItem.title}</p>
            <p>{pressItem.publication}</p>
            <p>{pressItem.author}</p>
            <p className={styles.pressSecondary}>
              {pressItem.showDate === false
                ? moment(pressItem.date).format("MMMM, YYYY")
                : moment(pressItem.date).format("MMMM D, YYYY")}
            </p>
            {pressItem.articlePdf && (
              <a
                className={styles.pressSecondaryLink}
                href={pressItem.articlePdf.file.url}
                target="_blank"
                rel="noreferrer"
              >
                <FormattedMessage id="download_pdf"></FormattedMessage> &darr;
              </a>
            )}
            {pressItem.articleLink && (
              <a
                href={pressItem.articleLink}
                target="_blank"
                rel="noreferrer"
                className={styles.pressSecondaryLink}
              >
                <FormattedMessage id="view_website"></FormattedMessage> &#8599;
              </a>
            )}
          </div>
        ))}
      {type === "product" &&
        dataList.map(product => (
          <ProductTile
            key={product.id}
            product={product}
            page={page}
          ></ProductTile>
        ))}
      {type === "exhibit" &&
        dataList.map(exhibit => (
          <ExhibitionTile
            key={exhibit.id}
            content={exhibit}
            past={true}
            fair={fair}
          ></ExhibitionTile>
        ))}
      {hasMoreData && (
        <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
          <FormattedMessage id="view_more"></FormattedMessage>
        </button>
      )}
    </div>
  )
}

export default Pagination
