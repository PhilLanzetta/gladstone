import React, { useState } from "react"
import * as styles from "./mailForm.module.css"
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl"

const CustomForm = ({ status, message, onValidated, intl, isAfter }) => {
  const [email, setEmail] = useState("")
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  const handleFirstChange = e => {
    setFirst(e.target.value)
  }

  const handleLastChange = e => {
    setLast(e.target.value)
  }
  


  const handleFormSubmit = e => {
    e.preventDefault()
    email && email.indexOf("@") > -1 && onValidated({ EMAIL: email, FNAME: first, LNAME: last })
  }
  return (
    <div className={styles.mailForm}>
      <p className={styles.headerText}>
        <FormattedMessage id="form_head"></FormattedMessage>
      </p>
      {status === "error" && (
        <div
          className={styles.error}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div className={styles.success}>
          <FormattedMessage id="thank_you"></FormattedMessage>
        </div>
      )}
      {status !== "success" ? (
        <form onSubmit={e => handleFormSubmit(e)}>
          <div className={styles.inputContainer}>
            <div className={isAfter ? styles.afterName : styles.name}>
              <input
                type="text"
                value={first}
                autoCapitalize="off"
                onChange={handleFirstChange}
                placeholder={intl.formatMessage({ id: "first" })}
                required
              />
              <input
                type="text"
                value={last}
                autoCapitalize="off"
                onChange={handleLastChange}
                placeholder={intl.formatMessage({ id: "last" })}
                required
              />
            </div>
            <input
              type="email"
              value={email}
              autoCapitalize="off"
              onChange={handleEmailChange}
              placeholder={intl.formatMessage({ id: "email" })}
              required
              className={styles.email}
            />
          </div>
          <input
            type="submit"
            value={intl.formatMessage({ id: "subscribe" })}
            className={isAfter ? styles.afterSubmit : styles.submit}
          />
        </form>
      ) : null}
    </div>
  )
}

export default injectIntl(CustomForm)
