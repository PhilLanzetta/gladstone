import React, { createContext, useState } from "react"

const MyContext = createContext({
  isInquireOpen: false,
  updateInquireOpen: () => {},
  isSubscribeOpen: false,
  updateSubscribeOpen: () => {},
  context: "",
  updateContext: () => {},
  viewingRoom: false,
  updateViewingRoom: () => {},
})

export const MyContextProvider = ({ children }) => {
  const [isInquireOpen, setInquireOpen] = useState(false)
  const [isSubscribeOpen, setSubscribeOpen] = useState(false)
  const [context, setContext] = useState("")
  const [viewingRoom, setViewingRoom] = useState(false)

  const updateInquireOpen = newValue => {
    setInquireOpen(newValue)
  }

  const updateSubscribeOpen = newValue => {
    setSubscribeOpen(newValue)
  }

  const updateContext = newValue => {
    setContext(newValue)
  }

  const updateViewingRoom = newValue => {
    setViewingRoom(newValue)
  }

  return (
    <MyContext.Provider
      value={{
        isInquireOpen,
        updateInquireOpen,
        isSubscribeOpen,
        updateSubscribeOpen,
        context,
        updateContext,
        viewingRoom,
        updateViewingRoom,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export default MyContext
