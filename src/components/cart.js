import React from "react"
import useStore from "../context/StoreContext"
import ProductRow from "./productRow"
import { motion } from "framer-motion"
import * as styles from './cart.module.css'

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
      <div className={styles.cartHeading}>Cart</div>
      <div className={styles.cartProductsContainer}>
        {cart.length > 0 ? (
          cart.map((item, index) => <ProductRow key={index} item={item} />)
        ) : (
          <p className={styles.emptyCart}>Your cart is empty.</p>
        )}
      </div>
      <div className={styles.cartSummary}>
        <button className={styles.closeCart} onClick={toggleCart}>
          Continue Shopping
        </button>
        <div className={styles.checkoutInfo}>
          <div className={styles.checkout}>
            <div>Subtotal</div>
            <div>
              $
              {checkout.totalPrice
                ? formattedNum(checkout.totalPrice?.amount)
                : 0}
            </div>
          </div>
          <p className={styles.priceDisclaimer}>Taxes and shipping calculated at checkout</p>
          <button
            disabled={cart.length === 0}
            onClick={() => window.open(checkout.webUrl)}
            className={styles.checkoutBtn}
          >
            Check Out
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default Cart
