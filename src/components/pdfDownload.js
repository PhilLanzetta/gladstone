import React from "react"
import * as styles from "./pdfDownload.module.css"

const PdfDownload = ({ content, external }) => {
  return (
    <a
      href={external ? content.url : content.pdfFile.file.url}
      target="_blank"
      rel="noreferrer"
      className={styles.pdfButton}
    >
      {external ? content.label + " ↗" : "↓ " + content.buttonText}
    </a>
  )
}

export default PdfDownload
