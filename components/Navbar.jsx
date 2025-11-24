import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Discussions', to: '/discussions' },
  { label: 'Contact', to: '/contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  const renderLinks = () =>
    navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `px-4 py-2 text-sm font-medium transition rounded-full ${
            isActive
              ? 'bg-white text-primary-600 shadow'
              : 'text-white/90 hover:bg-white/10'
          }`
        }
        onClick={() => setOpen(false)}
      >
        {item.label}
      </NavLink>
    ))

  return (
    <header className="bg-primary-700 text-white shadow-lg shadow-primary-900/10">
      <div className="bg-primary-900/60 text-xs sm:text-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <p className="flex items-center gap-2 font-medium">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
              24/7
            </span>
            Digital hospital for doctors & families
          </p>
          <div className="flex flex-wrap gap-4 text-white/80">
            <a href="tel:+15550001234" className="hover:text-white">
              +961 81 925 158
            </a>
            <a href="mailto:hello@dronline.health" className="hover:text-white">
              hello@dronline.health
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-glass">
            Dr.
          </div>
          <div>
            <p className="text-lg uppercase tracking-wide">Dr. Online</p>
            <p className="text-xs text-white/70">Care That Travels</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">{renderLinks()}</nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/discussions"
            className="rounded-full border border-white/40 px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            Community Hub
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary-600 shadow-glass hover:bg-accent hover:text-midnight"
          >
            Join Today
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </div>
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1">{renderLinks()}</div>
          <div className="mt-4 flex flex-col gap-2">
            <Link
              to="/discussions"
              className="rounded-full border border-white/40 px-4 py-2 text-center text-sm font-medium hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Community Hub
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-white px-5 py-2 text-center text-sm font-semibold text-primary-600 shadow-glass hover:bg-accent hover:text-midnight"
              onClick={() => setOpen(false)}
            >
              Join Today
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

