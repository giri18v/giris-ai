'use client'

import { useSession } from "next-auth/react"
import React from 'react'

export default function ClientWrapper({ children }) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return React.cloneElement(children, { session, status })
}
