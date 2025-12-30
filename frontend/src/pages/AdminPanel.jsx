import React from 'react'

// Small AddStudyForm used in AdminPanel
function AddStudyForm({ onCreated }) {
  const [form, setForm] = React.useState({ title: '', condition: '', summary: '', tags: '' })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('authToken')
      const payload = {
        title: form.title,
        description: form.summary,
        condition: form.condition,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      }
      const res = await fetch('http://localhost:5000/api/studies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        onCreated && onCreated()
        setForm({ title: '', condition: '', summary: '', tags: '' })
      } else {
        setError(data.message || 'Failed to create study')
      }
    } catch (err) {
      setError('Failed to create study')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input name="title" value={form.title} onChange={handleChange} required className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Condition</label>
        <input name="condition" value={form.condition} onChange={handleChange} required className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Summary</label>
        <textarea name="summary" value={form.summary} onChange={handleChange} required className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Tags (comma separated)</label>
        <input name="tags" value={form.tags} onChange={handleChange} className="mt-1 block w-full rounded border px-3 py-2" />
      </div>
      <div>
        <button type="submit" disabled={loading} className="rounded bg-primary-600 px-4 py-2 text-white">
          {loading ? 'Creating...' : 'Create Study'}
        </button>
      </div>
    </form>
  )
}

// Simple Admin Panel Component for basic usage
export function AdminPanel() {
  const [adminView, setAdminView] = React.useState('dashboard')
  const [requests, setRequests] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'admin') {
      window.location.href = '/'
      return
    }

    loadData()
  }, [])

  const loadData = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch('http://localhost:5000/api/contact', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setRequests(data.contactRequests)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBookModerator = async (requestId) => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`http://localhost:5000/api/contact/${requestId}/book-moderator`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (data.success) {
        alert('Moderator booked successfully!')
        loadData()
      }
    } catch (error) {
      console.error('Error booking moderator:', error)
    }
  }

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await fetch(`http://localhost:5000/api/contact/${requestId}/status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await response.json()
      if (data.success) {
        alert('Status updated successfully!')
        loadData()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-slate-900">Admin Panel</h1>
          <button
            onClick={() => {
              localStorage.removeItem('authToken')
              localStorage.removeItem('user')
              window.location.href = '/'
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setAdminView('dashboard')}
            className={`rounded-lg px-4 py-2 font-semibold ${
              adminView === 'dashboard'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-slate-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setAdminView('contacts')}
            className={`rounded-lg px-4 py-2 font-semibold ${
              adminView === 'contacts'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-slate-900'
            }`}
          >
            Contact Requests
          </button>
          <button
            onClick={() => setAdminView('addStudy')}
            className={`rounded-lg px-4 py-2 font-semibold ${
              adminView === 'addStudy'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-slate-900'
            }`}
          >
            Add Study
          </button>
        </div>

        {adminView === 'dashboard' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-semibold text-slate-900">Total Requests</h3>
              <p className="mt-2 text-3xl font-bold text-primary-600">{requests.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-semibold text-slate-900">Pending</h3>
              <p className="mt-2 text-3xl font-bold text-yellow-600">
                {requests.filter((r) => r.status === 'pending').length}
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-semibold text-slate-900">Resolved</h3>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {requests.filter((r) => r.status === 'resolved').length}
              </p>
            </div>
          </div>
        )}

        {adminView === 'contacts' && (
          <div className="space-y-6">
            {loading ? (
              <p className="text-slate-600">Loading...</p>
            ) : requests.length === 0 ? (
              <p className="text-slate-600">No contact requests yet</p>
            ) : (
              requests.map((request) => (
                <div
                  key={request._id}
                  className="rounded-lg bg-white p-6 shadow"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {request.fullName}
                      </h3>
                      <p className="text-sm text-slate-600">{request.email}</p>
                    </div>
                    <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-600">
                      {request.status}
                    </span>
                  </div>
                  <p className="mb-2 text-slate-700">
                    <strong>Subject:</strong> {request.subject}
                  </p>
                  <p className="mb-4 text-slate-600">{request.message}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBookModerator(request._id)}
                      disabled={request.status !== 'pending'}
                      className="rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 disabled:bg-slate-400"
                    >
                      Book Moderator
                    </button>
                    <select
                      value={request.status}
                      onChange={(e) => handleUpdateStatus(request._id, e.target.value)}
                      className="rounded-lg border border-slate-300 px-4 py-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="acknowledged">Acknowledged</option>
                      <option value="moderator-assigned">Moderator Assigned</option>
                      <option value="doctor-assigned">Doctor Assigned</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {adminView === 'addStudy' && (
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Study</h2>
            <AddStudyForm onCreated={() => { setAdminView('dashboard'); loadData(); }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
