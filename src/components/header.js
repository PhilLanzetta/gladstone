import React, { useState } from "react"
import * as styles from "./header.module.css"
import { Link } from "gatsby"
import useWindowSize from "../utils/useWindowSize"

const Header = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isHome = location?.pathname === "/"
  const { width } = useWindowSize()
  const isMobile = width < 700

  return (
    <header
      className={
        isHome
          ? isOpen
            ? styles.pagePrimaryOpen
            : styles.primaryClosed
          : styles.pagePrimaryOpen
      }
    >
      <div className={styles.primaryMenu}>
        <div>
          <button
            className={styles.menuButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div id={styles.navIcon} className={`${isOpen ? styles.open : ""}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            Menu
          </button>
        </div>
        <div className={styles.logo}>
          <Link to="/">
            <svg
              id="STANDARD"
              xmlns="http://www.w3.org/2000/svg"
              width="937.182"
              height="74.731"
              viewBox="0 0 937.182 74.731"
            >
              <g id="Group_1" data-name="Group 1">
                <path
                  id="Path_3"
                  data-name="Path 3"
                  d="M879.058,73.691h58.124V44.629h-2v1.556c0,8.613-2.493,13.777-6.954,18.238s-10.8,7.057-20.552,7.057h-5.267V37.009h1.762c7.263,0,11.312.6,14.217,3.505s3.946,6.27,3.946,12.39v.515h2V18.4h-2v.515c0,6.12-1.143,9.484-3.946,12.39-2.905,3.008-6.954,3.505-14.217,3.505h-1.762V3.243h4.752c9.756,0,16.091,2.6,20.552,7.057s6.954,9.625,6.954,18.238v.515h2V1.04H879.058v2h.515c3.843,0,6.645,1.143,8.716,3.215s3.214,4.873,3.214,10.272V58.2c0,5.4-1.143,8.2-3.214,10.272s-4.883,3.215-8.716,3.215h-.515v2Zm-114.374,0h26.991v-2a13.976,13.976,0,0,1-9.447-4.049c-2.6-2.6-2.877-6.542-2.877-12.558V15.117l43.363,59.614h.618V19.643c0-6.017,1.453-9.962,4.049-12.558,2.7-2.7,6.438-4.049,8.406-4.049v-2H808.8v2c3.008,0,5.576,1.35,8.275,4.049,2.6,2.6,4.049,6.542,4.049,12.558v33.1L783.362,1.04H763.644v2c5.707,0,9.138,2.98,13.5,9.212V55.088c0,6.017-1.453,9.962-4.049,12.558-2.7,2.7-6.438,4.049-8.406,4.049Zm-318.961,1.04h2c0-3.318,1.762-5.4,4.564-5.4,4.78,0,10.168,5.4,22.108,5.4,12.764,0,22.314-8.819,22.314-21.274,0-30.1-42.033-16.091-42.033-38.921,0-8.819,6.954-12.427,15.051-12.427,13.6,0,21.8,11.705,23.045,26.438h2V0h-2c0,3.318-1.556,4.883-3.842,4.883C484.664,4.883,480,0,469.725,0c-13.289,0-22.839,8.819-22.839,20.243,0,30.1,42.033,16.091,42.033,38.921,0,9.859-6.954,13.467-14.526,13.467-17.225,0-25.22-13.88-26.672-27.478h-2Zm-95.977-3.243V3.243h.515c9.55,0,17.122.778,22.624,6.279,6.542,6.438,9.55,17.15,9.55,28.359,0,9.859-2.493,19.746-8.1,25.969s-13.7,7.629-24.076,7.629h-.515Zm-23.355,2.2h28.022c17.544,0,26.991-5.192,33.111-13.5a39.15,39.15,0,0,0,7.366-23.355,36.924,36.924,0,0,0-7.263-22.417c-6.12-8.1-15.567-13.392-33.214-13.392H326.392v2h.515c3.842,0,6.645,1.143,8.716,3.215s3.215,4.873,3.215,10.272V58.19c0,5.4-1.143,8.2-3.215,10.272s-4.883,3.215-8.716,3.215h-.515v2ZM233.049,50.336l11.124-32.445,13,32.445ZM212.122,73.691H238.9v-2c-7.263,0-9.175-2.362-9.175-7.76a26.089,26.089,0,0,1,1.35-7.891l1.022-3.271H258.1l1.753,4.311a22.125,22.125,0,0,1,1.865,7.788c0,6.542-5.811,6.823-9.756,6.823v2h33.317v-2c-7.057,0-9.447-3.814-11.724-9.522L248.756,0h-.619l-19.2,54.909c-4.461,12.868-10.272,16.785-16.813,16.785v2ZM33.214,42.473c5.4,0,8.716,1.143,10.8,3.215s3.215,4.883,3.215,10.272v3.4c0,4.78-.834,5.679-1.968,7.657-1.865,3.215-6.12,5.089-10.487,5.089-19.2,0-22.52-25.407-22.52-40.974C12.249,17.947,16.195,2.1,32.7,2.1c15.051,0,21.7,11.6,23.045,26.438h2V0h-2c-.206,2.7-1.35,4.152-4.049,4.152C47.225,4.152,42.97,0,32.7,0,11.106,0,0,17.647,0,37.881s11.724,36.85,31.133,36.85c12.868,0,15.36-6.748,20.243-6.748,3.215,0,4.883,2.7,4.883,6.748h2V54.516c0-4.77.937-7.366,2.493-9.138A8.829,8.829,0,0,1,67.6,42.473h1.04v-2H33.223v2Z"
                />
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M593.534,73.76h37.881v-2H630.9c-4.883,0-7.685-1.143-9.756-3.215s-3.214-4.873-3.214-10.272V3.312h.309a19.409,19.409,0,0,1,14.189,6.335c4.986,5.192,7.366,12.839,7.366,19.484v.515h2V1.11H583.15V29.657h2v-.515c0-6.645,2.39-14.292,7.366-19.484A19.436,19.436,0,0,1,606.7,3.322h.309V58.278c0,5.4-1.143,8.2-3.215,10.272s-4.873,3.215-9.756,3.215h-.516v2Z"
                  transform="translate(-36.632 -0.07)"
                />
                <path
                  id="Path_5"
                  data-name="Path 5"
                  d="M730.469,0C711.163,0,697.78,16.71,697.78,37.881s13.392,36.85,32.7,36.85,32.7-16.71,32.7-37.881S749.775,0,730.469,0Zm1.762,72.632c-14.217,0-22.005-19.072-22.005-41.489,0-12.352,3.636-29.034,18.369-29.034S750.7,21.18,750.7,43.6C750.7,55.95,747.066,72.632,732.231,72.632Z"
                  transform="translate(-43.833)"
                />
                <path
                  id="Path_6"
                  data-name="Path 6"
                  d="M117.809,73.76h58.124V37.435h-2V39.9c0,11.312-2.905,18.678-8.1,23.767-5.089,4.986-12.249,7.891-22.521,7.891h-2.156V16.6c0-5.4,1.143-8.2,3.215-10.272s4.883-3.215,9.756-3.215h.515V1.11H117.8v2h.515c3.842,0,6.645,1.143,8.716,3.215s3.215,4.873,3.215,10.272V58.269c0,5.4-1.143,8.2-3.215,10.272s-4.883,3.215-8.716,3.215H117.8v2Z"
                  transform="translate(-7.4 -0.07)"
                />
              </g>
            </svg>
          </Link>
        </div>
        <div>
          {isOpen && (
            <div className={styles.searchIcon}>
              <Link to="/search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15.28"
                  height="17.233"
                  viewBox="0 0 15.28 17.233"
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
                      stroke="#000"
                      stroke-width="1.5"
                    />
                    <g
                      id="Ellipse_8"
                      data-name="Ellipse 8"
                      transform="translate(34.639 30.777)"
                      fill="none"
                      stroke="#000"
                      stroke-width="1.5"
                    >
                      <circle cx="6.088" cy="6.088" r="6.088" stroke="none" />
                      <circle cx="6.088" cy="6.088" r="5.338" fill="none" />
                    </g>
                  </g>
                </svg>
              </Link>
            </div>
          )}
          <div className={styles.language}>
            <button>中文</button>
            <button>한국인</button>
            <button className={styles.activeLanguage}>EN</button>
          </div>
        </div>
      </div>
      <div
        className={`${
          isMobile ? styles.secondaryMenu : styles.desktopSecondaryMenu
        } ${isOpen ? styles.secondaryOpen : styles.secondaryClosed}`}
      >
        <Link to="/artists" className={styles.headerLink}>
          Artists
        </Link>
        <Link to="/exhibitions" className={styles.headerLink}>
          Exhibitions
        </Link>
        <Link to="/fairs" className={styles.headerLink}>
          Fairs
        </Link>
        <Link to="/news" className={styles.headerLink}>
          News & Events
        </Link>
        <Link to="/about" className={styles.headerLink}>
          About
        </Link>
        <Link to="/shop" className={styles.headerLink}>
          Shop
        </Link>
        {!isMobile && (
          <Link to="/search" className={styles.headerSearch}>
            Search
          </Link>
        )}
        {isMobile && (
          <div className={styles.secondaryBottom}>
            <div className={styles.headerLocations}>
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
            <div className={styles.headerSearchContainer}>
              <Link to="/search" className={styles.headerSearch}>
                Search
              </Link>
            </div>
            <div className={styles.mobileLanguage}>
              <button>中文</button>
              <button>한국인</button>
              <button className={styles.activeLanguage}>EN</button>
            </div>
            <div className={styles.headerSocial}>
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
        )}
      </div>
    </header>
  )
}

export default Header
