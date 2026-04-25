'use client'

import { useState, useActionState, useEffect } from 'react'
import { addMatterUpdateAction } from '@/lib/portal/actions'

const initialState = { error: null as string | null, success: false }

export default function AdminAddUpdateForm({
  matterId,
  matterTitle,
}: {
  matterId: string
  matterTitle: string
}) {
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
        className="portal-btn-ghost"
        style={{ padding: '0.3rem 0.75rem', width: 'auto', fontSize: '0.65rem' }}
      >
        + Note
      </button>

      {open && (
        <AddUpdateModal
          key={modalKey}
          matterId={matterId}
          matterTitle={matterTitle}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

function AddUpdateModal({
  matterId,
  matterTitle,
  onClose,
}: {
  matterId: string
  matterTitle: string
  onClose: () => void
}) {
  const [state, formAction, isPending] = useActionState(addMatterUpdateAction, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="portal-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="portal-modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 className="portal-section-title" style={{ marginBottom: '0.25rem', fontSize: '1.2rem' }}>
              Add Update Note
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(233,233,223,0.4)', fontFamily: 'var(--font-body)' }}>
              {matterTitle}
            </p>
          </div>
          <button onClick={onClose} className="portal-btn-ghost" style={{ padding: '0.3rem 0.75rem', width: 'auto' }}>
            ✕
          </button>
        </div>

        <form action={formAction} className="portal-form">
          {state.error && <div className="portal-error">{state.error}</div>}

          <input type="hidden" name="matter_id" value={matterId} />

          <div className="portal-field">
            <label className="portal-label">Update Title *</label>
            <input
              name="update_title"
              required
              className="portal-input"
              placeholder="e.g. Trademark search completed"
            />
          </div>

          <div className="portal-field">
            <label className="portal-label">Update Body *</label>
            <textarea
              name="update_body"
              required
              className="portal-textarea"
              placeholder="Describe what happened, what was submitted, or what the client should know…"
              style={{ minHeight: '8rem' }}
            />
          </div>

          <div className="portal-field">
            <select name="visible_to_client" className="portal-select" style={{ width: 'auto', padding: '0.4rem 0.75rem' }}>
              <option value="true">Visible to client</option>
              <option value="false">Internal only</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button type="submit" className="portal-btn-primary" disabled={isPending} style={{ flex: 1 }}>
              {isPending ? 'Adding…' : 'Add Update'}
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