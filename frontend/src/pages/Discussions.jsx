import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { discussionTopics as initialTopics } from '../data/discussions'
import { studyUpdates } from '../data/studies'
import { discussionAPI, studyAPI } from '../services/api'

const conditions = ['All', ...new Set(studyUpdates.map((item) => item.condition))]

export function Discussions() {
  const [topics, setTopics] = useState(initialTopics)
  const [studies, setStudies] = useState(studyUpdates)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [conditionFilter, setConditionFilter] = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '' })
  const [formOpen, setFormOpen] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'general',
  })

  // Fetch discussions and studies from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discussionsRes, studiesRes] = await Promise.all([
          discussionAPI.getAllDiscussions(),
          studyAPI.getAllStudies(),
        ])

        if (discussionsRes.data.success) {
          setTopics(discussionsRes.data.discussions)
        }
        if (studiesRes.data.success) {
          setStudies(studiesRes.data.studies)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [])

  const filteredStudies = useMemo(() => {
    if (conditionFilter === 'All') return studies
    return studies.filter((study) => study.condition === conditionFilter)
  }, [conditionFilter, studies])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')

      if (!user.id) {
        setError('Please log in to create a discussion')
        setLoading(false)
        return
      }

      const response = await discussionAPI.createDiscussion({
        title: form.title,
        description: form.description,
        category: form.category,
        tags: [],
      })

      if (response.data.success) {
        setSuccess('Discussion created successfully!')
        setTopics([response.data.discussion, ...topics])
        setForm({ title: '', description: '', category: 'general' })
        setFormOpen(false)

        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create discussion'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTopic = async (topicId) => {
    if (!window.confirm('Are you sure you want to delete this topic?')) {
      return
    }

    try {
      setError('')
      const response = await discussionAPI.deleteDiscussion(topicId)
      if (response.data.success) {
        setTopics(topics.filter((t) => t._id !== topicId))
        setSuccess('Topic deleted successfully!')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete topic'
      setError(errorMessage)
    }
  }

  const handleEditStart = (topic) => {
    setEditingId(topic._id)
    setEditForm({
      title: topic.title,
      description: topic.description,
      category: topic.category,
    })
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm({ title: '', description: '', category: '' })
  }

  const handleEditSubmit = async (topicId) => {
    try {
      setError('')
      const response = await discussionAPI.updateDiscussion(topicId, {
        title: editForm.title,
        description: editForm.description,
        category: editForm.category,
      })
      if (response.data.success) {
        setTopics(
          topics.map((t) =>
            t._id === topicId
              ? {
                  ...t,
                  title: editForm.title,
                  description: editForm.description,
                  category: editForm.category,
                }
              : t
          )
        )
        setEditingId(null)
        setSuccess('Topic updated successfully!')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update topic'
      setError(errorMessage)
    }
  }

  const isTopicAuthor = (topic) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return user.id === topic.author?._id
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-midnight via-primary-700 to-primary-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">
            Community hub
          </p>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-semibold md:text-4xl">
                Doctors and patients co-create answers in real time.
              </h1>
              <p className="mt-3 text-white/80">
                Pin evidence, ask follow-up questions, and keep track of
                treatment reactions with a high-trust audience.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-glass"
            >
              Book a moderator
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white shadow-glass">
            {!formOpen ? (
              <div className="p-8">
                <button
                  onClick={() => setFormOpen(true)}
                  className="w-full rounded-full bg-primary-600 px-6 py-4 text-base font-semibold text-white hover:bg-primary-700 transition"
                >
                  + Start a Discussion
                </button>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-midnight">Publish a New Topic</h3>
                  <button
                    onClick={() => setFormOpen(false)}
                    className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-sm text-slate-600">Topic Category</label>
                    <select
                      className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                      value={form.category}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, category: e.target.value }))
                      }
                    >
                      <option value="general">General</option>
                      <option value="research">Research</option>
                      <option value="questions">Questions</option>
                      <option value="experiences">Experiences</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Topic title *</label>
                    <input
                      className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                      value={form.title}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, title: e.target.value }))
                      }
                      required
                      placeholder="How I manage chemo appetite dips"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Description *</label>
                    <textarea
                      className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                      rows={4}
                      value={form.description}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, description: e.target.value }))
                      }
                      required
                      placeholder="Include questions, metrics, or resources..."
                    />
                  </div>
                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                      {success}
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:bg-slate-400"
                    >
                      {loading ? 'Publishing...' : 'Publish Topic'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="flex-1 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {topics.length === 0 ? (
              <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
                <p className="text-slate-600">No discussions yet. Be the first to start one!</p>
              </div>
              ) : (
              topics.map((topic, idx) => (
                <div
                  key={topic._id || topic.id || `topic-${idx}`}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  {editingId === topic._id ? (
                    // Edit Form
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-midnight">Edit Topic</h3>
                      <div>
                        <label className="text-sm text-slate-600">Category</label>
                        <select
                          className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, category: e.target.value }))
                          }
                        >
                          <option value="general">General</option>
                          <option value="research">Research</option>
                          <option value="questions">Questions</option>
                          <option value="experiences">Experiences</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-slate-600">Title</label>
                        <input
                          className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, title: e.target.value }))
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-600">Description</label>
                        <textarea
                          className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                          rows={3}
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, description: e.target.value }))
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSubmit(topic._id)}
                          className="flex-1 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display View
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">
                          {topic.category}
                        </p>
                        {isTopicAuthor(topic) && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditStart(topic)}
                              className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTopic(topic._id)}
                              className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-200"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-xl font-semibold text-midnight">
                        {topic.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">{topic.description}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span>{topic.author?.fullName || 'Anonymous'}</span>
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-600">
                          {topic.replies?.length || 0} replies
                        </span>
                        <span className="rounded-full bg-slate-50 px-3 py-1 text-slate-600">
                          {topic.views || 0} views
                        </span>
                      </div>
                      <Link
                        to={`/discussions/${topic._id}`}
                        className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600"
                      >
                        View thread
                      </Link>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-midnight/95 p-8 text-white shadow-glass">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-accent">
                Study streams
              </p>
              <select
                className="rounded-xl bg-white/10 px-3 py-2 text-xs text-white"
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
              >
                {conditions.map((cond) => (
                  <option key={cond} value={cond} className="text-slate-900">
                    {cond}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 space-y-4">
              {filteredStudies.length === 0 ? (
                <div className="text-sm text-white/70">No studies available for this condition</div>
              ) : (
                filteredStudies.map((study, idx) => (
                  <div
                    key={study._id || study.id || `study-${idx}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      {study.condition}
                    </p>
                    <p className="mt-2 text-base font-semibold">{study.title}</p>
                    <p className="mt-2 text-sm text-white/75">
                      {study.description?.substring(0, 100)}...
                    </p>
                    <Link
                      to={`/discussions/${study._id}`}
                      className="mt-3 inline-flex items-center text-sm font-semibold text-accent"
                    >
                      Read update
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-glass">
            <p className="text-sm font-semibold text-primary-500">
              Moderation Promise
            </p>
            <p className="mt-3 text-sm text-slate-600">
              Every conversation is reviewed by licensed clinicians before
              appearing publicly.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}

