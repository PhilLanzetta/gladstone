import React from 'react'
import "./global.css"
import Header from './header'

const Layout = ({children}) => {
  return (
    <>
      <Header></Header>
      {children}
    </>
  )
}

export default Layout