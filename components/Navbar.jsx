import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import { getAppLimitCount } from '@/lib/api-limit'

export default Navbar = async() =>{
  const apilimitCount = await getAppLimitCount();
  console.log("apilimitCount inside the navbar",apilimitCount);
  return (
    <div className='flex items-center p-4'>
      <MobileSidebar apilimitCount={apilimitCount}/>
      <div className='flex w-full justify-end' >
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  )
}
