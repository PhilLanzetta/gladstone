import React from "react"

export default function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: undefined,
    height: undefined,
  })

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }

  React.useEffect(() => {
    changeWindowSize()
    window.addEventListener("resize", changeWindowSize)
    return () => window.removeEventListener("resize", changeWindowSize)
  }, [])

  return windowSize
}
