import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { contactAPI } from '../services/api'

export function Contact() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
    requestType: 'consultation',
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
      const user = JSON.parse(localStorage.getItem('user') || 'null')
      const payload = {
        ...formData,
      }
      if (user && user.id) {
        payload.patient = user.id
      }
      const response = await contactAPI.submitContact(payload)

      if (response.data.success) {
        setSuccess('Your request has been submitted successfully! We will respond within 30 minutes.')
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          subject: '',
          message: '',
          requestType: 'consultation',
        })

        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(''), 5000)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to submit request'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="We are listening"
        title="Schedule a walkthrough or escalate a case."
        description="Fill out the form and our triage desk will respond in under 30 minutes."
      />
      <section className="mx-auto max-w-5xl gap-8 px-4 py-16 lg:grid lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white p-8 shadow-glass">
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600">
              {success}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-slate-700">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
              placeholder="Dr. Elena Raymond"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Email address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
              placeholder="you@hospital.org"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
              placeholder="+961 81 925 158"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Request Type *
              </label>
              <select
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
              >
                <option value="consultation">Consultation</option>
                <option value="question">Question</option>
                <option value="feedback">Feedback</option>
                <option value="booking">Booking</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                placeholder="Request subject"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Message *
            </label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              minLength="10"
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
              placeholder="Share context around your request..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:bg-slate-400"
          >
            {loading ? 'Sending...' : 'Send request'}
          </button>
        </form>

        <div className="mt-10 rounded-3xl bg-midnight/95 p-8 text-white shadow-glass lg:mt-0">
          <p className="text-sm font-semibold text-accent">Contact channels</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>Hotline: +961 81 925 158</li>
            <li>Clinical escalations: clinical@dronline.health</li>
            <li>Partnerships: partner@dronline.health</li>
            <li>HQ: Beirut - Haret Hreik Al Nakheel Building </li>
          </ul>
          <p className="mt-8 text-xs uppercase tracking-[0.5em] text-white/50">
            Always-on support
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            {['Care', 'Tech', 'Community'].map((pill) => (
              <div
                key={pill}
                className="rounded-2xl border border-white/10 px-3 py-2 text-xs font-semibold"
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

