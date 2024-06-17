'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Montserrat } from 'next/font/google'

import { cn } from '@/lib/utils'
import { ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon,Code } from 'lucide-react'
import { usePathname } from 'next/navigation'

const montserrat = Montserrat({
  weight:"600",
  subsets:["latin"]
});

const routes =[
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    color: 'text-sky-500'
  },
  {
    label: 'Conversation',
    href: '/conversation',
    icon: MessageSquare,
    color: 'text-violet-500'
  },
  {
    label: 'Image Generation',
    href: '/image',
    icon: ImageIcon,
    color: 'text-pink-700'
  },
  {
    label: 'Video Generation',
    href: '/video',
    icon: VideoIcon,
    color: 'text-Orange-700'
  },

  {
    label: 'Music Generation',
    href: '/music',
    icon: Music,
    color: 'text-emerald-700'
  },
  {
    label: 'Code Generation',
    href: '/code',
    icon: Code,
    color: 'text-green-700'
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    
  },
 
]

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className='space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white'>
      <div className='px-3 py-2 flex-1'>
        <Link href="/dashboard" className='flex items-center pl-3 mb-14'>
          <div className='relative w-10 h-10 mr-4'>
              <Image
                fill
                alt='logo'
                src='/logo.png'
              />
          </div>
          <h1 className={cn('text-2xl font-bold',montserrat.className)}>
            ArtiflexAI
          </h1>
        
        </Link>
        <div className='space-y-1'>
          {routes.map((route, index) => (
            <Link href={route.href} key={route.href} className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
              pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400'
            )}>
                <div className='flex items-center flex-1'>
                  <route.icon className={cn('w-6 h-6 mr-3',route.color)} />
                    {route.label}
                </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
