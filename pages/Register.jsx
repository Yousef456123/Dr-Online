import { PageHero } from '../components/PageHero'

const cards = [
  {
    title: 'Doctor Enrollment',
    description:
      'Verify your medical license, configure specialties, and invite coordinators.',
    fields: ['Full name', 'Hospital ID', 'Specialty', 'Availability'],
  },
  {
    title: 'Patient Enrollment',
    description:
      'Create your health passport and decide who can view your records.',
    fields: ['Full name', 'Primary condition', 'Care team', 'Timezone'],
  },
]

export function Register() {
  return (
    <>
      <PageHero
        eyebrow="Join the platform"
        title="Sign up as a doctor or patient in under 2 minutes."
        description="Dr. Online keeps sensitive details encrypted while letting you collaborate immediately."
      />
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl bg-white p-8 shadow-glass"
            >
              <p className="text-sm font-semibold text-primary-500">
                {card.title}
              </p>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {card.fields.map((field) => (
                  <li key={field} className="rounded-2xl border border-slate-100 px-4 py-3">
                    {field}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white">
                Start {card.title.split(' ')[0]} Signup
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

