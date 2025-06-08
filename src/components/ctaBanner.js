import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import * as styles from "./ctaBanner.module.css"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import { injectIntl } from "gatsby-plugin-intl"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const CTABanner = ({ cta, intl, artist }) => {
  const [isSubscribeOpen, setSubscribeOpen] = useState(false)
  const [isInquireOpen, setInquireOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [group1, setGroup1] = useState(true)
  const [group2, setGroup2] = useState(true)
  const [group3, setGroup3] = useState(true)
  const [inquireState, setInquireState] = useState({ artist })

  const handleChange = e => {
    setInquireState({ ...inquireState, [e.target.name]: e.target.value })
  }

  const postUrl = process.env.GATSBY_MAILCHIMP_URL

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

  const {
    headlineText,
    textColor,
    buttonType,
    buttonText,
    subtitle,
    backgroundImage,
  } = cta

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

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
    <div className={styles.bannerContainer}>
      {backgroundImage && (
        <div className={styles.imageHolder}>
          <div className={styles.overlay}></div>
          <GatsbyImage
            alt={backgroundImage.description}
            image={backgroundImage.gatsbyImageData}
            className={styles.bannerImage}
          ></GatsbyImage>
        </div>
      )}
      <div style={{ color: textColor }} className={styles.textContainer}>
        <h2 className={styles.ctaHeadline}>{headlineText}</h2>
        <p className={styles.ctaSubtitle}>{subtitle}</p>
        {buttonType === "Subscribe" && (
          <button
            className={styles.ctaButton}
            onClick={() => setSubscribeOpen(true)}
          >
            {buttonText}
          </button>
        )}
        {buttonType === "Inquire" && (
          <button
            className={styles.ctaButton}
            onClick={() => setInquireOpen(true)}
          >
            {buttonText}
          </button>
        )}
      </div>
      <AnimatePresence>
        {isSubscribeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.subscribePopUp}
          >
            <div className={styles.innerContainer}>
              <button
                className={styles.close}
                onClick={() => {
                  setSubscribeOpen(false)
                  setGroup1(true)
                  setGroup2(true)
                  setGroup3(true)
                }}
              >
                <span></span>
                <span></span>
              </button>
              <MailchimpSubscribe
                url={postUrl}
                render={({ subscribe, status, message }) => {
                  if (status === "success") {
                    setTimeout(() => {
                      setSubscribeOpen(false)
                    }, 3000)
                  }
                  return (
                    <div>
                      {status === "success" && (
                        <div>
                          <h2 className={styles.popUpHeadline}>Thank you</h2>
                          <p>
                            Gallery news and updates will arrive soon in your
                            inbox.
                          </p>
                        </div>
                      )}
                      {status !== "success" && (
                        <div>
                          <h2 className={styles.popUpHeadline}>
                            Stay In Touch
                          </h2>
                          <p>
                            Sign up to be notified about upcoming exhibitions,
                            art works, events, and more.{" "}
                          </p>
                        </div>
                      )}
                      <div
                        className={
                          status === "success" ? styles.successHide : ""
                        }
                      >
                        <input
                          type="email"
                          value={email}
                          autoCapitalize="off"
                          onChange={handleEmailChange}
                          placeholder={intl.formatMessage({ id: "email" })}
                          required
                          className={styles.emailInput}
                        />
                        <label className={styles.check}>
                          <input
                            type="checkbox"
                            checked={group1}
                            onChange={() => setGroup1(!group1)} // Replace with your group ID
                          />
                          Artist Exhibitions, News, and Events
                        </label>
                        <label className={styles.check}>
                          <input
                            type="checkbox"
                            checked={group2}
                            onChange={() => setGroup2(!group2)} // Replace with your group ID
                          />
                          Available Works and Art Fairs
                        </label>
                        <label className={styles.check}>
                          <input
                            type="checkbox"
                            checked={group3}
                            onChange={() => setGroup3(!group3)} // Replace with your group ID
                          />
                          Publications and Editions
                        </label>
                      </div>
                      {status === "success" ? (
                        <button
                          onClick={() => setSubscribeOpen(false)}
                          className={styles.submit}
                        >
                          Close
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            subscribe({
                              EMAIL: email,
                              ...(group1 && { "group[70621][64]": "1" }),
                              ...(group2 && { "group[70621][512]": "1" }),
                              ...(group3 && { "group[70621][1024]": "1" }),
                            })
                          }
                          className={styles.submit}
                        >
                          Subscribe
                        </button>
                      )}
                      {status === "error" && (
                        <div
                          dangerouslySetInnerHTML={{ __html: message }}
                          className={styles.errorMessage}
                        />
                      )}
                    </div>
                  )
                }}
              />
            </div>
          </motion.div>
        )}
        {isInquireOpen && (
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
        )}
      </AnimatePresence>
      <form
        hidden
        name="inquire"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="inquire" />
        <p hidden>
          <label>
            Don’t fill this out if you’re human:{" "}
            <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
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
        <button type="submit" className={styles.submitInquire}>
          Inquire
        </button>
      </form>
    </div>
  )
}

export default injectIntl(CTABanner)
