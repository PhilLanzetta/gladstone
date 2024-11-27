import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CombinedProvider from "./src/context/CombinedProvider"

export const wrapRootElement = CombinedProvider

export const shouldUpdateScroll = ({
  routerProps: { location },
  prevRouterProps,
  getSavedScrollPosition,
}) => {
  // transition duration from `layout.js` * 1000 to get time in ms
  // * 2 for exit + enter animation
  const TRANSITION_DELAY = 0.5 * 1000
  // if it's a "normal" route
  if (location.action === "PUSH") {
    if (location.hash) {
      console.log("option 1")
      const target = document.getElementById(location.hash.slice(1))
      const targetPosition =
        target.getBoundingClientRect().top - 250 + window.scrollY
      window.setTimeout(
        () =>
          window.scrollTo({
            top: targetPosition,
          }),
        TRANSITION_DELAY
      )
    } else console.log("option 2")
    window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
  }
  // if we used the browser's forwards or back button
  else {
    if (location.hash) {
      console.log("option 3")
      const target = document.getElementById(location.hash.slice(1))
      const targetPosition =
        target.getBoundingClientRect().top - 250 + window.scrollY
      window.scrollTo({
        top: targetPosition,
      })
    } else {
      console.log("option 4")
      window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
    }
  }
  return false
}
