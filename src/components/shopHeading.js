import React, { useState } from "react"
import * as styles from "./shop.module.css"
import Cart from "./cart"
import { AnimatePresence } from "framer-motion"
import useStore from "../context/StoreContext"
import { Link } from "gatsby"

const ShopHeading = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart } = useStore()
  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <Cart toggleCart={() => setIsCartOpen(!isCartOpen)}></Cart>
        )}
      </AnimatePresence>
      <div className={styles.exhibitionsHeader}>
        <Link className="pageHeading" to="/shop">
          Shop
        </Link>
        <div className={styles.headerLinkContainer}>
          <Link to="/shop/featured" activeClassName={styles.activeLink}>
            Featured
          </Link>
          <Link to="/shop/new-releases" activeClassName={styles.activeLink}>
            New Releases
          </Link>
          <Link to="/shop/publications" activeClassName={styles.activeLink}>
            Publications
          </Link>
          <Link to="/shop/ephemera" activeClassName={styles.activeLink}>
            Ephemera
          </Link>
          <Link to="/shop/clothing" activeClassName={styles.activeLink}>
            Clothing
          </Link>
          <Link to="/shop/artists" activeClassName={styles.activeLink}>
            Artists
          </Link>
          {cart.length > 0 && (
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className={styles.shopBagButton}
            >
              <span className={styles.cartText}>Cart</span>
              {cart.length > 0 ? (
                <span className={styles.cartNumber}>
                  {cart
                    .map(item => item.quantity)
                    .reduce((prev, next) => prev + next)}
                </span>
              ) : (
                ""
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.cartSVG}
                viewBox="0 0 19 27"
              >
                <g
                  id="Ellipse_2"
                  data-name="Ellipse 2"
                  transform="translate(2)"
                  fill="none"
                  stroke="#000"
                  stroke-width="1"
                >
                  <circle cx="7.5" cy="7.5" r="7.5" stroke="none" />
                  <circle cx="7.5" cy="7.5" r="7" fill="none" />
                </g>
                <g
                  id="Rectangle_97"
                  data-name="Rectangle 97"
                  transform="translate(0 7)"
                  fill="#fff"
                  stroke="#000"
                  stroke-width="1"
                >
                  <rect width="19" height="20" stroke="none" />
                  <rect x="0.5" y="0.5" width="18" height="19" fill="none" />
                </g>
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default ShopHeading
