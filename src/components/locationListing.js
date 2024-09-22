import React from "react"
import * as styles from "./locationListing.module.css"

const LocationListing = () => {
  return (
    <div className={styles.locationListingContainer}>
      <a href="https://google.com" target="_blank" rel="noreferrer">
        <p className={styles.locationHeading}>New York: 24th Street</p>
        <p>
          515 West 24th Street<br></br>New York, NY 10011
        </p>
      </a>
      <a href="https://google.com" target="_blank" rel="noreferrer">
        <p className={styles.locationHeading}>New York: 21st Street</p>
        <p>
          530 West 21st Street<br></br>New York, NY 10011
        </p>
      </a>
      <a href="https://google.com" target="_blank" rel="noreferrer">
        <p className={styles.locationHeading}>New York: 64th Street</p>
        <p>
          130 East 64th Street<br></br>New York, NY 10065
        </p>
      </a>
      <a href="https://google.com" target="_blank" rel="noreferrer">
        <p className={styles.locationHeading}>Brussels</p>
        <p>
          Grote Hertstraat 12 Rue du Grand Cerf<br></br>Brussels, Belgium 1000
        </p>
      </a>
      <a href="https://google.com" target="_blank" rel="noreferrer">
        <p className={styles.locationHeading}>Seoul</p>
        <p>
          760, Samseong-ro, Gangnam-gu<br></br>Seoul, 06070, Republic of Korea
        </p>
      </a>
    </div>
  )
}

export default LocationListing
