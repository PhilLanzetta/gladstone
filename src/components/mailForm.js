import React from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import CustomForm from "./customForm"
import * as styles from './mailForm.module.css'


const MailForm = ({isAfter}) => {
  const postUrl = process.env.GATSBY_MAILCHIMP_URL

  return (
    <div className={styles.formContainer}>
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
            isAfter={isAfter}
          />
        )}
      />
    </div>
  )
}

export default MailForm
