import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import * as styles from "./ctaBanner.module.css"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

const CTABanner = ({ cta, intl }) => {
  const [isSubscribeOpen, setSubscribeOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [groups, setGroups] = useState([])
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

  const handleCheckboxChange = groupId => {
    if (groups.includes(groupId)) {
      setGroups(groups.filter(id => id !== groupId))
    } else {
      setGroups([...groups, groupId])
    }
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
      </AnimatePresence>
    </div>
  )
}

export default injectIntl(CTABanner)
