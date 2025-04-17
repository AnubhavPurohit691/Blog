"use client"
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'
import { Button } from './ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const session = useSession()

  return (
    <div className='flex justify-between py-6 mx-10 '>
      <Link href={"/"} className='text-3xl '>Bloggers</Link>
      <div className='flex gap-10 text-xl'>
        {session.status === "unauthenticated" ? 
        <Button onClick={()=>signIn("google")} >SignIn</Button>:<Button onClick={()=>signOut()} >Logout</Button>}
        
        <Link href={"/dashboard"}>Dashboard</Link>
        <ModeToggle/>
      </div>
    </div>
  )
}
