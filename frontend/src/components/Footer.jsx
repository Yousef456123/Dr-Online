import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'Virtual Wards', to: '/services#virtual-wards' },
  { label: 'Doctor Registry', to: '/about#team' },
  { label: 'Patient Stories', to: '/discussions' },
  { label: 'Support', to: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-midnight text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-wide">Dr. Online</p>
          <p className="mt-3 text-sm text-white/70">
            A trusted bridge between specialists and families. 12,500+ video
            consults completed this year with an average satisfaction score of
            4.9/5.
          </p>
        </div>
        <div>
          <p className="text-base font-semibold">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-base font-semibold">Contact</p>
          <p className="mt-3 text-sm text-white/70">
            Beirut - Haret Hreik Al Nakheel Building 
          </p>
          <p className="mt-2 text-sm text-white/70">Phone: +961 81 925 158</p>
          <p className="mt-1 text-sm text-white/70">
            Email: hello@dronline.health
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        Copyright {new Date().getFullYear()} Dr. Online. Designed for modern care teams.
      </div>
    </footer>
  )
}

