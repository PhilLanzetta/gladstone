import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CombinedProvider from "./src/context/CombinedProvider"

export const wrapRootElement = CombinedProvider

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  // transition duration from `layout.js` * 1000 to get time in ms
  // * 2 for exit + enter animation
  const TRANSITION_DELAY = 0.3 * 1000 * 2
  // if it's a "normal" route
  if (location.action === "PUSH") {
    window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
  }
  // if we used the browser's forwards or back button
  else {
    window.setTimeout(() => window.scrollTo(0, 0), TRANSITION_DELAY)
  }
  return false
}
