import React from "react"
import useStore from "../context/StoreContext"
import ProductRow from "./productRow"
import { motion } from "framer-motion"
import * as styles from './cart.module.css'
import { FormattedMessage } from "gatsby-plugin-intl"

const Cart = ({ toggleCart }) => {
  const { cart, checkout } = useStore()
  const formattedNum = num =>
    Number(num)
      .toFixed(2)
      .replace(/[.,]00$/, "")

  return (
    <motion.section
      initial={{ translateY: "-100%" }}
      animate={{ translateY: 0 }}
      exit={{ translateY: "-100%" }}
      transition={{ duration: 0.4 }}
      className={styles.cartContainer}
    >
      <div className={styles.cartHeading}>
        <FormattedMessage id="cart"></FormattedMessage>
      </div>
      <div className={styles.cartProductsContainer}>
        {cart.length > 0 ? (
          cart.map((item, index) => <ProductRow key={index} item={item} />)
        ) : (
          <p className={styles.emptyCart}>
            <FormattedMessage id="cart_empty"></FormattedMessage>
          </p>
        )}
      </div>
      <div className={styles.cartSummary}>
        <button className={styles.closeCart} onClick={toggleCart}>
          <FormattedMessage id="cart_continue"></FormattedMessage>
        </button>
        <div className={styles.checkoutInfo}>
          <div className={styles.checkout}>
            <div>
              <FormattedMessage id="subtotal"></FormattedMessage>
            </div>
            <div>
              $
              {checkout.totalPrice
                ? formattedNum(checkout.totalPrice?.amount)
                : 0}
            </div>
          </div>
          <p className={styles.priceDisclaimer}>
            <FormattedMessage id="cart_disclaimer"></FormattedMessage>
          </p>
          <button
            disabled={cart.length === 0}
            onClick={() => window.open(checkout.webUrl)}
            className={styles.checkoutBtn}
          >
            <FormattedMessage id="check_out"></FormattedMessage>
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default Cart
