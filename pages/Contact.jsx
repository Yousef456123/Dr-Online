import { PageHero } from '../components/PageHero'

export function Contact() {
  return (
    <>
      <PageHero
        eyebrow="We are listening"
        title="Schedule a walkthrough or escalate a case."
        description="Fill out the form and our triage desk will respond in under 30 minutes."
      />
      <section className="mx-auto max-w-5xl gap-8 px-4 py-16 lg:grid lg:grid-cols-2">
        <form className="space-y-4 rounded-3xl bg-white p-8 shadow-glass">
          <div>
            <label className="text-sm font-medium text-slate-700">Name</label>
            <input
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
              placeholder="Dr. Elena Raymond"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
              placeholder="you@hospital.org"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                I&apos;m a
              </label>
              <select className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none">
                <option>Doctor</option>
                <option>Patient</option>
                <option>Caregiver</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Preferred slot
              </label>
              <input
                type="date"
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
              placeholder="Share context around your request..."
            />
          </div>
          <button className="w-full rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white">
            Send request
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

