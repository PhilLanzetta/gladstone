import React from "react"
import * as styles from "./pdfDownload.module.css"

const PdfDownload = ({ content }) => {
  return (
    <a
      href={content.pdfFile.file.url}
      target="_blank"
      rel="noreferrer"
      className={styles.pdfButton}
    >
      ↓ {content.buttonText}
    </a>
  )
}

export default PdfDownload
