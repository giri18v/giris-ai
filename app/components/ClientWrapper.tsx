'use client'

import { useSession } from "next-auth/react"
import { ReactNode } from "react"
import { Session } from "next-auth"

interface ClientWrapperProps {
  children: ReactNode | ((session: Session | null) => ReactNode)
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { data: session } = useSession()

  return (
    <>
      {typeof children === 'function' 
        ? (children as (session: Session | null) => ReactNode)(session) 
        : children}
    </>
  )
}
