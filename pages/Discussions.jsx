import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { discussionTopics as initialTopics } from '../data/discussions'
import { studyUpdates } from '../data/studies'

const conditions = ['All', ...new Set(studyUpdates.map((item) => item.condition))]

export function Discussions() {
  const [topics, setTopics] = useState(initialTopics)
  const [form, setForm] = useState({
    name: '',
    role: 'Patient',
    title: '',
    message: '',
  })
  const [conditionFilter, setConditionFilter] = useState('All')

  const filteredStudies = useMemo(() => {
    if (conditionFilter === 'All') return studyUpdates
    return studyUpdates.filter((study) => study.condition === conditionFilter)
  }, [conditionFilter])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title || !form.message) return

    const newTopic = {
      id: `${form.title.toLowerCase().replace(/\s+/g, '-')}-${topics.length + 1}`,
      title: form.title,
      authorType: `${form.name || 'Anonymous'} - ${form.role}`,
      excerpt: form.message,
      replies: 0,
      sentiment: 'New Topic',
      lastActivity: 'Just now',
      highlights: [],
    }
    setTopics([newTopic, ...topics])
    setForm({ name: '', role: form.role, title: '', message: '' })
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
          <div className="rounded-3xl bg-white p-8 shadow-glass">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm text-slate-600">Your name</label>
                  <input
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Role</label>
                  <select
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                    value={form.role}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, role: e.target.value }))
                    }
                  >
                    <option>Doctor</option>
                    <option>Patient</option>
                    <option>Caregiver</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-slate-600">Topic title</label>
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
                <label className="text-sm text-slate-600">Message</label>
                <textarea
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                  placeholder="Include questions, metrics, or resources..."
                />
              </div>
              <button className="w-full rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white">
                Publish Topic
              </button>
            </form>
          </div>

          <div className="space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">
                    {topic.sentiment}
                  </p>
                  <span className="text-xs text-slate-500">
                    {topic.lastActivity}
                  </span>
                </div>
                <p className="mt-2 text-xl font-semibold text-midnight">
                  {topic.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">{topic.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>{topic.authorType}</span>
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-600">
                    {topic.replies} replies
                  </span>
                </div>
                <Link
                  to={`/discussions/${topic.id}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600"
                >
                  View thread
                </Link>
              </div>
            ))}
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
              {filteredStudies.map((study) => (
                <div
                  key={study.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    {study.condition}
                  </p>
                  <p className="mt-2 text-base font-semibold">{study.title}</p>
                  <p className="mt-2 text-sm text-white/75">
                    {study.summary}
                  </p>
                  <Link
                    to={`/discussions/${study.id}`}
                    className="mt-3 inline-flex items-center text-sm font-semibold text-accent"
                  >
                    Read update
                  </Link>
                </div>
              ))}
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

