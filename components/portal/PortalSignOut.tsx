'use client'

import { useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function PortalSignOut({ redirectTo = '/' }: { redirectTo?: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleSignOut() {
    startTransition(async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push(redirectTo)
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="portal-btn-ghost"
      style={{ padding: '0.4rem 0.875rem', width: 'auto' }}
    >
      {isPending ? '…' : 'Sign out'}
    </button>
  )
}