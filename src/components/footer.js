import React, { useState } from "react"
import * as styles from "./footer.module.css"
import MailForm from "./mailForm"
import logo from "../images/Gladstone_Small.svg"
import whiteLogo from "../images/Gladstone_Small_White.svg"
import { Link, FormattedMessage } from "gatsby-plugin-intl"
import Language from "./language"
import weChat from "../images/wechat_qr.png"
import { AnimatePresence, motion } from "framer-motion"

const Footer = ({ isAfter }) => {
  const [wechatOpen, setwechatOpen] = useState(false)
  return (
    <footer className={isAfter ? styles.afterFooter : styles.footer}>
      <div className={styles.upperFooter}>
        <div className={styles.linkContainer}>
          <div className={isAfter ? styles.afterLinkColumn : styles.linkColumn}>
            <div className={styles.languages}>
              <Language></Language>
            </div>
          </div>
          <div className={isAfter ? styles.afterLinkColumn : styles.linkColumn}>
            <Link to="/artists">
              <FormattedMessage id="artists"></FormattedMessage>
            </Link>
            <Link to="/exhibitions">
              <FormattedMessage id="exhibitions"></FormattedMessage>
            </Link>
            <Link to="/news">
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
            <button
              onClick={() => setwechatOpen(true)}
              className={styles.chatButton}
            >
              WeChat
            </button>
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
            <FormattedMessage id="brussels"></FormattedMessage>
          </p>
          <p>
            <FormattedMessage id="seoul"></FormattedMessage>
          </p>
        </div>
      </div>
      <AnimatePresence>
        {wechatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.wechatOuter}
          >
            <div className={styles.wechatContainer}>
              <button
                className={styles.wechatClose}
                onClick={() => setwechatOpen(false)}
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1 31L31 1" stroke="black" />
                  <path d="M1 1L31 31" stroke="black" />
                </svg>
              </button>
              <div className={styles.wechatInfo}>
                <img src={weChat} alt="wechat qr code"></img>
                <p>WeChat ID: gladstonegallery</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  )
}

export default Footer
