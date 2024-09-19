import React, { useState } from "react"
import * as styles from "./mailForm.module.css"

const CustomForm = ({ status, message, onValidated }) => {
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
    email && email.indexOf("@") > -1 && onValidated({ EMAIL: email })
  }
  return (
    <div className={styles.mailForm}>
      <p className={styles.mailHeader}>
        Join our mailing list for updates about our artists, exhibitions,
        events, and more.
      </p>
      {status === "error" && (
        <div
          className={styles.error}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && <div className={styles.success}>Thank you.</div>}
      {status !== "success" ? (
        <form onSubmit={e => handleFormSubmit(e)}>
          <div className={styles.name}>
            <input
              type="text"
              value={first}
              autoCapitalize="off"
              onChange={handleFirstChange}
              placeholder="First"
              required
            />
            <input
              type="text"
              value={last}
              autoCapitalize="off"
              onChange={handleLastChange}
              placeholder="Last"
              required
            />
          </div>
          <input
            type="email"
            value={email}
            autoCapitalize="off"
            onChange={handleEmailChange}
            placeholder="Email"
            required
            className={styles.email}
          />
          <input type="submit" value="SUBMIT" className={styles.submit} />
        </form>
      ) : null}
    </div>
  )
}

export default CustomForm
