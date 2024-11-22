import React from "react"
import { graphql } from "gatsby"

const Flex = ({ data }) => {
  const { title, content } = data.contentfulFlexPage
  return (
    <div className="pageContainer">
      <div className="pageHeading">{title}</div>
      <div className="flexPageContent"
        dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }}
      ></div>
    </div>
  )
}

export const query = graphql`
  query getSingleFlex($slug: String) {
    contentfulFlexPage(slug: { eq: $slug }) {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default Flex
