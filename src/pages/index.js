import React, { useRef, useEffect, useState } from "react"
import { graphql } from "gatsby"
import HomeTile from "../components/homeTile"
import * as styles from "../components/index.module.css"
import LocationListing from "../components/locationListing"
import Seo from "../components/seo"
import CTABanner from "../components/ctaBanner"

const Index = ({ data, pageContext }) => {
  const { homeTiles, cta } = data.allContentfulHomePage.nodes[0]
  const [isSubscribeOpen, setSubscribeOpen] = useState(false)

  const scrollRef = useRef(0) // Using useRef to store the last scroll position

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollPosition = window.scrollY
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollPosition / totalHeight) * 100
      const hasShowed = localStorage.getItem("pop-up")

      // Check if scrolled three-quarters down (75%)
      if (scrollPercentage >= 75 && !hasShowed && !isSubscribeOpen) {
        setSubscribeOpen(true)
        localStorage.setItem("pop-up", true)
      }
      scrollRef.current = scrollPosition // Update the last scroll position
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll) // Cleanup event listener
    }
  }, [isSubscribeOpen])

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
