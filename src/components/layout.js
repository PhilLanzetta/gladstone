import React from "react"
import "./global.css"
import Header from "./header"
import Footer from "./footer"
import { motion } from "framer-motion"

const Layout = ({ children, location }) => {
  const container = {
    out: { opacity: 0, transition: { duration: 4 } },
    in: { opacity: 1, transition: { duration: 2 } },
    start: { opacity: 0 },
  }
  return (
    <>
      <Header location={location}></Header>
      <motion.main
        key="main"
        variants={container}
        initial="start"
        animate="in"
        exit="out"
      >
        {children}
        <Footer></Footer>
      </motion.main>
    </>
  )
}

export default Layout
