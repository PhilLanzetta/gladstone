import React, { useEffect, useState } from "react"
import * as styles from "./header.module.css"
import useWindowSize from "../utils/useWindowSize"
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion"
import smallLogo from "../images/Gladstone_Small.svg"
import bigLogo from "../images/Gladstone_Big.svg"
import smallLogoWhite from "../images/Gladstone_Small_White.svg"
import { Link, FormattedMessage } from "gatsby-plugin-intl"

const Header = ({ isHome, isAfter }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { width } = useWindowSize()
  const isMobile = width < 700
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", latest => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 100 && !isOpen) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    if (isOpen) {
      setHidden(false)
    }
    return
  }, [isOpen])

  return (
    <header
      className={isHome || isAfter ? styles.homeHeader : styles.pageHeader}
    >
      <div
        className={
          isHome
            ? isMobile
              ? isOpen
                ? styles.pagePrimary
                : styles.homeHeader
              : styles.homeHeader
            : isAfter
            ? styles.homeHeader
            : styles.pagePrimary
        }
      >
        <div className={styles.primaryMenu}>
          <div className={styles.hamburger}>
            <button
              className={styles.menuButton}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="menu"
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
              {/* {!isMobile && <FormattedMessage id="menu" className={styles.menuLabel}></FormattedMessage>} */}
            </button>
          </div>
          {isHome && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={hidden ? styles.hideLogo : styles.showLogo}
              >
                {isOpen && (
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={styles.smallLogo}
                  >
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={isMobile ? smallLogo : smallLogoWhite}
                      alt="Gladstone Gallery Logo"
                    ></motion.img>
                  </Link>
                )}
                {!isOpen && (
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={styles.logo}
                  >
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      src={bigLogo}
                      alt="Gladstone Gallery Logo"
                    ></motion.img>
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          )}
          {!isHome && (
            <div className={styles.smallLogo}>
              <Link
                to="/"
                onClick={() => {
                  setIsOpen(false)
                }}
              >
                <img
                  src={isAfter ? smallLogoWhite : smallLogo}
                  alt="Gladstone Gallery Logo"
                ></img>
              </Link>
            </div>
          )}
          <div className={styles.languageContainer}>
            <Link to="/search" className={styles.search}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 15.28 17.233"
                className={styles.searchIcon}
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
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                  <g
                    id="Ellipse_8"
                    data-name="Ellipse 8"
                    transform="translate(34.639 30.777)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <circle cx="6.088" cy="6.088" r="6.088" stroke="none" />
                    <circle cx="6.088" cy="6.088" r="5.338" fill="none" />
                  </g>
                </g>
              </svg>
            </Link>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="secondaryMenu"
              initial={
                isMobile
                  ? { opacity: 0, maxHeight: 0 }
                  : {
                      opacity: 0,
                    }
              }
              animate={
                isMobile
                  ? { opacity: 1, maxHeight: "100vh" }
                  : {
                      opacity: 1,
                    }
              }
              exit={isMobile ? { opacity: 0, maxHeight: 0 } : {}}
              className={
                isMobile
                  ? `${styles.secondaryMenu} ${
                      isAfter ? styles.black : styles.white
                    }`
                  : styles.desktopSecondaryMenu
              }
            >
              <Link
                to="/artists"
                className={styles.headerLink}
                onClick={isMobile ? () => setIsOpen(false) : null}
              >
                <FormattedMessage id="artists"></FormattedMessage>
              </Link>
              <Link
                to="/exhibitions"
                className={styles.headerLink}
                onClick={isMobile ? () => setIsOpen(false) : null}
              >
                <FormattedMessage id="exhibitions"></FormattedMessage>
              </Link>
              <Link
                to="/fairs"
                className={styles.headerLink}
                onClick={isMobile ? () => setIsOpen(false) : null}
              >
                <FormattedMessage id="fairs"></FormattedMessage>
              </Link>
              <Link
                to="/news"
                className={styles.headerLink}
                onClick={isMobile ? () => setIsOpen(false) : null}
              >
                <FormattedMessage id="news_events"></FormattedMessage>
              </Link>
              <Link
                to="/about"
                className={styles.headerLink}
                onClick={isMobile ? () => setIsOpen(false) : null}
              >
                <FormattedMessage id="about"></FormattedMessage>
              </Link>
              <Link
                to="/shop"
                className={styles.headerLink}
                onClick={isMobile ? () => setIsOpen(false) : null}
              >
                <FormattedMessage id="shop"></FormattedMessage>
              </Link>
              {isMobile && (
                <div className={styles.secondaryBottom}>
                  <div className={styles.mobileLanguage}></div>
                  <div className={styles.mobileHeaderSocial}>
                    <a
                      href="https://x.com/GladstoneNYC"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Twitter
                    </a>
                    <a
                      href="https://www.instagram.com/gladstone.gallery"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.facebook.com/GladstoneNYC"
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
      </div>
    </header>
  )
}

export default Header
