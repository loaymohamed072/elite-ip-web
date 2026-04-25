import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCurrentProfile, adminGetAllClients, adminGetAllMatters } from '@/lib/portal/queries'
import type { Client, Matter } from '@/lib/supabase/types'
import PortalSignOut from '@/components/portal/PortalSignOut'
import AdminCreateClientForm from '@/components/portal/AdminCreateClientForm'
import AdminCreateMatterForm from '@/components/portal/AdminCreateMatterForm'
import AdminUpdateMatterForm from '@/components/portal/AdminUpdateMatterForm'
import AdminAddUpdateForm from '@/components/portal/AdminAddUpdateForm'
import AdminArchiveClientButton from '@/components/portal/AdminArchiveClientButton'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const profile = await getCurrentProfile()

  if (!profile || profile.role !== 'admin') {
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  const clients: Client[] = await adminGetAllClients()
  const matters = await adminGetAllMatters()

  const activeCount = matters.filter((m) => m.status === 'Active').length

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
            Admin Dashboard
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(233,233,223,0.4)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {profile.full_name ?? profile.email}
          </span>
          <PortalSignOut redirectTo="/admin/login" />
        </div>
      </header>

      {/* Content */}
      <main className="portal-content">
        {/* Stats */}
        <div className="portal-section">
          <div className="admin-stats-row">
            <StatCard label="Total Clients" value={clients.length} />
            <StatCard label="Total Matters" value={matters.length} />
            <StatCard label="Active Matters" value={activeCount} />
            <StatCard
              label="Completed"
              value={matters.filter((m) => m.status === 'Completed').length}
            />
          </div>
        </div>

        {/* Clients */}
        <div className="portal-section">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <h2 className="portal-section-title" style={{ marginBottom: '0' }}>
              Clients
            </h2>
            <AdminCreateClientForm />
          </div>

          <div className="portal-card" style={{ padding: '0' }}>
            {clients.length === 0 ? (
              <div className="portal-empty">No clients yet. Create the first one.</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Phone</th>
                      <th>Joined</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((c) => (
                      <tr key={c.id}>
                        <td style={{ fontWeight: 500, color: '#E9E9DF' }}>{c.full_name}</td>
                        <td>{c.email}</td>
                        <td>{c.company_name ?? '—'}</td>
                        <td>{c.phone ?? '—'}</td>
                        <td>
                          {new Date(c.created_at).toLocaleDateString('en-AE', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td>
                          <AdminArchiveClientButton clientId={c.id} clientName={c.full_name} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Matters */}
        <div className="portal-section">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <h2 className="portal-section-title" style={{ marginBottom: '0' }}>
              Matters
            </h2>
            <AdminCreateMatterForm clients={clients} />
          </div>

          <div className="portal-card" style={{ padding: '0' }}>
            {matters.length === 0 ? (
              <div className="portal-empty">No matters yet.</div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Client</th>
                      <th>Type</th>
                      <th>Stage</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th>Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matters.map((m) => (
                      <MatterRow
                        key={m.id}
                        matter={m}
                        clientName={clients.find((c) => c.id === m.client_id)?.full_name ?? '—'}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="admin-stat-card">
      <p
        className="portal-label"
        style={{ marginBottom: '0.5rem', color: 'rgba(233,233,223,0.4)' }}
      >
        {label}
      </p>
      <p
        className="font-display"
        style={{ fontSize: '2rem', fontWeight: 400, color: '#E9E9DF' }}
      >
        {value}
      </p>
    </div>
  )
}

function MatterRow({ matter, clientName }: { matter: Matter; clientName: string }) {
  const statusClass =
    matter.status === 'Completed'
      ? 'status-completed'
      : matter.status === 'Active'
      ? 'status-active'
      : 'status-pending'

  return (
    <tr>
      <td style={{ fontWeight: 500, color: '#E9E9DF', maxWidth: '180px' }}>
        {matter.title}
      </td>
      <td>{clientName}</td>
      <td>
        <span className="stage-badge" style={{ borderColor: 'transparent' }}>
          {matter.matter_type}
        </span>
      </td>
      <td style={{ maxWidth: '160px', fontSize: '0.8125rem' }}>{matter.current_stage}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '80px' }}>
          <div className="progress-track" style={{ flex: 1 }}>
            <div className="progress-fill" style={{ width: `${matter.progress}%` }} />
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#B8A882',
              fontFamily: 'var(--font-body)',
              minWidth: '32px',
            }}
          >
            {matter.progress}%
          </span>
        </div>
      </td>
      <td>
        <span className={statusClass}>{matter.status}</span>
      </td>
      <td style={{ fontSize: '0.8125rem', color: 'rgba(233,233,223,0.45)' }}>
        {new Date(matter.updated_at).toLocaleDateString('en-AE', {
          month: 'short',
          day: 'numeric',
        })}
      </td>
      <td>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <AdminUpdateMatterForm matter={matter} />
          <AdminAddUpdateForm matterId={matter.id} matterTitle={matter.title} />
        </div>
      </td>
    </tr>
  )
}