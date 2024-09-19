import React from "react"
import MailchimpSubscribe from "react-mailchimp-subscribe"
import CustomForm from "./customForm"
import * as styles from './mailForm.module.css'


const MailForm = () => {
  const postUrl = `https://studio.us5.list-manage.com/subscribe/post?u=d6dace50de5da0a95ea32afd&id=8ac1c7428`

  return (
    <div className={styles.formContainer}>
      <MailchimpSubscribe
        url={postUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    </div>
  )
}

export default MailForm
