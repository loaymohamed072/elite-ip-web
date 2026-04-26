'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const supabase = createClient()
      const origin = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin
      const redirectTo = `${origin}/auth/callback?next=/portal/reset-password`

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      })

      if (resetError) {
        setError('Something went wrong. Please try again.')
        return
      }

      setSent(true)
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

        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div className="portal-success" style={{ marginBottom: '1.5rem' }}>
              If that email is registered, you&apos;ll receive a password reset link shortly.
            </div>
            <Link
              href="/portal/login"
              style={{
                fontSize: '0.8125rem',
                color: '#B8A882',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                fontFamily: 'var(--font-body)',
              }}
            >
              ← Back to login
            </Link>
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
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="portal-form">
              {error && <div className="portal-error">{error}</div>}

              <div className="portal-field">
                <label htmlFor="email" className="portal-label">Email address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="portal-input"
                  placeholder="your@email.com"
                  disabled={isPending}
                />
              </div>

              <button
                type="submit"
                className="portal-btn-primary"
                disabled={isPending}
                style={{ marginTop: '0.5rem' }}
              >
                {isPending ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>

            <p
              style={{
                marginTop: '1.25rem',
                textAlign: 'center',
                fontSize: '0.8125rem',
                fontFamily: 'var(--font-body)',
              }}
            >
              <Link
                href="/portal/login"
                style={{
                  color: 'rgba(184,168,130,0.6)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                ← Back to login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}