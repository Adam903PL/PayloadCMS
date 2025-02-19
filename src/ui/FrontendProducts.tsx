'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const FrontendProducts = () => {
  const { data: session } = useSession()

  return (
    <div>
      {session?.user?.email && (
        <div>
          <h1>Loged User Preview</h1>
        </div>
      )}
    </div>
  )
}

export default FrontendProducts
