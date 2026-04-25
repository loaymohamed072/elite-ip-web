import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  getCurrentProfile,
  getClientRecord,
  getClientMatters,
  getMatterUpdates,
} from '@/lib/portal/queries'
import type { Matter, MatterUpdate } from '@/lib/supabase/types'
import PortalSignOut from '@/components/portal/PortalSignOut'

export default async function PortalDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/portal/login')

  const profile = await getCurrentProfile()

  if (!profile || profile.role !== 'client') {
    await supabase.auth.signOut()
    redirect('/portal/login')
  }

  const clientRecord = await getClientRecord()
  const matters: Matter[] = clientRecord
    ? await getClientMatters(clientRecord.id)
    : []

  // Fetch updates for all matters in parallel
  const allUpdatesMap: Record<string, MatterUpdate[]> = {}
  if (matters.length > 0) {
    const updateResults = await Promise.all(
      matters.map((m) => getMatterUpdates(m.id))
    )
    matters.forEach((m, i) => {
      allUpdatesMap[m.id] = updateResults[i]
    })
  }

  const clientName = clientRecord?.full_name ?? profile.full_name ?? 'Client'

  return (
    <div className="portal-shell">
      {/* Top bar */}
      <header className="portal-topbar">
        <div>
          <span className="portal-topbar-logo">Elite IP</span>
          <span
            className="portal-topbar-label"
            style={{ marginLeft: '1rem', display: 'inline' }}
          >
            Client Portal
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(233,233,223,0.45)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {profile.email}
          </span>
          <PortalSignOut />
        </div>
      </header>

      {/* Content */}
      <main className="portal-content">
        {/* Welcome */}
        <div className="portal-section">
          <h1 className="portal-section-title" style={{ fontSize: '1.75rem' }}>
            Welcome, {clientName}
          </h1>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(233,233,223,0.5)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {matters.length === 0
              ? 'No active matters at this time. Contact your advisor for more information.'
              : `You have ${matters.length} active matter${matters.length !== 1 ? 's' : ''} under management.`}
          </p>
        </div>

        {/* Matters */}
        {matters.length === 0 ? (
          <div className="portal-card">
            <div className="portal-empty">No matters assigned yet.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {matters.map((matter) => {
              const updates = allUpdatesMap[matter.id] ?? []
              return (
                <MatterCard key={matter.id} matter={matter} updates={updates} />
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

function MatterCard({
  matter,
  updates,
}: {
  matter: Matter
  updates: MatterUpdate[]
}) {
  const statusClass =
    matter.status === 'Completed'
      ? 'status-completed'
      : matter.status === 'Active'
      ? 'status-active'
      : 'status-pending'

  return (
    <div className="matter-card">
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h2
            className="font-display"
            style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '0.375rem' }}
          >
            {matter.title}
          </h2>
          <span className="stage-badge">{matter.matter_type}</span>
        </div>
        <span className={statusClass}>{matter.status}</span>
      </div>

      {/* Progress bar */}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
          }}
        >
          <span
            className="portal-label"
            style={{ color: 'rgba(233,233,223,0.45)' }}
          >
            {matter.current_stage}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#B8A882',
              fontFamily: 'var(--font-body)',
            }}
          >
            {matter.progress}%
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${matter.progress}%` }}
          />
        </div>
      </div>

      {/* Next step */}
      {matter.next_step && (
        <div className="next-step-callout">
          <p
            className="portal-label"
            style={{ marginBottom: '0.25rem', color: '#B8A882' }}
          >
            Next Step
          </p>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(233,233,223,0.8)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {matter.next_step}
          </p>
        </div>
      )}

      {/* Updates timeline */}
      {updates.length > 0 && (
        <div>
          <p
            className="portal-label"
            style={{ marginBottom: '0.75rem', color: 'rgba(233,233,223,0.4)' }}
          >
            Recent Updates
          </p>
          <div className="update-timeline">
            {updates.slice(0, 5).map((u) => (
              <div key={u.id} className="update-item">
                <div
                  className="update-dot"
                  style={{ marginTop: '0.35rem' }}
                />
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#E9E9DF',
                      fontFamily: 'var(--font-body)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {u.update_title}
                  </p>
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: 'rgba(233,233,223,0.55)',
                      fontFamily: 'var(--font-body)',
                      lineHeight: 1.55,
                    }}
                  >
                    {u.update_body}
                  </p>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: 'rgba(184,168,130,0.5)',
                      fontFamily: 'var(--font-body)',
                      marginTop: '0.375rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {new Date(u.created_at).toLocaleDateString('en-AE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last updated */}
      <p
        style={{
          fontSize: '0.7rem',
          color: 'rgba(233,233,223,0.25)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        Last updated{' '}
        {new Date(matter.updated_at).toLocaleDateString('en-AE', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </p>
    </div>
  )
}