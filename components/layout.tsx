import React from 'react'
interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div>NAV</div>
      <main>{children}</main>
    </>
  )
}

export default Layout
