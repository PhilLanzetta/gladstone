import React from "react"
import Layout from "../components/layout"
import * as styles from '../components/artists.module.css'

const Artists = () => {
  return (
    <Layout>
      <div className="pageContainer">
        <div className={styles.artistsPageHeading}>Artists</div>
      </div>
    </Layout>
  )
}

export default Artists
