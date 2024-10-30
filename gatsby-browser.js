import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import React from "react"
import { AnimatePresence } from "framer-motion"
export const wrapPageElement = ({ element }) => (
  <AnimatePresence mode="wait">{element}</AnimatePresence>
)

export const shouldUpdateScroll = ({
  routerProps: { location },
  prevRouterProps,
  getSavedScrollPosition,
}) => {
  // transition duration from `layout.js` * 1000 to get time in ms
  // * 2 for exit + enter animation
  const TRANSITION_DELAY = 0.5 * 1000
  // if it's a "normal" route
  if (
    prevRouterProps &&
    prevRouterProps.location.pathname === location.pathname
  ) {
    console.log('block1')
    return true
  }
  if (location.action === "PUSH") {
    console.log('block2')
    window.setTimeout(
      () => window.scrollTo(location.hash || 0, 0),
      TRANSITION_DELAY
    )
  }
  // if we used the browser's forwards or back button
  else {
    if (location.hash) {
      console.log('block3')
      const target = document.getElementById(location.hash.slice(1))
      const targetPosition =
        target.getBoundingClientRect().top - 250 + window.scrollY
      window.scrollTo({
        top: targetPosition,
      })
    } else {
      console.log('block4')
      const savedPosition = getSavedScrollPosition(location) || [0, 0]
      window.setTimeout(
        () => window.scrollTo(...savedPosition),
        TRANSITION_DELAY
      )
    }
  }
  return false
}
