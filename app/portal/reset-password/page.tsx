'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    startTransition(async () => {
      const supabase = createClient()
      const { error: updateError } = await supabase.auth.updateUser({ password })

      if (updateError) {
        setError('Could not update password. The link may have expired — request a new one.')
        return
      }

      setDone(true)
      setTimeout(() => router.push('/portal/dashboard'), 1500)
    })
  }

  return (
    <div className="portal-login-page">
      <div className="portal-login-box">
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <Link href="/">
            <Image
              src="/images/elite-logo.png"
              alt="Elite IP"
              width={160}
              height={80}
              style={{ objectFit: 'contain', height: 'auto', width: 'clamp(120px, 40vw, 160px)', margin: '0 auto' }}
              priority
            />
          </Link>
          <p className="portal-topbar-label" style={{ marginTop: '0.75rem', display: 'block', textAlign: 'center' }}>
            Client Portal
          </p>
        </div>

        <div className="portal-divider" style={{ marginTop: '0', marginBottom: '2rem' }} />

        {done ? (
          <div style={{ textAlign: 'center' }}>
            <div className="portal-success" style={{ marginBottom: '1rem' }}>
              Password updated. Redirecting to your dashboard…
            </div>
          </div>
        ) : (
          <>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(233,233,223,0.55)',
                fontFamily: 'var(--font-body)',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              Choose a new password for your account.
            </p>

            <form onSubmit={handleSubmit} className="portal-form">
              {error && <div className="portal-error">{error}</div>}

              <div className="portal-field">
                <label htmlFor="password" className="portal-label">New password</label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="portal-input"
                  placeholder="••••••••"
                  disabled={isPending}
                />
              </div>

              <div className="portal-field">
                <label htmlFor="confirm" className="portal-label">Confirm password</label>
                <input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="portal-input"
                  placeholder="••••••••"
                  disabled={isPending}
                />
              </div>

              <button
                type="submit"
                className="portal-btn-primary"
                disabled={isPending}
                style={{ marginTop: '0.5rem' }}
              >
                {isPending ? 'Updating…' : 'Set New Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}