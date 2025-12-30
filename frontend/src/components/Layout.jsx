import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

