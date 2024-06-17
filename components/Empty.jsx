import React from 'react'

import Image from 'next/image'
export default function Empty({label}) {
  return (
    <div className='h-full p-20 flex flex-col items-center'>
      <div className='relative h-72 w-72'>
            <Image
                src='/empty.png'
                fill
                alt='Empty'
            />
      </div>
      
        <p className='text-muted-foreground text-sm text-center'>
            {label || 'No messages yet'}
        </p>
      
    </div>
  )
}
