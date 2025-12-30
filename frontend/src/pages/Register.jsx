import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { authAPI } from '../services/api'

export function Register() {
  const [activeTab, setActiveTab] = useState('patient')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialization: '',
  })
  const [avatarFile, setAvatarFile] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0] || null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      const role = activeTab === 'doctor' ? 'doctor' : 'patient'

      let response
      if (avatarFile) {
        const fd = new FormData()
        fd.append('fullName', formData.fullName)
        fd.append('email', formData.email)
        fd.append('password', formData.password)
        fd.append('role', role)
        if (activeTab === 'doctor') fd.append('specialization', formData.specialization)
        fd.append('avatar', avatarFile)
        response = await authAPI.register(fd)
      } else {
        response = await authAPI.register({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role,
          specialization: activeTab === 'doctor' ? formData.specialization : undefined,
        })
      }

      if (response.data.success) {
        // Store auth token and user info
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        setSuccess('Account created successfully! Redirecting...')
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          specialization: '',
        })

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Join the platform"
        title="Sign up as a doctor or patient in under 2 minutes."
        description="Dr. Online keeps sensitive details encrypted while letting you collaborate immediately."
      />
      <section className="mx-auto max-w-2xl px-4 py-16">
        {/* Tab Navigation */}
        <div className="mb-8 flex gap-4 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('patient')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'patient'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Patient Signup
          </button>
          <button
            onClick={() => setActiveTab('doctor')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'doctor'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Doctor Signup
          </button>
        </div>

        {/* Registration Form */}
        <div className="rounded-3xl bg-white p-8 shadow-glass">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-600">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-900">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            {/* Avatar upload */}
            <div>
              <label className="block text-sm font-medium text-slate-900">Profile Picture (optional)</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-900">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>

            {/* Specialization (for doctors) */}
            {activeTab === 'doctor' && (
              <div>
                <label className="block text-sm font-medium text-slate-900">
                  Specialization *
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none"
                  placeholder="Cardiology"
                />
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-900">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-900">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700 disabled:bg-slate-400"
            >
              {loading ? 'Creating Account...' : `Create ${activeTab === 'doctor' ? 'Doctor' : 'Patient'} Account`}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Log in here
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

