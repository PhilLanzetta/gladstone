import { GatsbyImage } from "gatsby-plugin-image"
import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { AnimatePresence, motion } from "framer-motion"
import * as styles from "./ctaBanner.module.css"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import { injectIntl } from "gatsby-plugin-intl"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const CTABanner = ({ cta, intl }) => {
  const [isSubscribeOpen, setSubscribeOpen] = useState(false)
  const [isInquireOpen, setInquireOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [groups, setGroups] = useState([])
  const [inquireState, setInquireState] = useState({})

  const handleChange = e => {
    setInquireState({ ...inquireState, [e.target.name]: e.target.value })
  }

  const postUrl = process.env.GATSBY_MAILCHIMP_URL

  useEffect(() => {
    let textarea = document.getElementById("message")
    let charCount = document.getElementById("charCount")
    const maxNumOfChars = 300

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

  const handleCheckboxChange = groupId => {
    if (groups.includes(groupId)) {
      setGroups(groups.filter(id => id !== groupId))
    } else {
      setGroups([...groups, groupId])
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...inquireState,
      }),
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error))
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
                onClick={() => setSubscribeOpen(false)}
              >
                <span></span>
                <span></span>
              </button>
              <h2 className={styles.popUpHeadline}>Stay In Touch</h2>
              <p>
                Sign up to be notified about upcoming exhibitions, art works,
                events, and more.{" "}
              </p>
              <MailchimpSubscribe
                url={postUrl}
                render={({ subscribe, status, message }) => (
                  <div>
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
                        onChange={() => handleCheckboxChange("GROUP_ID_1")} // Replace with your group ID
                      />
                      Artist Exhibitions, News, and Events
                    </label>
                    <label className={styles.check}>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange("GROUP_ID_2")} // Replace with your group ID
                      />
                      Available Works and Art Fairs
                    </label>
                    <label className={styles.check}>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange("GROUP_ID_3")} // Replace with your group ID
                      />
                      Publications and Editions
                    </label>
                    <button
                      onClick={() =>
                        subscribe({
                          EMAIL: email,
                          groupings: [
                            {
                              id: "YOUR_GROUP_CATEGORY_ID", // Replace with your group category ID
                              groups: groups,
                            },
                          ],
                        })
                      }
                      className={styles.submit}
                    >
                      Subscribe
                    </button>
                    {status === "sending" && <div>sending...</div>}
                    {status === "error" && (
                      <div dangerouslySetInnerHTML={{ __html: message }} />
                    )}
                    {status === "success" && <div>Subscribed!</div>}
                  </div>
                )}
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
              <h2 className={styles.popUpHeadline}>Inquire</h2>
              <p>
                To learn more about the artist, please provide your contact
                information, and we will reach out.
              </p>
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default injectIntl(CTABanner)
