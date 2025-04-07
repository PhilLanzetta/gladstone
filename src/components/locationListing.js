import React from "react"
import * as styles from "./locationListing.module.css"
import { FormattedMessage } from "gatsby-plugin-intl"

const LocationListing = () => {
  return (
    <div className={styles.locationListingContainer}>
      <a href="https://gladstone-dev.netlify.app/about/#new_york">
        <p className={styles.locationHeading}>
          <FormattedMessage id="new_york_24.heading"></FormattedMessage>
        </p>
        <p>
          <FormattedMessage id="new_york_24.address_1"></FormattedMessage>
          <br></br>
          <FormattedMessage id="new_york_24.address_2"></FormattedMessage>
        </p>
      </a>
      <a href="https://gladstone-dev.netlify.app/about/#new_york">
        <p className={styles.locationHeading}>
          <FormattedMessage id="new_york_21.heading"></FormattedMessage>
        </p>
        <p>
          <FormattedMessage id="new_york_21.address_1"></FormattedMessage>
          <br></br>
          <FormattedMessage id="new_york_21.address_2"></FormattedMessage>
        </p>
      </a>
      <a href="https://gladstone-dev.netlify.app/about/#new_york">
        <p className={styles.locationHeading}>
          <FormattedMessage id="new_york_64.heading"></FormattedMessage>
        </p>
        <p>
          <FormattedMessage id="new_york_64.address_1"></FormattedMessage>
          <br></br>
          <FormattedMessage id="new_york_64.address_2"></FormattedMessage>
        </p>
      </a>
      <a href="https://gladstone-dev.netlify.app/about/#brussels">
        <p className={styles.locationHeading}>
          <FormattedMessage id="brussels_location.heading"></FormattedMessage>
        </p>
        <p>
          <FormattedMessage id="brussels_location.address_1"></FormattedMessage>
          <br></br>
          <FormattedMessage id="brussels_location.address_2"></FormattedMessage>
        </p>
      </a>
      <a href="https://gladstone-dev.netlify.app/about/#seoul">
        <p className={styles.locationHeading}>
          <FormattedMessage id="seoul_location.heading"></FormattedMessage>
        </p>
        <p>
          <FormattedMessage id="seoul_location.address_1"></FormattedMessage>
          <br></br>
          <FormattedMessage id="seoul_location.address_2"></FormattedMessage>
        </p>
      </a>
    </div>
  )
}

export default LocationListing
