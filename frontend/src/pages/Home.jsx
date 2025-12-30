import { Link } from 'react-router-dom'
import heroImg from '../assets/doctor1.png'
import { studyUpdates } from '../data/studies'
import { discussionTopics } from '../data/discussions'

const departments = [
  { label: 'Cardiology', detail: 'Remote ECG + Lifestyle' },
  { label: "Women's Health", detail: 'Fertility & Hormone Labs' },
  { label: 'Oncology', detail: 'Chemo-at-home coaching' },
  { label: 'Pulmonology', detail: 'AI breath tracking' },
  { label: 'Endocrinology', detail: 'Glucose digital twin' },
  { label: 'Mental Health', detail: 'Mindfulness wards' },
]

export function Home() {
  return (
    <div className="space-y-16 pb-16">
      <section className="bg-hero-pattern text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.5em] text-white/70">
              Trusted - Digital - Compassionate
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
              Bringing health to life for the whole family-anytime, anywhere.
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Register as a doctor or patient, push evidence-based studies to
              your care circle, and keep the conversation alive inside secure
              forums.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/discussions"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-lg shadow-primary-900/20 hover:bg-accent hover:text-midnight"
              >
                Visit Community
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center text-white/80">
              {[
                { label: 'Doctors Onboarded', value: '1,850+' },
                { label: 'Families Protected', value: '12,400' },
                { label: 'Avg. Response', value: '< 4 min' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/20 p-4 backdrop-blur-lg"
                >
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-white/10 blur-3xl" />
            <img
              src={heroImg}
              alt="Medical care team"
              className="relative z-10 w-full rounded-[32px] border border-white/20 shadow-glass"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-white p-10 shadow-glass">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-primary-500">
                Digital departments
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-midnight">
                One dashboard, every specialty.
              </h2>
            </div>
            <Link
              to="/services"
              className="rounded-full border border-primary-100 px-6 py-3 text-sm font-semibold text-primary-600 hover:bg-primary-50"
            >
              View Clinical Stack
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <div
                key={dept.label}
                className="rounded-2xl border border-primary-50 bg-gradient-to-br from-white to-primary-50/40 p-6 text-midnight"
              >
                <p className="text-lg font-semibold">{dept.label}</p>
                <p className="mt-2 text-sm text-slate-600">{dept.detail}</p>
                <button className="mt-4 text-sm font-semibold text-primary-600">
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-glass">
          <p className="text-sm font-semibold text-primary-500">
            Register instantly
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-midnight">
            Doctors & patients share one engagement hub.
          </h3>
          <div className="mt-6 grid gap-4">
            {[
              {
                title: 'Doctor Portal',
                bullets: [
                  'Upload studies, protocols, discharge notes.',
                  'Assign patients to digital wards.',
                  'Receive live feedback & discussion tags.',
                ],
              },
              {
                title: 'Patient Passport',
                bullets: [
                  'Track vitals, habits, and medication reminders.',
                  'Ask doctors inside moderated discussion threads.',
                  'Get nudges when new research matches your profile.',
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-100 p-6"
              >
                <p className="text-lg font-semibold text-midnight">
                  {card.title}
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {card.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <button className="mt-4 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-600">
                  Create {card.title.split(' ')[0]} account
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-midnight/95 p-8 text-white shadow-glass">
          <p className="text-sm font-semibold text-accent">Live studies</p>
          <h3 className="mt-2 text-2xl font-semibold">
            Doctors push updates; patients react in minutes.
          </h3>
          <div className="mt-6 space-y-4">
            {studyUpdates.map((study) => (
              <div
                key={study.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/70">
                  <span>{study.condition}</span>
                  <span>{new Date(study.publishedOn).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-lg font-semibold">{study.title}</p>
                <p className="mt-1 text-sm text-white/70">
                  {study.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/discussions/${study.id}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-accent"
                >
                  View update
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl bg-white p-10 shadow-glass">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-500">
                Trending discussions
              </p>
              <h3 className="text-2xl font-semibold text-midnight">
                Doctors & families solve cases side-by-side.
              </h3>
            </div>
            <Link
              to="/discussions"
              className="rounded-full border border-primary-100 px-6 py-3 text-sm font-semibold text-primary-600 hover:bg-primary-50"
            >
              View all threads
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {discussionTopics.map((topic) => (
              <div
                key={topic.id}
                className="rounded-2xl border border-slate-100 p-6 hover:border-primary-200"
              >
                <p className="text-sm font-semibold text-primary-600">
                  {topic.sentiment}
                </p>
                <p className="mt-2 text-lg font-semibold text-midnight">
                  {topic.title}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {topic.excerpt}
                </p>
                <p className="mt-3 text-xs text-slate-500">{topic.authorType}</p>
                <Link
                  to={`/discussions/${topic.id}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600"
                >
                  Join topic
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

