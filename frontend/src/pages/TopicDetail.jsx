import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { discussionAPI, studyAPI } from '../services/api'

export function TopicDetail() {
  const { topicId } = useParams()
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isStudy, setIsStudy] = useState(false)

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true)
        setError('')
        
        // Try to fetch as discussion first
        try {
          const discussionRes = await discussionAPI.getDiscussionById(topicId)
          if (discussionRes.data.success) {
            setTopic(discussionRes.data.discussion)
            setIsStudy(false)
            return
          }
        } catch (err) {
          // If discussion not found, try study
          console.log('Not a discussion:', err.response?.status)
        }

        // Try to fetch as study
        try {
          const studyRes = await studyAPI.getStudyById(topicId)
          if (studyRes.data.success) {
            setTopic(studyRes.data.study)
            setIsStudy(true)
            return
          }
        } catch (err) {
          console.log('Not a study:', err.response?.status)
        }

        // If we get here, thread wasn't found in either collection
        setError('Thread not found. It may have been deleted.')
      } catch (err) {
        console.error('Error fetching topic:', err)
        setError('Failed to load thread. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (topicId) {
      fetchTopic()
    }
  }, [topicId])

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-lg font-medium text-slate-600">Loading thread...</p>
      </section>
    )
  }

  if (error || !topic) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-2xl font-semibold text-midnight">
          {error || 'Thread not found.'}
        </p>
        <Link
          to="/discussions"
          className="mt-6 inline-flex items-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white"
        >
          Back to discussions
        </Link>
      </section>
    )
  }

  // Determine if it's a study based on available properties
  const isStudyContent = isStudy || Object.prototype.hasOwnProperty.call(topic, 'condition')

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="rounded-3xl bg-white p-8 shadow-glass">
        <Link
          to="/discussions"
          className="text-sm font-semibold text-primary-600"
        >
          Back to discussions
        </Link>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-primary-500">
          {isStudyContent ? topic.condition : topic.category}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-midnight">
          {topic.title}
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          {isStudyContent ? topic.description : topic.description}
        </p>

        {isStudyContent && topic.recommendations && (
          <div className="mt-6 space-y-3 rounded-2xl bg-primary-50/80 p-6">
            <p className="text-sm font-semibold text-primary-700">
              Recommended plan
            </p>
            <ul className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
              {topic.recommendations.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {!isStudyContent && topic.highlights?.length > 0 && (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {topic.highlights.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700"
              >
                {point}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-slate-100 p-6">
          <p className="text-sm font-semibold text-midnight">Add a reply</p>
          <p className="mt-2 text-sm text-slate-600">
            Replying is simulated for this demo. In production, this would post
            to a secure discussion API.
          </p>
        </div>
      </div>
    </section>
  )
}

