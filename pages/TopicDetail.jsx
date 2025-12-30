import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { discussionTopics } from '../data/discussions'
import { studyUpdates } from '../data/studies'

export function TopicDetail() {
  const { topicId } = useParams()

  const topic = useMemo(() => {
    return (
      discussionTopics.find((item) => item.id === topicId) ||
      studyUpdates.find((item) => item.id === topicId)
    )
  }, [topicId])

  if (!topic) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-2xl font-semibold text-midnight">
          Thread not found.
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

  const isStudy = Object.prototype.hasOwnProperty.call(topic, 'condition')

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
          {isStudy ? topic.condition : topic.sentiment}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-midnight">
          {topic.title}
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          {isStudy ? topic.summary : topic.excerpt}
        </p>

        {isStudy && (
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

        {!isStudy && topic.highlights?.length > 0 && (
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

