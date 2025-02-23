import React from 'react'
import Navbar from './Navbar'
import Head from 'next/head'
import { signIn, useSession, signUp } from '@/lib/auth-client'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session, isPending, error } = useSession()

  return (
    <>
      <Head>
        <title>% | DVD Renral</title>
      </Head>
      <Navbar isSignedIn={!!session?.user} userRole={session?.user.role} />
      <main className="dark:border-gray-600 dark:bg-slate-950">{children}</main>
    </>
  )
}

export default Layout
