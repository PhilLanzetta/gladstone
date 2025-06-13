import React, { useContext, useEffect, useState, useRef } from "react"
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
import { Link, FormattedMessage, injectIntl } from "gatsby-plugin-intl"
import Language from "./language.js"
import MyContext from "../context/StateContext.js"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import InquirePop from "./inquirePop.js"

const Header = ({ isHome, isAfter, intl }) => {
  const { isSubscribeOpen, updateSubscribeOpen, isInquireOpen } =
    useContext(MyContext)
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [group1, setGroup1] = useState(true)
  const [group2, setGroup2] = useState(true)
  const [group3, setGroup3] = useState(true)
  const [email, setEmail] = useState("")
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

  const postUrl = process.env.GATSBY_MAILCHIMP_URL

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    if (isOpen) {
      setHidden(false)
    }
    return
  }, [isOpen])

  const scrollRef = useRef(0) // Using useRef to store the last scroll position

  useEffect(() => {
    if (isHome) {
      const handleScroll = () => {
        // Calculate scroll percentage
        const scrollPosition = window.scrollY
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight
        const scrollPercentage = (scrollPosition / totalHeight) * 100
        const hasShowed = localStorage.getItem("pop-up")

        // Check if scrolled three-quarters down (75%)
        if (scrollPercentage >= 75 && !hasShowed && !isSubscribeOpen) {
          updateSubscribeOpen(true)
          localStorage.setItem("pop-up", true)
        }
        scrollRef.current = scrollPosition // Update the last scroll position
      }

      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll) // Cleanup event listener
      }
    } else return
  }, [isSubscribeOpen, isHome])

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
            <div className={styles.language}>
              <Language></Language>
            </div>
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
                <FormattedMessage id="publications"></FormattedMessage>
              </Link>
              {isMobile && (
                <div className={styles.secondaryBottom}>
                  <div className={styles.mobileLanguage}>
                    <Language></Language>
                  </div>
                  <div className={styles.mobileHeaderSocial}>
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
      <AnimatePresence>
        {isSubscribeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.subscribePopUp}
          >
            <div className={styles.innerContainer}>
              <button
                className={styles.close}
                onClick={() => {
                  updateSubscribeOpen(false)
                  setGroup1(true)
                  setGroup2(true)
                  setGroup3(true)
                }}
              >
                <span></span>
                <span></span>
              </button>
              <MailchimpSubscribe
                url={postUrl}
                render={({ subscribe, status, message }) => {
                  if (status === "success") {
                    setTimeout(() => {
                      updateSubscribeOpen(false)
                    }, 3000)
                  }
                  return (
                    <div>
                      {status === "success" && (
                        <div>
                          <h2 className={styles.popUpHeadline}>Thank you</h2>
                          <p>
                            Gallery news and updates will arrive soon in your
                            inbox.
                          </p>
                        </div>
                      )}
                      {status !== "success" && (
                        <div>
                          <h2 className={styles.popUpHeadline}>
                            Stay In Touch
                          </h2>
                          <p>
                            Sign up to be notified about upcoming exhibitions,
                            art works, events, and more.{" "}
                          </p>
                        </div>
                      )}
                      <div
                        className={
                          status === "success" ? styles.successHide : ""
                        }
                      >
                        <input
                          type="email"
                          value={email}
                          autoCapitalize="off"
                          onChange={handleEmailChange}
                          placeholder={intl.formatMessage({ id: "email" })}
                          required
                          className={styles.emailInput}
                        />
                        <label className={styles.check}>
                          <input
                            type="checkbox"
                            checked={group1}
                            onChange={() => setGroup1(!group1)} // Replace with your group ID
                          />
                          Artist Exhibitions, News, and Events
                          <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.check}>
                          <input
                            type="checkbox"
                            checked={group2}
                            onChange={() => setGroup2(!group2)} // Replace with your group ID
                          />
                          Available Works and Art Fairs
                          <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.check}>
                          <input
                            type="checkbox"
                            checked={group3}
                            onChange={() => setGroup3(!group3)} // Replace with your group ID
                          />
                          Publications and Editions
                          <span className={styles.checkmark}></span>
                        </label>
                      </div>
                      {status === "success" ? (
                        <button
                          onClick={() => updateSubscribeOpen(false)}
                          className={styles.submit}
                        >
                          Close
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            subscribe({
                              EMAIL: email,
                              ...(group1 && { "group[70621][64]": "1" }),
                              ...(group2 && { "group[70621][512]": "1" }),
                              ...(group3 && { "group[70621][1024]": "1" }),
                            })
                          }
                          className={styles.submit}
                        >
                          Subscribe
                        </button>
                      )}
                      <div className={styles.extraPadding}></div>
                      {status === "error" && (
                        <div
                          dangerouslySetInnerHTML={{ __html: message }}
                          className={styles.errorMessage}
                        />
                      )}
                    </div>
                  )
                }}
              />
            </div>
          </motion.div>
        )}
        {isInquireOpen && <InquirePop></InquirePop>}
      </AnimatePresence>
    </header>
  )
}

export default injectIntl(Header)
