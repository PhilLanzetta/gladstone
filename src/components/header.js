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
import bigLogoBlack from "../images/Gladstone_Big_Black.svg"
import { injectIntl, Link, FormattedMessage } from "gatsby-plugin-intl"
// import Language from "./language"

const Header = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const isHome =
    location?.pathname === "/en/" ||
    location?.pathname === "/zh/" ||
    location?.pathname === "/ko/"
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
              {!isMobile && <FormattedMessage id="menu"></FormattedMessage>}
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
              <Language></Language>
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
                <FormattedMessage id="artists"></FormattedMessage>
              </Link>
              <Link to="/exhibitions" className={styles.headerLink}>
                <FormattedMessage id="exhibitions"></FormattedMessage>
              </Link>
              <Link to="/fairs" className={styles.headerLink}>
                <FormattedMessage id="fairs"></FormattedMessage>
              </Link>
              <Link to="/news" className={styles.headerLink}>
                <FormattedMessage id="news_events"></FormattedMessage>
              </Link>
              <Link to="/about" className={styles.headerLink}>
                <FormattedMessage id="about"></FormattedMessage>
              </Link>
              <Link to="/shop" className={styles.headerLink}>
                <FormattedMessage id="shop"></FormattedMessage>
              </Link>
              <Link to="/search">
                <FormattedMessage id="search"></FormattedMessage>
              </Link>
              {isMobile && (
                <div className={styles.secondaryBottom}>
                  <div className={styles.mobileLanguage}>
                    <Language></Language>
                  </div>
                  <div className={styles.headerSocial}>
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

export default injectIntl(Header)
