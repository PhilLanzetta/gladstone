import React from "react"
import * as styles from "./footer.module.css"
import { Link } from "gatsby"
import MailForm from "./mailForm"

const Footer = () => {
  return (
    <footer>
      <div className={styles.upperFooter}>
        <div className={styles.linkContainer}>
          <div className={styles.linkColumn}>
            <Link>Artists</Link>
            <Link>Exhibitions</Link>
            <Link>Events</Link>
            <Link>Publications</Link>
          </div>
          <div className={styles.linkColumn}>
            <Link>About</Link>
            <Link>Staff</Link>
            <Link>Careers</Link>
            <Link>Privacy & Cookies</Link>
            <Link>Accessibility</Link>
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
    </footer>
  )
}

export default Footer
