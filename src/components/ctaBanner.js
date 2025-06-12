import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState, useContext } from "react"
import * as styles from "./ctaBanner.module.css"
import { injectIntl } from "gatsby-plugin-intl"
import MyContext from "../context/StateContext"

const CTABanner = ({ cta }) => {
  const { updateSubscribeOpen, updateInquireOpen } = useContext(MyContext)

  const [inquireState, setInquireState] = useState({})

  const handleChange = e => {
    setInquireState({ ...inquireState, [e.target.name]: e.target.value })
  }

  const {
    headlineText,
    textColor,
    buttonType,
    buttonText,
    subtitle,
    backgroundImage,
  } = cta

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
        <h2
          className={styles.ctaHeadline}
          dangerouslySetInnerHTML={{ __html: headlineText }}
        ></h2>
        <p
          className={styles.ctaSubtitle}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        ></p>
        {buttonType === "Subscribe" && (
          <button
            className={styles.ctaButton}
            onClick={() => updateSubscribeOpen(true)}
          >
            {buttonText}
          </button>
        )}
        {buttonType === "Inquire" && (
          <button
            className={styles.ctaButton}
            onClick={() => updateInquireOpen(true)}
          >
            {buttonText}
          </button>
        )}
      </div>
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
      <form
        hidden
        name="viewing-room-inquire"
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
