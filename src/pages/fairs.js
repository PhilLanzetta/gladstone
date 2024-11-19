import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import * as styles from "../components/exhibitions.module.css"
import moment from "moment"
import ExhibitionTile from "../components/exhibitionTile"
import { AnimatePresence, motion } from "framer-motion"
import Pagination from "../components/pagination"

const Fairs = ({ data }) => {
  const today = moment()

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const fairs = data.allContentfulFair.nodes

  const current = fairs.filter(
    fair =>
      moment(fair.startDate).isBefore(today) &&
      moment(fair.endDate).isAfter(today)
  )

  const upcoming = fairs.filter(fair => moment(fair.startDate).isAfter(today))

  const allPast = fairs.filter(fair => moment(fair.endDate).isBefore(today))

  const allArtists = allPast
    .map(exhibit => exhibit.artists)
    .flat()
    .map(artist => artist?.name)
    .filter(onlyUnique)
    .sort((a, b) => a.split(" ").pop().localeCompare(b.split(" ").pop()))

  const allLocations = allPast
    .map(exhibit => exhibit.city)
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
      const filterdByArtist = allPast.filter(exhibit =>
        exhibit.artists.some(artist => artist.name === value)
      )
      setPast(filterdByArtist)
      setArtistOpen(false)
      setChange(prev => prev + 1)
    } else if (category === "location") {
      const filterByLocation = allPast.filter(exhibit => exhibit.city === value)
      setPast(filterByLocation)
      setLocationOpen(false)
      setChange(prev => prev + 1)
    } else if (category === "year") {
      const filterByYear = allPast.filter(
        exhibit => moment(exhibit.startDate).year() === value
      )
      setPast(filterByYear)
      setYearOpen(false)
      setChange(prev => prev + 1)
    }
  }

  return (
      <div className="pageContainer">
        <div className={styles.exhibitionsHeader}>
          <div className="pageHeading">Fairs</div>
          <div className={styles.headerLinkContainer}>
            <a href="#current" className={styles.landingLink}>
              Current
            </a>
            <a href="#upcoming">Upcoming</a>
            <a href="#past">Past</a>
          </div>
        </div>
        <div id="current" className={styles.currentContainer}>
          {current.length > 0 &&
            current.map(exhibit => (
              <ExhibitionTile
                key={exhibit.id}
                content={exhibit}
                fair={true}
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
                fair={true}
              ></ExhibitionTile>
            ))}
        </div>
        <div
          id="past"
          className={`${styles.pastHeading} ${styles.exhibitSectionHeading}`}
        >
          <p>Past</p>
          <div className={styles.filterContainer}>
            <p>Filter:</p>
            <div className={styles.filterRelative}>
              <button
                onClick={() => setArtistOpen(!artistOpen)}
                className={styles.filterButton}
              >
                Artist
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14.43 7.922"
                  className={
                    artistOpen ? styles.filterOpen : styles.filterClosed
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
                      All Artists
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
                Location
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
                      All Locations
                    </button>
                    {allLocations.map((location, index) => (
                      <button
                        key={index}
                        onClick={() => handleFilter("location", location)}
                        className={styles.dropdownButton}
                      >
                        {location}
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
                Year
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
                      All Years
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
        {past.length && (
          <Pagination
            type="exhibit"
            data={past}
            showNum={6}
            key={change}
            fair={true}
          ></Pagination>
        )}
      </div>
  )
}

export const query = graphql`
  query {
    allContentfulFair(
      sort: { startDate: DESC }
      filter: { node_locale: { eq: "en-US" } }
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
        city
      }
    }
  }
`

export default Fairs
