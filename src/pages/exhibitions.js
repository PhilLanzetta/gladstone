import React, { useState } from "react"
import { graphql } from "gatsby"
import * as styles from "../components/exhibitions.module.css"
import moment from "moment"
import ExhibitionTile from "../components/exhibitionTile"
import { AnimatePresence, motion } from "framer-motion"
import Pagination from "../components/pagination"
import { FormattedMessage } from "gatsby-plugin-intl"
import Seo from "../components/seo"

const Exhibitions = ({ pageContext, data }) => {
  const today = moment()

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const exhibitions = data.allContentfulExhibition.nodes

  const current = exhibitions.filter(
    exhibition =>
      moment(exhibition.startDate).isBefore(today) &&
      moment(exhibition.endDate).isAfter(today)
  )

  const upcoming = exhibitions.filter(exhibition =>
    moment(exhibition.startDate).isAfter(today)
  ).reverse()

  const allPast = exhibitions.filter(exhibition =>
    moment(exhibition.endDate).isBefore(today)
  )

  const allArtists = allPast
    .map(exhibit => exhibit.artists)
    .flat()
    .map(artist => artist?.name)
    .filter(onlyUnique)
    .sort((a, b) => a.split(" ").pop().localeCompare(b.split(" ").pop()))

  const allLocations = allPast
    .map(exhibit => exhibit.region)
    .filter(onlyUnique)
    .sort()

  const allYears = allPast
    .map(exhibit => moment(exhibit.startDate).year())
    .filter(onlyUnique)
    .sort()
    .reverse()

  const [past, setPast] = useState(allPast)
  const [yearOpen, setYearOpen] = useState(false)
  const [artistOpen, setArtistOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [change, setChange] = useState(0)

  const handleFilter = (category, value) => {
    if (category === "artist") {
      const filteredByArtist = allPast
        .filter(exhibit => exhibit.artists?.length)
        .filter(exhibitWithArtist =>
          exhibitWithArtist.artists.some(artist => artist.name === value)
        )
      setPast(filteredByArtist)
      setArtistOpen(false)
      setChange(prev => prev + 1)
    } else if (category === "location") {
      const filterByLocation = allPast.filter(
        exhibit => exhibit.region === value
      )
      setPast(filterByLocation)
      setLocationOpen(false)
      setChange(prev => prev + 1)
    } else if (category === "year") {
      const filterByYear = allPast.filter(
        exhibit =>
          moment(exhibit.startDate).year() === value ||
          moment(exhibit.endDate).year() === value
      )
      setPast(filterByYear)
      setYearOpen(false)
      setChange(prev => prev + 1)
    }
  }

  return (
    <div className="pageContainer">
      <div className={styles.exhibitionsHeader}>
        <div className="pageHeading">
          <FormattedMessage id="exhibitions"></FormattedMessage>
        </div>
        <div className={styles.headerLinkContainer}>
          {current?.length > 0 && (
            <a href="#current" className={styles.landingLink}>
              <FormattedMessage id="current"></FormattedMessage>
            </a>
          )}
          {upcoming?.length > 0 && (
            <a href="#upcoming">
              <FormattedMessage id="upcoming"></FormattedMessage>
            </a>
          )}
          <a href="#past">
            <FormattedMessage id="past"></FormattedMessage>
          </a>
        </div>
      </div>
      <div id="current" className={styles.currentContainer}>
        {current.length > 0 &&
          current.map(exhibit => (
            <ExhibitionTile key={exhibit.id} content={exhibit}></ExhibitionTile>
          ))}
      </div>
      {upcoming?.length > 0 && (
        <>
          <p className={styles.exhibitSectionHeading}>
            <FormattedMessage id="upcoming"></FormattedMessage>
          </p>
          <div id="upcoming" className={styles.upcomingContainer}>
            {upcoming.map(exhibit => (
              <ExhibitionTile
                key={exhibit.id}
                content={exhibit}
              ></ExhibitionTile>
            ))}
          </div>
        </>
      )}
      <div
        id="past"
        className={`${styles.pastHeading} ${styles.exhibitSectionHeading}`}
      >
        <p>
          <FormattedMessage id="past"></FormattedMessage>
        </p>
        <div className={styles.filterContainer}>
          <p>
            <FormattedMessage id="filter"></FormattedMessage>:
          </p>
          <div className={styles.filterRelative}>
            <button
              onClick={() => setArtistOpen(!artistOpen)}
              className={styles.filterButton}
            >
              <FormattedMessage id="artist"></FormattedMessage>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14.43 7.922"
                className={artistOpen ? styles.filterOpen : styles.filterClosed}
              >
                <g
                  id="Component_2_1"
                  data-name="Component 2 – 1"
                  transform="translate(0.354 0.707)"
                >
                  <path
                    id="Path_9"
                    data-name="Path 9"
                    d="M24.628,597.393l6.861-6.861,6.861,6.861"
                    transform="translate(-24.628 -590.532)"
                    fill="none"
                    stroke="#000"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </button>
            <AnimatePresence>
              {artistOpen && (
                <motion.div
                  key="artists"
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: "300px" }}
                  exit={{ opacity: 0, maxHeight: 0 }}
                  className={styles.artistDropdown}
                >
                  <button
                    onClick={() => {
                      setPast(allPast)
                      setArtistOpen(false)
                      setChange(prev => prev + 1)
                    }}
                    className={styles.dropdownButton}
                  >
                    <FormattedMessage id="all_artists"></FormattedMessage>
                  </button>
                  {allArtists.map((artist, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilter("artist", artist)}
                      className={styles.dropdownButton}
                    >
                      {artist}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.filterRelative}>
            <button
              onClick={() => setLocationOpen(!locationOpen)}
              className={styles.filterButton}
            >
              <FormattedMessage id="location"></FormattedMessage>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14.43 7.922"
                className={
                  locationOpen ? styles.filterOpen : styles.filterClosed
                }
              >
                <g
                  id="Component_2_1"
                  data-name="Component 2 – 1"
                  transform="translate(0.354 0.707)"
                >
                  <path
                    id="Path_9"
                    data-name="Path 9"
                    d="M24.628,597.393l6.861-6.861,6.861,6.861"
                    transform="translate(-24.628 -590.532)"
                    fill="none"
                    stroke="#000"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </button>
            <AnimatePresence>
              {locationOpen && (
                <motion.div
                  key="locations"
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: "300px" }}
                  exit={{ opacity: 0, maxHeight: 0 }}
                  className={styles.artistDropdown}
                >
                  <button
                    onClick={() => {
                      setPast(allPast)
                      setLocationOpen(false)
                      setChange(prev => prev + 1)
                    }}
                    className={styles.dropdownButton}
                  >
                    <FormattedMessage id="all_locations"></FormattedMessage>
                  </button>
                  {allLocations.map((location, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilter("location", location)}
                      className={styles.dropdownButton}
                    >
                      <FormattedMessage
                        id={location.toLowerCase().replace(" ", "_")}
                      ></FormattedMessage>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.filterRelative}>
            <button
              onClick={() => setYearOpen(!yearOpen)}
              className={styles.filterButton}
            >
              <FormattedMessage id="year"></FormattedMessage>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14.43 7.922"
                className={yearOpen ? styles.filterOpen : styles.filterClosed}
              >
                <g
                  id="Component_2_1"
                  data-name="Component 2 – 1"
                  transform="translate(0.354 0.707)"
                >
                  <path
                    id="Path_9"
                    data-name="Path 9"
                    d="M24.628,597.393l6.861-6.861,6.861,6.861"
                    transform="translate(-24.628 -590.532)"
                    fill="none"
                    stroke="#000"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </button>
            <AnimatePresence>
              {yearOpen && (
                <motion.div
                  key="years"
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: "300px" }}
                  exit={{ opacity: 0, maxHeight: 0 }}
                  className={styles.artistDropdown}
                >
                  <button
                    onClick={() => {
                      setPast(allPast)
                      setYearOpen(false)
                      setChange(prev => prev + 1)
                    }}
                    className={styles.dropdownButton}
                  >
                    <FormattedMessage id="all_years"></FormattedMessage>
                  </button>
                  {allYears.map((year, index) => (
                    <button
                      key={index}
                      onClick={() => handleFilter("year", year)}
                      className={styles.dropdownButton}
                    >
                      {year}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {past.length > 0 && (
        <Pagination
          type="exhibit"
          data={past}
          showNum={6}
          key={change}
        ></Pagination>
      )}
    </div>
  )
}

export const query = graphql`
  query constentfulExhibitPage($locale: String) {
    allContentfulExhibition(
      sort: { startDate: DESC }
      filter: { node_locale: { eq: $locale } }
    ) {
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

export const Head = () => <Seo title="Exhibitions" />

export default Exhibitions
