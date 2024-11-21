import React from "react"
import "./global.css"
import Header from "./header"
import Footer from "./footer"
import { AnimatePresence, motion } from "framer-motion"
import ShopHeading from "./shopHeading"

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
    </>
  )
}

export default Layout
