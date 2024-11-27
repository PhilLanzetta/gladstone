import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CombinedProvider from "./src/context/CombinedProvider"

export const wrapRootElement = CombinedProvider

const transitionDelay = 250

exports.shouldUpdateScroll = () => false

exports.onRouteUpdate = () =>
  window.setTimeout(() => window.scrollTo(0, 0), transitionDelay)
