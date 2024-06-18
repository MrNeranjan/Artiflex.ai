
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

export default function UserAvatar() {
    const {user} =useUser();

  return (
    <Avatar className='w-8 h-8'>
        <AvatarImage src={user?.profileImageUrl}/>
        <AvatarFallback className="uppercase">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
        </AvatarFallback>
    </Avatar>
  )
}
