import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'


function LandingPage() {
 
  return (
    <div>
      landing page(unprotected)
      <Link href="/sign-in">
        <Button >
            login
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button>
            Register
        </Button>
      </Link>
    </div>
  )
}

export default LandingPage