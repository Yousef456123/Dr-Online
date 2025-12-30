import { PageHero } from '../components/PageHero'

const milestones = [
  { year: '2020', detail: 'Started as tele-triage during city lockdowns.' },
  { year: '2022', detail: 'Launched research-to-patient broadcast tools.' },
  { year: '2024', detail: 'Reached 10k hybrid consults across 14 countries.' },
  { year: '2025', detail: 'AI-driven ward orchestration now live.' },
]

export function About() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="We blend bedside compassion with cloud-native care."
        description="Dr. Online keeps the multidisciplinary team one tap away so patients never wait for answers."
      />
      <section className="mx-auto max-w-5xl space-y-8 px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-glass">
            <p className="text-sm font-semibold text-primary-500">
              Mission & vision
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-midnight">
              Every doctor becomes part of the family's inner circle.
            </h2>
            <p className="mt-4 text-slate-600">
              Our platform was designed by hospitalists and patient advocates to
              fight fragmented care. Real-time research drops, moderated
              conversations, and service design thinking ensure decisions stay
              transparent.
            </p>
          </div>
          <div className="rounded-3xl bg-midnight/95 p-8 text-white shadow-glass">
            <p className="text-sm font-semibold text-accent">Impact</p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>- 98% of patients receive study updates before clinic dates.</li>
              <li>- 87% adherence when clinicians co-author care plans.</li>
              <li>- 62% drop in emergency visits for chronic cohorts.</li>
            </ul>
            <button className="mt-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary-600">
              Meet the care team
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-glass">
          <p className="text-sm font-semibold text-primary-500">Timeline</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {milestones.map((step) => (
              <div
                key={step.year}
                className="rounded-2xl border border-slate-100 p-6"
              >
                <p className="text-xl font-semibold text-midnight">
                  {step.year}
                </p>
                <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

