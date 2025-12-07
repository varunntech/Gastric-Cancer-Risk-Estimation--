import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import loginImage from '../assets/login.jpg'
import AuthCarousel from '../components/AuthCarousel'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      login(res.data.token, res.data.user)
      navigate('/')
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your credentials.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-panel image-panel" style={{ position: 'relative', padding: 0 }}>
        <AuthCarousel />
      </div>

      <div className="auth-panel form-panel">
        <div className="form-header">
          <h1>Log in</h1>
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="link-inline">
              Create one
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form wide">
          <label className="field">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>
          <label className="field">
            Password
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage


