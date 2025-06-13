import React, { useState, useEffect, useContext } from "react"
import * as styles from "../components/header.module.css"
import { motion } from "framer-motion"
import { FormattedMessage } from "gatsby-plugin-intl"
import MyContext from "../context/StateContext"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const InquirePop = () => {
  const [inquireState, setInquireState] = useState({})
  const { isInquireOpen, updateInquireOpen, context, viewingRoom } =
    useContext(MyContext)

  const handleChange = e => {
    setInquireState({ ...inquireState, [e.target.name]: e.target.value })
  }

  console.log(viewingRoom)
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
          updateInquireOpen(false)
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.subscribePopUp}
    >
      <div className={styles.innerContainer}>
        <button
          className={styles.close}
          onClick={() => updateInquireOpen(false)}
        >
          <span></span>
          <span></span>
        </button>
        <div id="inquire-heading">
          <h2 className={styles.popUpHeadline}>
            <FormattedMessage id="inquire"></FormattedMessage>
          </h2>
          <p>
            <FormattedMessage id="inquire_sub"></FormattedMessage>
          </p>
        </div>
        <div id="inquire-success">
          <h2 className={styles.popUpHeadline}>
            <FormattedMessage id="thank_you"></FormattedMessage>
          </h2>
          <p>
            <FormattedMessage id="in_touch"></FormattedMessage>
          </p>
        </div>
        <div id="inquire-error"></div>
        <div>
          <form
            name={viewingRoom === true ? "viewing-room-inquire" : "inquire"}
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
              <FormattedMessage id="inquire"></FormattedMessage>
            </button>
            <button
              className={styles.submitInquire}
              onClick={() => updateInquireOpen(false)}
              id="inquire-close"
            >
              <FormattedMessage id="close"></FormattedMessage>
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
export default InquirePop
