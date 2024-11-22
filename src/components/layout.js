import React from "react"
import "./global.css"
import Header from "./header"
import Footer from "./footer"
import { AnimatePresence, motion } from "framer-motion"
import ShopHeading from "./shopHeading"
import CookieConsent from "react-cookie-consent"

const Layout = ({ children, location }) => {
  const isHome =
    location?.pathname === "/en/" ||
    location?.pathname === "/zh/" ||
    location?.pathname === "/ko/"
  const isShop = location?.pathname.includes('shop')
  const container = {
    out: { opacity: 0, transition: { duration: 0.5 } },
    in: { opacity: 1, transition: { duration: 2 } },
    start: { opacity: 0 },
  }

  return (
    <>
      <Header isHome={isHome}></Header>
      {isShop && <ShopHeading></ShopHeading>}
      <AnimatePresence mode="wait">
        {isHome ? (
          <motion.main
            key={isHome}
            variants={container}
            initial="start"
            animate="in"
            exit="out"
          >
            {children}
            <Footer></Footer>
          </motion.main>
        ) : (
          <motion.main
            key={location.pathname}
            variants={container}
            initial="start"
            animate="in"
            exit="out"
          >
            {children}
            <Footer></Footer>
          </motion.main>
        )}
      </AnimatePresence>
      <CookieConsent
        location="bottom"
        enableDeclineButton
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="gatsby-gdpr-google-analytics"
        acceptOnScroll={true}
        acceptOnScrollPercentage={50}
        flipButtons
        disableStyles={true}
        buttonClasses="cookiesBtn"
        containerClasses="cookiesContainer"
        contentClasses="cookiesContent"
        declineButtonClasses="cookiesDecline"
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  )
}

export default Layout
