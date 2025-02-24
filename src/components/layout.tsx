import React from 'react'
import Head from 'next/head'
import BetterNav from './Navbar/BetterNav'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>% | DVD Renral</title>
      </Head>
      <BetterNav />
      <main className="bg-slate-950">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
