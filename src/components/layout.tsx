import React from 'react'
import Navbar from './Navbar'
interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="dark:border-gray-600 dark:bg-slate-950">{children}</main>
    </>
  )
}

export default Layout
