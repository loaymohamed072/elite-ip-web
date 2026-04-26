'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function PortalLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    startTransition(async () => {
      const supabase = createClient()
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError || !data.user) {
        setError('Invalid email or password. Please try again.')
        return
      }

      // Check role — client must have role 'client'
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      if (!profile || profile.role !== 'client') {
        await supabase.auth.signOut()
        setError('Access denied. This portal is for clients only.')
        return
      }

      router.push('/portal/dashboard')
      router.refresh()
    })
  }

  return (
    <div className="portal-login-page">
      <div className="portal-login-box">
        {/* Logo */}
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

        <form onSubmit={handleSubmit} className="portal-form">
          {error && <div className="portal-error">{error}</div>}

          <div className="portal-field">
            <label htmlFor="email" className="portal-label">
              Email address
            </label>
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

          <div className="portal-field">
            <label htmlFor="password" className="portal-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {isPending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          <Link
            href="/portal/forgot-password"
            style={{
              color: 'rgba(184,168,130,0.6)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Forgot your password?
          </Link>
        </p>

        <p
          style={{
            marginTop: '0.75rem',
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: 'rgba(233,233,223,0.45)',
            fontFamily: 'var(--font-body)',
          }}
        >
          New client?{' '}
          <Link
            href="/portal/register"
            style={{
              color: '#B8A882',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Create an account
          </Link>
        </p>

        <p
          style={{
            marginTop: '0.75rem',
            textAlign: 'center',
            fontSize: '0.8125rem',
            color: 'rgba(233,233,223,0.25)',
            fontFamily: 'var(--font-body)',
          }}
        >
          <Link
            href="/"
            style={{
              color: 'rgba(184,168,130,0.5)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Return to website
          </Link>
        </p>
      </div>
    </div>
  )
}