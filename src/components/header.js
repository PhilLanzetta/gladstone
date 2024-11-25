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
import Language from "./language"

const Header = ({ isHome }) => {
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
    <header className={isHome ? styles.homeHeader : styles.pageHeader}>
      <div
        className={
          isHome
            ? isMobile
              ? isOpen
                ? styles.pagePrimary
                : styles.homeHeader
              : styles.homeHeader
            : styles.pagePrimary
        }
      >
        <div className={styles.primaryMenu}>
          <div className={styles.hamburger}>
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
            <div className={hidden ? styles.hideLogo : styles.showLogo}>
                {isOpen && (
                  <Link to="/" onClick={() => setIsOpen(false)} className={styles.smallLogo}>
                  <img
                    src={isMobile ? smallLogo : smallLogoWhite}
                    
                    alt="Gladstone Gallery Logo"
                  ></img>
                  </Link>
                )}
                {!isOpen && (
                  <Link to="/" onClick={() => setIsOpen(false)} className={styles.logo}>
                  <img
                    src={bigLogo}
                    
                    alt="Gladstone Gallery Logo"
                  ></img>
                  </Link>
                )}
            </div>
          )}
          {!isHome && (
            <div className={styles.smallLogo}>
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img src={smallLogo} alt="Gladstone Gallery Logo"></img>
              </Link>
            </div>
          )}
          <div className={styles.languageContainer}>
            <div className={styles.language}>
              <Language></Language>
            </div>
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
                isMobile ? styles.secondaryMenu : styles.desktopSecondaryMenu
              }
            >
              <Link
                to="/artists"
                className={styles.headerLink}
                onClick={
                  isHome
                    ? () => setTimeout(() => setIsOpen(false), 50)
                    : () => setIsOpen(false)
                }
              >
                <FormattedMessage id="artists"></FormattedMessage>
              </Link>
              <Link
                to="/exhibitions"
                className={styles.headerLink}
                onClick={
                  isHome
                    ? () => setTimeout(() => setIsOpen(false), 50)
                    : () => setIsOpen(false)
                }
              >
                <FormattedMessage id="exhibitions"></FormattedMessage>
              </Link>
              <Link
                to="/fairs"
                className={styles.headerLink}
                onClick={
                  isHome
                    ? () => setTimeout(() => setIsOpen(false), 50)
                    : () => setIsOpen(false)
                }
              >
                <FormattedMessage id="fairs"></FormattedMessage>
              </Link>
              <Link
                to="/news"
                className={styles.headerLink}
                onClick={
                  isHome
                    ? () => setTimeout(() => setIsOpen(false), 50)
                    : () => setIsOpen(false)
                }
              >
                <FormattedMessage id="news_events"></FormattedMessage>
              </Link>
              <Link
                to="/about"
                className={styles.headerLink}
                onClick={
                  isHome
                    ? () => setTimeout(() => setIsOpen(false), 50)
                    : () => setIsOpen(false)
                }
              >
                <FormattedMessage id="about"></FormattedMessage>
              </Link>
              <Link
                to="/shop"
                className={styles.headerLink}
                onClick={
                  isHome
                    ? () => setTimeout(() => setIsOpen(false), 50)
                    : () => setIsOpen(false)
                }
              >
                <FormattedMessage id="shop"></FormattedMessage>
              </Link>
              <Link
                to="/search"
                onClick={
                  isHome
                    ? () => setTimeout(() => setIsOpen(false), 50)
                    : () => setIsOpen(false)
                }
              >
                <FormattedMessage id="search"></FormattedMessage>
              </Link>
              {isMobile && (
                <div className={styles.secondaryBottom}>
                  <div className={styles.mobileLanguage}>
                    <Language></Language>
                  </div>
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
