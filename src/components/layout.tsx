import React from 'react'
import Navbar from './Navbar'
interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="dark:bg-slate-700 min-h-screen">{children}</main>
    </>
  )
}

export default Layout
