import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import * as styles from "./header.module.css"

const languageName = {
  zh: "中文",
  ko: "한국인",
  en: "En",
}

const Language = () => (
  <div>
    <IntlContextConsumer>
      {({ languages, language: currentLocale }) =>
        languages.map(language => (
          <a
            key={language}
            onClick={() => changeLocale(language)}
            className={currentLocale === language ? styles.activeLanguage : ""}
          >
            {languageName[language]}
          </a>
        ))
      }
    </IntlContextConsumer>
  </div>
)

export default Language
