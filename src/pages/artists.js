import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import * as styles from "../components/artists.module.css"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Artists = ({ data }) => {
  const { nodes } = data.allContentfulArtist
  const alphabeticNames = nodes.sort((a, b) =>
    a.name.split(" ").pop().localeCompare(b.name.split(" ").pop())
  )

  const [view, setView] = useState()

  useEffect(() => {
    if (localStorage.getItem("view")) {
      setView(localStorage.getItem("view"))
    } else {
      setView("grid")
    }
  }, [])

  return (
    <Layout>
      <div className="pageContainer">
        <div className={styles.artistHeader}>
          <div className="pageHeading">Artists</div>
          <div className={styles.viewContainer}>
            <p>View:</p>
            <button
              className={`${styles.viewButton}
                ${view === "grid" ? "" : styles.faded}
              `}
              onClick={() => {
                localStorage.setItem("view", "grid")
                setView("grid")
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
              >
                <rect
                  id="Rectangle_3"
                  data-name="Rectangle 3"
                  width="7"
                  height="7"
                />
                <rect
                  id="Rectangle_6"
                  data-name="Rectangle 6"
                  width="7"
                  height="7"
                  transform="translate(0 9)"
                />
                <rect
                  id="Rectangle_4"
                  data-name="Rectangle 4"
                  width="7"
                  height="7"
                  transform="translate(10)"
                />
                <rect
                  id="Rectangle_5"
                  data-name="Rectangle 5"
                  width="7"
                  height="7"
                  transform="translate(10 9)"
                />
              </svg>
            </button>
            <button
              className={`${styles.viewButton}
                ${view === "list" ? "" : styles.faded}
              `}
              onClick={() => {
                localStorage.setItem("view", "list")
                setView("list")
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="15.54"
                viewBox="0 0 17 15.54"
              >
                <g
                  id="Group_105"
                  data-name="Group 105"
                  transform="translate(-1839 -169)"
                >
                  <g
                    id="Group_102"
                    data-name="Group 102"
                    transform="translate(11)"
                  >
                    <line
                      id="Line_1"
                      data-name="Line 1"
                      x2="17"
                      transform="translate(1828 169.5)"
                      fill="none"
                      stroke="#000"
                      stroke-width="1"
                    />
                    <line
                      id="Line_2"
                      data-name="Line 2"
                      x2="17"
                      transform="translate(1828 177.04)"
                      fill="none"
                      stroke="#000"
                      stroke-width="1"
                    />
                    <line
                      id="Line_3"
                      data-name="Line 3"
                      x2="17"
                      transform="translate(1828 184.04)"
                      fill="none"
                      stroke="#000"
                      stroke-width="1"
                    />
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.artistContainer}>
          {alphabeticNames.map(artist => (
            <Link
              key={artist.id}
              to={`/artist/${artist.slug}`}
              className={styles.artistLink}
            >
              {view === "list" ? (
                <p>{artist.name}</p>
              ) : (
                <div className={styles.artistTile}>
                  <GatsbyImage
                    image={artist.featuredImage?.image.gatsbyImageData}
                    alt={artist.featuredImage?.description}
                    className={styles.artistTileImage}
                  ></GatsbyImage>
                  <p>{artist.name}</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulArtist {
      nodes {
        name
        id
        slug
        featuredImage {
          image {
            description
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default Artists
