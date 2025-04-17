import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default async function Dashboard() {
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <div className='text-2xl font-medium'>
          Your Blog Articles
        </div>
        <Link href={"/dashboard/create"} className={buttonVariants()}>
          Create Posts
        </Link>
      </div>
    </div>
  )
}
