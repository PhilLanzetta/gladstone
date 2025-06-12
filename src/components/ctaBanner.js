import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import * as styles from "./ctaBanner.module.css"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import { injectIntl } from "gatsby-plugin-intl"
import InquirePop from "./inquirePop"

const CTABanner = ({
  cta,
  intl,
  context,
  isSubscribeOpen,
  setSubscribeOpen,
}) => {
  const [isInquireOpen, setInquireOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [group1, setGroup1] = useState(true)
  const [group2, setGroup2] = useState(true)
  const [group3, setGroup3] = useState(true)
  const [inquireState, setInquireState] = useState({})

  const handleChange = e => {
    setInquireState({ ...inquireState, [e.target.name]: e.target.value })
  }

  const postUrl = process.env.GATSBY_MAILCHIMP_URL

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
                          <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.check}>
                          <input
                            type="checkbox"
                            checked={group2}
                            onChange={() => setGroup2(!group2)} // Replace with your group ID
                          />
                          Available Works and Art Fairs
                          <span className={styles.checkmark}></span>
                        </label>
                        <label className={styles.check}>
                          <input
                            type="checkbox"
                            checked={group3}
                            onChange={() => setGroup3(!group3)} // Replace with your group ID
                          />
                          Publications and Editions
                          <span className={styles.checkmark}></span>
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
                      <div className={styles.extraPadding}></div>
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
          <InquirePop
            isInquireOpen={isInquireOpen}
            setInquireOpen={setInquireOpen}
            context={context}
          ></InquirePop>
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
        <input type="hidden" name="context" />
        <button type="submit" className={styles.submitInquire}>
          Inquire
        </button>
      </form>
    </div>
  )
}

export default injectIntl(CTABanner)
