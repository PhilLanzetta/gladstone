import React from "react"
import { graphql } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"


const Flex = ({ data }) => {
  const { title, content } = data.allContentfulFlexPage.nodes[0]
  return (
    <div className="pageContainer">
      <div className="pageHeading">{title}</div>
      <div
        className="flexPageContent"
        dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }}
      ></div>
    </div>
  )
}

export const query = graphql`
  query getSingleFlex($slug: String, $locale: String) {
    allContentfulFlexPage(
      filter: { node_locale: { eq: $locale }, slug: { eq: $slug } }
    ) {
      nodes {
        title
        content {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`

export default injectIntl(Flex)
