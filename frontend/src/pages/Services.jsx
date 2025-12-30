import { PageHero } from '../components/PageHero'

const services = [
  {
    name: 'Virtual Wards',
    description:
      'Assign cohorts to smart wards that watch vitals, labs, and adherence.',
    features: ['Role-based dashboards', 'Escalation trees', 'Family SMS'],
    id: 'virtual-wards',
  },
  {
    name: 'Study Broadcasts',
    description:
      'Drop newly published studies to patient groups with context cards.',
    features: ['AI summarization', 'Localization', 'One-click reactions'],
    id: 'study-broadcasts',
  },
  {
    name: 'Discussion Circles',
    description:
      'Doctors and patients co-own moderated threads for every diagnosis.',
    features: ['Tagging', 'Evidence attachments', 'Voice notes'],
    id: 'discussion-circles',
  },
]

export function Services() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Your digital hospital, ready in minutes."
        description="From appointment triage to multi-disciplinary discussions, each module works on desktop and mobile."
      />
      <section className="mx-auto max-w-6xl space-y-10 px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              id={service.id}
              key={service.name}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-glass/40"
            >
              <p className="text-sm font-semibold text-primary-500">
                {service.name}
              </p>
              <p className="mt-2 text-lg font-semibold text-midnight">
                {service.description}
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {service.features.map((feat) => (
                  <li key={feat}>{feat}</li>
                ))}
              </ul>
              <button className="mt-4 rounded-full bg-primary-50 px-5 py-2 text-sm font-semibold text-primary-600">
                Book a demo
              </button>
            </div>
          ))}
        </div>
        <div className="rounded-3xl bg-midnight/95 p-8 text-white shadow-glass">
          <p className="text-sm font-semibold text-accent">All devices</p>
          <h2 className="mt-3 text-3xl font-semibold">
            Responsive layouts scale from operating rooms to living rooms.
          </h2>
          <p className="mt-4 text-sm text-white/80">
            The front-end adapts to tablets and phones with large tap targets,
            offline-ready states, and quick filters for urgent consults.
          </p>
        </div>
      </section>
    </>
  )
}

