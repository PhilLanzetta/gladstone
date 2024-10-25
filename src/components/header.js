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
import bigLogoBlack from "../images/Gladstone_Big_Black.svg"

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
        <div
          className={`${styles.primaryMenu} ${
            isOpen ? styles.primaryMenuOpen : styles.primaryMenuClosed
          }`}
        >
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
              {!isMobile && "Menu"}
            </button>
          </div>
          {isHome && (
            <div
              className={`${styles.logo} ${
                hidden ? styles.hideLogo : styles.showLogo
              }`}
            >
              <Link to="/">
                <img
                  src={isOpen ? bigLogoBlack : bigLogo}
                  alt="Gladstone Gallery Logo"
                ></img>
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
            <div className={styles.language}>
              <button>中文</button>
              <button>한국인</button>
              <button className={styles.activeLanguage}>EN</button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="secondaryMenu"
              initial={isMobile ? { opacity: 0, maxHeight: 0 } : { opacity: 0 }}
              animate={
                isMobile ? { opacity: 1, maxHeight: "100vh" } : { opacity: 1 }
              }
              exit={
                isMobile
                  ? { opacity: 0, maxHeight: 0 }
                  : {
                      opacity: 0,
                    }
              }
              className={
                isMobile
                  ? styles.secondaryMenu
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
              <Link to="/search">Search</Link>
              {isMobile && (
                <div className={styles.secondaryBottom}>
                  <div className={styles.headerLocations}>
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      New York
                    </a>
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Brussels
                    </a>
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Seoul
                    </a>
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
      </div>
    </header>
  )
}

export default Header
