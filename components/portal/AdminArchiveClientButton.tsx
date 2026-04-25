'use client'

import { useActionState, useEffect, useState } from 'react'
import { archiveClientAction } from '@/lib/portal/actions'

const initialState = { error: null as string | null, success: false }

export default function AdminArchiveClientButton({
  clientId,
  clientName,
}: {
  clientId: string
  clientName: string
}) {
  const [confirming, setConfirming] = useState(false)
  const [state, formAction, isPending] = useActionState(archiveClientAction, initialState)

  useEffect(() => {
    if (state.success) setConfirming(false)
  }, [state.success])

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="portal-btn-ghost"
        style={{ padding: '0.3rem 0.75rem', width: 'auto', fontSize: '0.65rem', color: 'rgba(233,233,223,0.4)', borderColor: 'rgba(233,233,223,0.1)' }}
      >
        Remove
      </button>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
      <span style={{ fontSize: '0.7rem', color: 'rgba(233,233,223,0.5)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
        Remove {clientName}?
      </span>
      <form action={formAction} style={{ display: 'contents' }}>
        <input type="hidden" name="client_id" value={clientId} />
        <button
          type="submit"
          disabled={isPending}
          className="portal-btn-ghost"
          style={{ padding: '0.25rem 0.6rem', width: 'auto', fontSize: '0.6rem', color: '#E87070', borderColor: 'rgba(232,112,112,0.3)' }}
        >
          {isPending ? '…' : 'Yes'}
        </button>
      </form>
      <button
        onClick={() => setConfirming(false)}
        className="portal-btn-ghost"
        style={{ padding: '0.25rem 0.6rem', width: 'auto', fontSize: '0.6rem' }}
      >
        Cancel
      </button>
    </div>
  )
}