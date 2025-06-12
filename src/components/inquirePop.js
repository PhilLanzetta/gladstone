import React, { useState, useEffect } from "react"
import * as styles from "../components/ctaBanner.module.css"
import { AnimatePresence, motion } from "framer-motion"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const InquirePop = ({ isInquireOpen, setInquireOpen, context }) => {
  const [inquireState, setInquireState] = useState({})

  const handleChange = e => {
    setInquireState({ ...inquireState, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    let textarea = document.getElementById("message")
    let charCount = document.getElementById("charCount")
    const maxNumOfChars = 300
    const inquireSuccess = document.getElementById("inquire-success")
    const inquireError = document.getElementById("inquire-error")
    const inquireClose = document.getElementById("inquire-close")

    inquireSuccess && (inquireSuccess.style.display = "none")
    inquireError && (inquireError.style.display = "none")
    inquireClose && (inquireClose.style.display = "none")

    textarea?.addEventListener("keyup", function () {
      let textEntered = textarea.value
      let counter = maxNumOfChars - textEntered.length
      charCount.textContent = counter + " characters remaining"
    })
  }, [isInquireOpen])

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    const inquireSuccess = document.getElementById("inquire-success")
    const inquireHeading = document.getElementById("inquire-heading")
    const inquireError = document.getElementById("inquire-error")
    const inquireSubmit = document.getElementById("inquire-submit")
    const inquireClose = document.getElementById("inquire-close")
    const innerForm = document.getElementById("inner-form")

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        context: context,
        ...inquireState,
      }),
    })
      .then(() => {
        inquireSuccess.style.display = "block"
        inquireHeading.style.display = "none"
        innerForm.style.visibility = "hidden"
        inquireClose.style.display = "flex"
        inquireSubmit.style.display = "none"
        setTimeout(() => {
          setInquireOpen(false)
        }, 3000)
        form.reset()
      })
      .catch(error => {
        inquireHeading.style.display = "none"
        inquireError.style.display = "block"
        inquireError.innerHTML = error
      })
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.subscribePopUp}
      >
        <div className={styles.innerContainer}>
          <button
            className={styles.close}
            onClick={() => setInquireOpen(false)}
          >
            <span></span>
            <span></span>
          </button>
          <div id="inquire-heading">
            <h2 className={styles.popUpHeadline}>Inquire</h2>
            <p>
              To learn more about the artist, please provide your contact
              information, and we will reach out.
            </p>
          </div>
          <div id="inquire-success">
            <h2 className={styles.popUpHeadline}>Thank you</h2>
            <p>We'll be in touch soon.</p>
          </div>
          <div id="inquire-error"></div>
          <div>
            <form
              name="inquire"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className={styles.inquireForm}
            >
              <input type="hidden" name="form-name" value="inquire" />
              <p hidden>
                <label>
                  Don’t fill this out if you’re human:{" "}
                  <input name="bot-field" onChange={handleChange} />
                </label>
              </p>
              <div id="inner-form" className={styles.innerForm}>
                <input
                  type="text"
                  name="first-name"
                  onChange={handleChange}
                  className={styles.inquireInput}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="last-name"
                  onChange={handleChange}
                  className={styles.inquireInput}
                  placeholder="Last Name"
                />
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className={styles.inquireInput}
                  placeholder="Email Address"
                />
                <input
                  type="tel"
                  name="telephone"
                  onChange={handleChange}
                  className={styles.inquireInput}
                  placeholder="Phone Number"
                />
                <textarea
                  name="message"
                  id="message"
                  rows="8"
                  maxLength="300"
                  placeholder="Additional Notes"
                  onChange={handleChange}
                  className={styles.inquireArea}
                ></textarea>
                <div id="charCount" className={styles.characterCount}>
                  300 characters remaining
                </div>
              </div>
              <input type="hidden" name="context" value={context} />
              <button
                type="submit"
                className={styles.submitInquire}
                id="inquire-submit"
              >
                Inquire
              </button>
              <button
                className={styles.submitInquire}
                onClick={() => setInquireOpen(false)}
                id="inquire-close"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
export default InquirePop
