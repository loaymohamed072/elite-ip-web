'use client'

import { useState, useActionState, useEffect } from 'react'
import { createClientAction } from '@/lib/portal/actions'

const initialState = { error: null as string | null, success: false }

export default function AdminCreateClientForm() {
  const [open, setOpen] = useState(false)
  const [modalKey, setModalKey] = useState(0)

  function openModal() {
    setModalKey((k) => k + 1)
    setOpen(true)
  }

  return (
    <>
      <button
        onClick={openModal}
        className="portal-btn-primary"
        style={{ width: 'auto', padding: '0.6rem 1.25rem' }}
      >
        + New Client
      </button>

      {open && (
        <CreateClientModal key={modalKey} onClose={() => setOpen(false)} />
      )}
    </>
  )
}

function CreateClientModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(createClientAction, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="portal-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="portal-modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 className="portal-section-title" style={{ marginBottom: '0', fontSize: '1.2rem' }}>
            Create Client
          </h3>
          <button onClick={onClose} className="portal-btn-ghost" style={{ padding: '0.3rem 0.75rem', width: 'auto' }}>
            ✕
          </button>
        </div>

        <form action={formAction} className="portal-form">
          {state.error && <div className="portal-error">{state.error}</div>}

          <div className="portal-form-grid">
            <div className="portal-field">
              <label className="portal-label">Full Name *</label>
              <input name="full_name" required className="portal-input" placeholder="Jane Smith" />
            </div>
            <div className="portal-field">
              <label className="portal-label">Email *</label>
              <input name="email" type="email" required className="portal-input" placeholder="jane@company.com" />
            </div>
            <div className="portal-field">
              <label className="portal-label">Phone</label>
              <input name="phone" className="portal-input" placeholder="+971 50 000 0000" />
            </div>
            <div className="portal-field">
              <label className="portal-label">Company</label>
              <input name="company_name" className="portal-input" placeholder="Company name" />
            </div>
          </div>

          <div className="portal-field">
            <label className="portal-label">Profile ID (optional)</label>
            <input
              name="profile_id"
              className="portal-input"
              placeholder="UUID from Supabase auth.users — links portal login to this client"
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="submit" className="portal-btn-primary" disabled={isPending} style={{ flex: 1 }}>
              {isPending ? 'Creating…' : 'Create Client'}
            </button>
            <button type="button" onClick={onClose} className="portal-btn-ghost" style={{ flex: 1 }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}