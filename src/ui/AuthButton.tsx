'use client'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FaGithub, FaFacebook, FaGoogle, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import React from 'react'

export const AuthButton = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="auth-btn-container">
      {session?.user ? (
        <>
          <p className="auth-btn-welcome">Hello, {session.user.name || session.user.email}</p>
          <button onClick={() => signOut()} className="auth-btn-logout">
            Wyloguj się
          </button>
        </>
      ) : (
        <>
          <p className="auth-btn-login-prompt">Zaloguj się przez:</p>
          <button onClick={() => signIn('github')} className="auth-btn auth-btn--github">
            <FaGithub className="auth-btn-icon" />
            <span className="auth-btn-text">GitHub</span>
          </button>
          <button onClick={() => signIn('facebook')} className="auth-btn auth-btn--facebook">
            <FaFacebook className="auth-btn-icon" />
            <span className="auth-btn-text">Facebook</span>
          </button>
          <button onClick={() => signIn('google')} className="auth-btn auth-btn--google">
            <FaGoogle className="auth-btn-icon" />
            <span className="auth-btn-text">Google</span>
          </button>
        </>
      )}

      <Link href="/" className="auth-btn-back">
        <FaArrowLeft className="auth-btn-icon" />
        <span className="auth-btn-text">Wróć do strony głównej</span>
      </Link>
    </div>
  )
}
