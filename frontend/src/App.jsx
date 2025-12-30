import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Discussions } from './pages/Discussions'
import { TopicDetail } from './pages/TopicDetail'
import { Contact } from './pages/Contact'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/discussions" element={<Discussions />} />
        <Route path="/discussions/:topicId" element={<TopicDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="*"
          element={
            <div className="mx-auto max-w-3xl px-4 py-20 text-center">
              <p className="text-2xl font-semibold text-midnight">
                Page not found
              </p>
            </div>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
