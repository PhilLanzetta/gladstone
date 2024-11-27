import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CombinedProvider from "./src/context/CombinedProvider"

export const wrapRootElement = CombinedProvider

const transitionDelay = 500

export const shouldUpdateScroll = () => false

export const onRouteUpdate = ({ location }) => {
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1))
    const targetPosition =
      target.getBoundingClientRect().top - 250 + window.scrollY
    window.scrollTo({
      top: targetPosition,
    })
  } else {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, transitionDelay)
  }
}
