'use client'

import { useSession } from "next-auth/react"
import { ReactNode } from "react"

interface ClientWrapperProps {
  children: ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { data: session } = useSession()

  return (
    <>
      {typeof children === 'function' ? children(session) : children}
    </>
  )
}
