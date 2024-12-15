import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import * as styles from "./footer.module.css"

const languageName = {
  zh: "中文",
  ko: "한국인",
  en: "English",
}

const Language = () => (
  <>
    <IntlContextConsumer>
      {({ languages, language: currentLocale }) =>
        languages.map(language => (
          <button
            key={language}
            onClick={() => changeLocale(language)}
            className={currentLocale === language ? styles.activeLanguage : ""}
          >
            {languageName[language]}
          </button>
        ))
      }
    </IntlContextConsumer>
  </>
)

export default Language
