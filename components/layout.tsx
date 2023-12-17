import React from 'react'
import Navbar from './Navbar'
interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="dark:bg-slate-200">{children}</main>
    </>
  )
}

export default Layout
