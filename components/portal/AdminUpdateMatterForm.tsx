'use client'

import { useState, useActionState, useEffect } from 'react'
import { updateMatterStageAction } from '@/lib/portal/actions'
import { MATTER_STAGES, type Matter } from '@/lib/supabase/types'

const initialState = { error: null as string | null, success: false }

export default function AdminUpdateMatterForm({ matter }: { matter: Matter }) {
  const [open, setOpen] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const [state, formAction, isPending] = useActionState(updateMatterStageAction, initialState)

  useEffect(() => {
    if (state.success) setOpen(false)
  }, [state.success])

  function openModal() {
    setFormKey((k) => k + 1)
    setOpen(true)
  }

  return (
    <>
      <button
        onClick={openModal}
        className="portal-btn-ghost"
        style={{ padding: '0.3rem 0.75rem', width: 'auto', fontSize: '0.65rem' }}
      >
        Update
      </button>

      {open && (
        <div className="portal-modal-overlay" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="portal-modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 className="portal-section-title" style={{ marginBottom: '0.25rem', fontSize: '1.2rem' }}>
                  Update Stage
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(233,233,223,0.4)', fontFamily: 'var(--font-body)' }}>
                  {matter.title}
                </p>
              </div>
              <button onClick={() => setOpen(false)} className="portal-btn-ghost" style={{ padding: '0.3rem 0.75rem', width: 'auto' }}>
                ✕
              </button>
            </div>

            <form key={formKey} action={formAction} className="portal-form">
              {state.error && <div className="portal-error">{state.error}</div>}

              <input type="hidden" name="matter_id" value={matter.id} />

              <div className="portal-field">
                <label className="portal-label">Stage</label>
                <select name="current_stage" className="portal-select" defaultValue={matter.current_stage}>
                  {MATTER_STAGES.map((s) => (
                    <option key={s.label} value={s.label}>
                      {s.label} ({s.progress}%)
                    </option>
                  ))}
                </select>
              </div>

              <div className="portal-field">
                <label className="portal-label">Status</label>
                <select name="status" className="portal-select" defaultValue={matter.status}>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Pending Client">Pending Client</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="portal-field">
                <label className="portal-label">Next Step (client-visible)</label>
                <input
                  name="next_step"
                  className="portal-input"
                  defaultValue={matter.next_step ?? ''}
                  placeholder="What should the client do or expect next?"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="portal-btn-primary" disabled={isPending} style={{ flex: 1 }}>
                  {isPending ? 'Saving…' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => setOpen(false)} className="portal-btn-ghost" style={{ flex: 1 }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}