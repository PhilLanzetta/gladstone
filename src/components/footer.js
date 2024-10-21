import React from "react"
import * as styles from "./footer.module.css"
import { Link } from "gatsby"
import MailForm from "./mailForm"
import logo from "../images/Gladstone_Small.svg"

const Footer = () => {
  return (
    <footer>
      <div className={styles.upperFooter}>
        <div className={styles.linkContainer}>
          <div className={styles.linkColumn}>
            <Link to="/artists">Artists</Link>
            <Link to="/exhibitions">Exhibitions</Link>
            <Link to="/events">Events</Link>
            <Link to="/shop">Publications</Link>
          </div>
          <div className={styles.linkColumn}>
            <Link to="/about">About</Link>
            <Link to="/about">Staff</Link>
            <Link to="/about">Careers</Link>
            <Link to="/about">Privacy & Cookies</Link>
            <Link to="/about">Accessibility</Link>
          </div>
          <div className={styles.linkColumn}>
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              WeChat
            </a>
          </div>
        </div>
        <MailForm></MailForm>
      </div>
      <div className={styles.lowerFooter}>
        <img
          src={logo}
          alt="Gladstone Gallery logo"
          className={styles.footerLogo}
        ></img>
        <div className={styles.lowerFooterLinks}>
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
      </div>
    </footer>
  )
}

export default Footer
