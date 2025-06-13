import React, { useContext } from "react"
import { graphql } from "gatsby"
import HomeTile from "../components/homeTile"
import * as styles from "../components/index.module.css"
import LocationListing from "../components/locationListing"
import Seo from "../components/seo"
import CTABanner from "../components/ctaBanner"
import MyContext from "../context/StateContext"

const Index = ({ data, pageContext }) => {
  const { homeTiles, cta } = data.allContentfulHomePage.nodes[0]
  const { isSubscribeOpen, setSubscribeOpen } =
    useContext(MyContext)

  return (
    <div className={styles.homeContainer}>
      {homeTiles.map(item => (
        <HomeTile
          key={item.id}
          tile={item}
          pageContext={pageContext}
        ></HomeTile>
      ))}
      <LocationListing></LocationListing>
      {cta && (
        <CTABanner
          cta={cta}
          setSubscribeOpen={setSubscribeOpen}
          isSubscribeOpen={isSubscribeOpen}
        ></CTABanner>
      )}
    </div>
  )
}

export const query = graphql`
  query contentfulHome($locale: String) {
    allContentfulHomePage(filter: { node_locale: { eq: $locale } }) {
      nodes {
        id
        homeTiles {
          artist
          mobileVideo
          video
          id
          image {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
          mobileImage {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
          tileWidth
          fontColor
          workTitle
          location {
            childMarkdownRemark {
              html
            }
          }
          link
          linkIsExternal
          videoAspectRatio
          mobileVideoAspectRatio
        }
        cta {
          backgroundImage {
            description
            gatsbyImageData
          }
          buttonText
          buttonType
          headlineText
          subtitle
          textColor
        }
      }
    }
  }
`

export const Head = () => <Seo />

export default Index
