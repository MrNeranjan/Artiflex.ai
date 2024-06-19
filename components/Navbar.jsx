

import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'


export const Navbar = ({applimitcount}) =>{

  return (
    <div className='flex items-center p-4'>
      <MobileSidebar applimitcount={applimitcount}/>
      <div className='flex w-full justify-end' >
        <UserButton afterSignOutUrl='/'/>
      </div>
    </div>
  )
}


