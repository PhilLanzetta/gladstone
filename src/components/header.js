import React, { useState } from "react"
import * as styles from "./header.module.css"
import { Link } from "gatsby"
import useWindowSize from "../utils/useWindowSize"
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion"
import smallLogo from "../images/Gladstone_Small.svg"
import bigLogo from "../images/Gladstone_Big.svg"

const Header = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const isHome = location?.pathname === "/"
  const { width } = useWindowSize()
  const isMobile = width < 700
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", latest => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 100) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <header
      className={isMobile ? "" : isHome ? (isOpen ? styles.homeOpen : "") : ""}
    >
      <div
        className={
          isHome
            ? isOpen
              ? styles.primaryOpen
              : styles.primaryClosed
            : styles.pagePrimary
        }
      >
        <div className={styles.primaryMenu}>
          <div>
            <button
              className={styles.menuButton}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                id={styles.navIcon}
                className={`${isOpen ? styles.open : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              Menu
            </button>
          </div>
          {isHome && (
            <div className={isOpen ? styles.smallLogo : styles.logo}>
              <Link to="/">
                <AnimatePresence>
                  {isOpen ? (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key="smallLogo"
                      src={smallLogo}
                      alt="Gladstone Gallery Logo"
                    ></motion.img>
                  ) : (
                    <motion.img
                      variants={{
                        visible: { opacity: 1 },
                        hidden: { opacity: 0 },
                      }}
                      initial={{ opacity: 0 }}
                      animate={hidden ? "hidden" : "visible"}
                      key="bigLogo"
                      src={bigLogo}
                      alt="Gladstone Gallery Logo"
                    ></motion.img>
                  )}
                </AnimatePresence>
              </Link>
            </div>
          )}
          {!isHome && (
            <div className={styles.smallLogo}>
              <Link to="/">
                <img src={smallLogo} alt="Gladstone Gallery Logo"></img>
              </Link>
            </div>
          )}
          <div>
            {isOpen && (
              <div className={styles.searchIcon}>
                <Link to="/search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.28"
                    height="17.233"
                    viewBox="0 0 15.28 17.233"
                  >
                    <g
                      id="Group_139"
                      data-name="Group 139"
                      transform="translate(-31.534 -30.777)"
                    >
                      <line
                        id="Line_150"
                        data-name="Line 150"
                        y1="5.862"
                        x2="5.073"
                        transform="translate(32.102 41.657)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1.5"
                      />
                      <g
                        id="Ellipse_8"
                        data-name="Ellipse 8"
                        transform="translate(34.639 30.777)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1.5"
                      >
                        <circle cx="6.088" cy="6.088" r="6.088" stroke="none" />
                        <circle cx="6.088" cy="6.088" r="5.338" fill="none" />
                      </g>
                    </g>
                  </svg>
                </Link>
              </div>
            )}
            <div className={styles.language}>
              <button>中文</button>
              <button>한국인</button>
              <button className={styles.activeLanguage}>EN</button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="secondaryMenu"
            initial={isMobile ? { opacity: 0 } : { maxHeight: 0, opacity: 0 }}
            animate={
              isMobile ? { opacity: 1 } : { maxHeight: "300px", opacity: 1 }
            }
            exit={
              isMobile
                ? { opacity: 0 }
                : { maxHeight: 0, paddingTop: 0, paddingBottom: 0, opacity: 0 }
            }
            className={
              isMobile
                ? isHome
                  ? styles.homeMobileSecondaryMenu
                  : styles.secondaryMenu
                : isHome
                ? styles.homeSecondaryMenu
                : styles.desktopSecondaryMenu
            }
          >
            <Link to="/artists" className={styles.headerLink}>
              Artists
            </Link>
            <Link to="/exhibitions" className={styles.headerLink}>
              Exhibitions
            </Link>
            <Link to="/fairs" className={styles.headerLink}>
              Fairs
            </Link>
            <Link to="/news" className={styles.headerLink}>
              News & Events
            </Link>
            <Link to="/about" className={styles.headerLink}>
              About
            </Link>
            <Link to="/shop" className={styles.headerLink}>
              Shop
            </Link>
            {!isMobile && (
              <Link to="/search" className={styles.headerSearch}>
                Search
              </Link>
            )}
            {isMobile && (
              <div className={styles.secondaryBottom}>
                <div className={styles.headerLocations}>
                  <a href="https://google.com" target="_blank" rel="noreferrer">
                    New York
                  </a>
                  <a href="https://google.com" target="_blank" rel="noreferrer">
                    Brussels
                  </a>
                  <a href="https://google.com" target="_blank" rel="noreferrer">
                    Seoul
                  </a>
                </div>
                <div className={styles.headerSearchContainer}>
                  <Link to="/search" className={styles.headerSearch}>
                    Search
                  </Link>
                </div>
                <div className={styles.mobileLanguage}>
                  <button>中文</button>
                  <button>한국인</button>
                  <button className={styles.activeLanguage}>EN</button>
                </div>
                <div className={styles.headerSocial}>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WeChat
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
