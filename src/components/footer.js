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
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              WeChat
            </a>
          </div>
        </div>
        <MailForm></MailForm>
      </div>
      <div className={styles.lowerFooter}>
        <Link to="/" className={styles.footerLogo}>
          <img src={logo} alt="Gladstone Gallery logo"></img>
        </Link>
        <div className={styles.lowerFooterLinks}>
          <p>New York</p>
          <p>Brussels</p>
          <p>Seoul</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
