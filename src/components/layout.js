import React from 'react'
import "./global.css"
import Header from './header'
import Footer from './footer'

const Layout = ({children}) => {
  return (
    <>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  )
}

export default Layout