import React from "react"
import * as styles from "./footer.module.css"
import MailForm from "./mailForm"
import logo from "../images/Gladstone_Small.svg"
import whiteLogo from "../images/Gladstone_Small_White.svg"
import { Link, FormattedMessage } from "gatsby-plugin-intl"

const Footer = isAfter => {
  return (
    <footer className={isAfter ? styles.afterFooter : styles.footer}>
      <div className={styles.upperFooter}>
        <div className={styles.linkContainer}>
          <div className={isAfter ? styles.afterLinkColumn : styles.linkColumn}>
            <Link to="/artists">
              <FormattedMessage id="artists"></FormattedMessage>
            </Link>
            <Link to="/exhibitions">
              <FormattedMessage id="exhibitions"></FormattedMessage>
            </Link>
            <Link to="/events">
              <FormattedMessage id="events"></FormattedMessage>
            </Link>
            <Link to="/shop/publications">
              <FormattedMessage id="publications"></FormattedMessage>
            </Link>
          </div>
          <div className={isAfter ? styles.afterLinkColumn : styles.linkColumn}>
            <Link to="/about">
              <FormattedMessage id="about"></FormattedMessage>
            </Link>
            <Link to="/about/#staff">
              <FormattedMessage id="staff"></FormattedMessage>
            </Link>
            <Link to="/careers">
              <FormattedMessage id="careers"></FormattedMessage>
            </Link>
            <Link to="/privacy">
              <FormattedMessage id="privacy"></FormattedMessage>
            </Link>
            <Link to="/accessibility">
              <FormattedMessage id="accessibility"></FormattedMessage>
            </Link>
          </div>
          <div className={isAfter ? styles.afterLinkColumn : styles.linkColumn}>
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
        <MailForm isAfter={isAfter}></MailForm>
      </div>
      <div className={styles.lowerFooter}>
        <Link to="/" className={styles.footerLogo}>
          <img
            src={isAfter ? whiteLogo : logo}
            alt="Gladstone Gallery logo"
          ></img>
        </Link>
        <div className={styles.lowerFooterLinks}>
          <p>
            <FormattedMessage id="new_york"></FormattedMessage>
          </p>
          <p>
            <FormattedMessage id="brussels.heading"></FormattedMessage>
          </p>
          <p>
            <FormattedMessage id="seoul.heading"></FormattedMessage>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
