import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import * as styles from "../components/exhibitions.module.css"
import moment from "moment"
import ExhibitionTile from "../components/exhibitionTile"

const Exhibitions = ({ data }) => {
  const today = moment()
  const exhibitions = data.allContentfulExhibition.nodes

  const current = exhibitions.filter(
    exhibition =>
      moment(exhibition.startDate).isBefore(today) &&
      moment(exhibition.endDate).isAfter(today)
  )

  const upcoming = exhibitions.filter(exhibition =>
    moment(exhibition.startDate).isAfter(today)
  )

  const past = exhibitions.filter(exhibition =>
    moment(exhibition.endDate).isBefore(today)
  )

  return (
    <Layout>
      <div className="pageContainer">
        <div className={styles.exhibitionsHeader}>
          <div className="pageHeading">Exhibitions</div>
          <div className={styles.headerLinkContainer}>
            <a href="#current" activeClassName={styles.activeLink}>
              Current
            </a>
            <a activeClassName={styles.activeLink} href="#upcoming">
              Upcoming
            </a>
            <a activeClassName={styles.activeLink} href="#offsite">
              Offsite
            </a>
            <a activeClassName={styles.activeLink} href="#past">
              Past
            </a>
          </div>
          <div></div>
        </div>
        <div id="current" className={styles.currentContainer}>
          {current.length > 0 &&
            current.map(exhibit => (
              <ExhibitionTile
                key={exhibit.id}
                content={exhibit}
              ></ExhibitionTile>
            ))}
        </div>
        <p className={styles.exhibitSectionHeading}>Upcoming</p>
        <div id="upcoming" className={styles.upcomingContainer}>
          {" "}
          {upcoming.length > 0 &&
            upcoming.map(exhibit => (
              <ExhibitionTile
                key={exhibit.id}
                content={exhibit}
              ></ExhibitionTile>
            ))}
        </div>
        <div id="offsite"></div>
        <p className={styles.exhibitSectionHeading}>Past</p>
        <div id="past" className={styles.pastContainer}>
          {past.length > 0 &&
            past.map(exhibit => (
              <ExhibitionTile
                key={exhibit.id}
                content={exhibit}
              ></ExhibitionTile>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulExhibition {
      nodes {
        id
        artists {
          id
          name
        }
        endDate
        startDate
        title
        slug
        tileImage {
          image {
            description
            gatsbyImageData
          }
        }
        location
        region
      }
    }
  }
`

export default Exhibitions
