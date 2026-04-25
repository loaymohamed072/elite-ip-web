'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function PortalRegisterPage() {
  const [fullName, setFullName] = useState('')
  const [company, setCompany] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    startTransition(async () => {
      const supabase = createClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            company_name: company.trim() || null,
            phone: phone.trim() || null,
            role: 'client',
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      setDone(true)
    })
  }

  if (done) {
    return (
      <div className="portal-login-page">
        <div className="portal-login-box" style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }}>✓</span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: '1.4rem', fontWeight: 400, marginBottom: '1rem' }}
          >
            Account Created
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(233,233,223,0.55)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.65,
              marginBottom: '2rem',
            }}
          >
            Check your email inbox for a confirmation link.
            Once confirmed, you can sign in to your portal.
          </p>
          <Link href="/portal/login" className="portal-btn-primary" style={{ display: 'block' }}>
            Go to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="portal-login-page">
      <div className="portal-login-box" style={{ maxWidth: '480px' }}>
        {/* Logo */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Link href="/" className="portal-topbar-logo" style={{ fontSize: '1.4rem' }}>
            Elite IP
          </Link>
          <p
            className="portal-topbar-label"
            style={{ marginTop: '0.5rem', display: 'block', textAlign: 'center' }}
          >
            Create Your Client Account
          </p>
        </div>

        <div className="portal-divider" style={{ marginTop: '0', marginBottom: '1.75rem' }} />

        <form onSubmit={handleSubmit} className="portal-form">
          {error && <div className="portal-error">{error}</div>}

          <div className="portal-form-grid">
            <div className="portal-field" style={{ gridColumn: '1 / -1' }}>
              <label className="portal-label">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="portal-input"
                placeholder="Jane Smith"
                disabled={isPending}
              />
            </div>

            <div className="portal-field">
              <label className="portal-label">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="portal-input"
                placeholder="Your company"
                disabled={isPending}
              />
            </div>

            <div className="portal-field">
              <label className="portal-label">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="portal-input"
                placeholder="+971 50 000 0000"
                disabled={isPending}
              />
            </div>

            <div className="portal-field" style={{ gridColumn: '1 / -1' }}>
              <label className="portal-label">Email Address *</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="portal-input"
                placeholder="your@email.com"
                disabled={isPending}
              />
            </div>

            <div className="portal-field">
              <label className="portal-label">Password *</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="portal-input"
                placeholder="Min. 8 characters"
                disabled={isPending}
              />
            </div>

            <div className="portal-field">
              <label className="portal-label">Confirm Password *</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="portal-input"
                placeholder="Repeat password"
                disabled={isPending}
              />
            </div>
          </div>

          <button
            type="submit"
            className="portal-btn-primary"
            disabled={isPending}
            style={{ marginTop: '0.5rem' }}
          >
            {isPending ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p
          style={{
            marginTop: '1.75rem',
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: 'rgba(233,233,223,0.35)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Already have an account?{' '}
          <Link
            href="/portal/login"
            style={{
              color: 'rgba(184,168,130,0.7)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}