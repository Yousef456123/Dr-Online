import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { authAPI } from '../services/api'

export function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!formData.email || !formData.password) {
        setError('Please enter email and password')
        setLoading(false)
        return
      }

      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      })

      if (response.data.success) {
        // Store auth token and user info
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        setSuccess('Login successful! Redirecting...')
        setFormData({
          email: '',
          password: '',
        })

        // Redirect after 1.5 seconds
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Welcome back"
        title="Log in to your account"
        description="Access your profile, discussions, and messages."
      />
      <section className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-glass">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="mt-2 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:border-primary-300 focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="mt-2 block w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:border-primary-300 focus:outline-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:bg-slate-400 transition"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
              Create one here
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default Login
