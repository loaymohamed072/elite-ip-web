'use client'

import { useState, useActionState, useEffect } from 'react'
import { createMatterAction } from '@/lib/portal/actions'
import { MATTER_STAGES, MATTER_TYPES, type Client } from '@/lib/supabase/types'

const initialState = { error: null as string | null, success: false }

export default function AdminCreateMatterForm({ clients }: { clients: Client[] }) {
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
        disabled={clients.length === 0}
        title={clients.length === 0 ? 'Create a client first' : undefined}
      >
        + New Matter
      </button>

      {open && (
        <CreateMatterModal key={modalKey} clients={clients} onClose={() => setOpen(false)} />
      )}
    </>
  )
}

function CreateMatterModal({ clients, onClose }: { clients: Client[]; onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(createMatterAction, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="portal-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="portal-modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 className="portal-section-title" style={{ marginBottom: '0', fontSize: '1.2rem' }}>
            Create Matter
          </h3>
          <button onClick={onClose} className="portal-btn-ghost" style={{ padding: '0.3rem 0.75rem', width: 'auto' }}>
            ✕
          </button>
        </div>

        <form action={formAction} className="portal-form">
          {state.error && <div className="portal-error">{state.error}</div>}

          <div className="portal-field">
            <label className="portal-label">Client *</label>
            <select name="client_id" required className="portal-select">
              <option value="">Select a client…</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name} — {c.email}
                </option>
              ))}
            </select>
          </div>

          <div className="portal-form-grid">
            <div className="portal-field" style={{ gridColumn: '1 / -1' }}>
              <label className="portal-label">Matter Title *</label>
              <input name="title" required className="portal-input" placeholder="e.g. ACME Trademark — GCC" />
            </div>
            <div className="portal-field">
              <label className="portal-label">Matter Type *</label>
              <select name="matter_type" required className="portal-select">
                {MATTER_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="portal-field">
              <label className="portal-label">Initial Stage</label>
              <select name="current_stage" className="portal-select">
                {MATTER_STAGES.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label} ({s.progress}%)
                  </option>
                ))}
              </select>
            </div>
            <div className="portal-field">
              <label className="portal-label">Status</label>
              <select name="status" className="portal-select">
                <option value="Active">Active</option>
                <option value="On Hold">On Hold</option>
                <option value="Pending Client">Pending Client</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="portal-field">
            <label className="portal-label">Next Step (visible to client)</label>
            <input name="next_step" className="portal-input" placeholder="e.g. Please send certified copies of logo artwork" />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="submit" className="portal-btn-primary" disabled={isPending} style={{ flex: 1 }}>
              {isPending ? 'Creating…' : 'Create Matter'}
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