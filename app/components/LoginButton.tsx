'use client'

import { signIn, signOut, useSession } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <button onClick={() => signOut()} className="text-sm font-medium hover:underline underline-offset-4">
        Sign out
      </button>
    )
  }
  return (
    <button onClick={() => signIn()} className="text-sm font-medium hover:underline underline-offset-4">
      Sign in
    </button>
  )
}
