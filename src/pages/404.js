import * as React from "react"
import Seo from "../components/seo"
import { Link, FormattedMessage } from "gatsby-plugin-intl"

const NotFoundPage = () => (
  <div className="pageContainer">
    <div className="notFound">
      <h1 className="pageHeading">
        <FormattedMessage id="404"></FormattedMessage>
      </h1>
      <p>
        <FormattedMessage id="not_found"></FormattedMessage>
      </p>
      <Link to="/">
        <FormattedMessage id="return_home"> </FormattedMessage>
      </Link>
    </div>
  </div>
)

export const Head = () => <Seo title="Not Found" />

export default NotFoundPage
