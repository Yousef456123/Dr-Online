import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { discussionAPI, contactAPI } from '../services/api'
import apiClient from '../services/api'

export function Profile() {
  const [user, setUser] = useState(null)
  const [userTopics, setUserTopics] = useState([])
  const [receivedMessages, setReceivedMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('topics')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '' })
  const fileInputRef = useRef(null)
  const [avatarUploading, setAvatarUploading] = useState(false)

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user') || 'null')
    if (!loggedInUser) {
      window.location.href = '/register'
      return
    }
    // Normalize id/_id so components can rely on `id`
    if (!loggedInUser.id && loggedInUser._id) {
      loggedInUser.id = loggedInUser._id
      localStorage.setItem('user', JSON.stringify(loggedInUser))
    }
    setUser(loggedInUser)
    fetchUserData(loggedInUser.id || loggedInUser._id)
  }, [])

  const fetchUserData = async (userId) => {
    try {
      setLoading(true)
      // Fetch all discussions
      const discussionsRes = await discussionAPI.getAllDiscussions()
      if (discussionsRes.data.success) {
        const userDiscussions = discussionsRes.data.discussions.filter(
          (d) => d.author?._id === userId
        )
        setUserTopics(userDiscussions)
      }

      // Fetch only this user's messages via new endpoint
      try {
        const myContactsRes = await apiClient.get('/contact/mine')
        if (myContactsRes.data.success) setReceivedMessages(myContactsRes.data.contactRequests || myContactsRes.data.contactRequests || [])
      } catch (err) {
        // fallback to empty and log
        console.warn('Could not fetch personal contacts', err)
        setReceivedMessages([])
      }
    } catch (err) {
      console.error('Error fetching user data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleAvatarFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      setAvatarUploading(true)
      const formData = new FormData()
      formData.append('avatar', file)
      const userId = user.id || user._id
      const res = await apiClient.post(`/users/${userId}/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (res.data.success) {
        const updatedUser = res.data.user
        if (!updatedUser.id && updatedUser._id) updatedUser.id = updatedUser._id
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        // reload so header/navbar components read the updated localStorage
        window.location.reload()
      }
    } catch (err) {
      console.error('Upload avatar error', err)
    } finally {
      setAvatarUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemoveAvatar = async () => {
    if (!window.confirm('Remove profile image?')) return
    try {
      setAvatarUploading(true)
      const userId = user.id || user._id
      const res = await apiClient.delete(`/users/${userId}/avatar`)
      if (res.data.success) {
        const updatedUser = res.data.user
        if (!updatedUser.id && updatedUser._id) updatedUser.id = updatedUser._id
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setUser(updatedUser)
        // reload so header/navbar components read the updated localStorage
        window.location.reload()
      }
    } catch (err) {
      console.error('Remove avatar error', err)
    } finally {
      setAvatarUploading(false)
    }
  }

  const handleDeleteTopic = async (topicId) => {
    if (!window.confirm('Are you sure you want to delete this topic?')) {
      return
    }
    try {
      const response = await discussionAPI.deleteDiscussion(topicId)
      if (response.data.success) {
        setUserTopics(userTopics.filter((t) => t._id !== topicId))
      }
    } catch (err) {
      console.error('Error deleting topic:', err)
    }
  }

  const handleEditStart = (topic) => {
    setEditingId(topic._id)
    setEditForm({
      title: topic.title,
      description: topic.description,
      category: topic.category,
    })
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditForm({ title: '', description: '', category: '' })
  }

  const handleEditSubmit = async (topicId) => {
    try {
      const response = await discussionAPI.updateDiscussion(topicId, {
        title: editForm.title,
        description: editForm.description,
        category: editForm.category,
      })
      if (response.data.success) {
        setUserTopics(
          userTopics.map((t) =>
            t._id === topicId
              ? {
                  ...t,
                  title: editForm.title,
                  description: editForm.description,
                  category: editForm.category,
                }
              : t
          )
        )
        setEditingId(null)
      }
    } catch (err) {
      console.error('Error updating topic:', err)
    }
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-slate-600">Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Profile Header */}
      <section className="bg-gradient-to-r from-midnight via-primary-700 to-primary-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-start gap-2">
              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white text-primary-600">
                {user.profileImage ? (
                  <img
                    src={`http://localhost:5000${user.profileImage}`}
                    alt="profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.innerHTML = `<div class="flex h-full w-full items-center justify-center font-bold text-2xl">${user.fullName?.charAt(0) || 'U'}</div>`
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-bold text-2xl">
                    {user.fullName?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleAvatarClick}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20"
                >
                  {avatarUploading ? 'Uploading...' : 'Change'}
                </button>
                <button
                  onClick={handleRemoveAvatar}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20"
                >
                  Remove
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarFile}
                />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.fullName}</h1>
              <p className="mt-1 text-white/80">
                {user.role === 'doctor' ? '👨‍⚕️ Doctor' : '👤 Patient'}
              </p>
              <p className="mt-1 text-sm text-white/70">ID: {user.id}</p>
              <p className="text-sm text-white/70">{user.email}</p>
              {user.specialization && (
                <p className="text-sm text-white/70">Specialization: {user.specialization}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('topics')}
              className={`px-4 py-4 font-semibold border-b-2 transition ${
                activeTab === 'topics'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              My Topics ({userTopics.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-4 font-semibold border-b-2 transition ${
                activeTab === 'messages'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Messages Received ({receivedMessages.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        {loading ? (
          <div className="text-center text-slate-600">
            <p>Loading your profile...</p>
          </div>
        ) : activeTab === 'topics' ? (
          // Topics Tab
          <div className="space-y-6">
            {userTopics.length === 0 ? (
              <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center">
                <p className="text-slate-600">You haven't published any topics yet.</p>
                <Link
                  to="/discussions"
                  className="mt-4 inline-flex items-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700"
                >
                  Create a Topic
                </Link>
              </div>
            ) : (
              userTopics.map((topic) => (
                <div
                  key={topic._id}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
                >
                  {editingId === topic._id ? (
                    // Edit Form
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-midnight">Edit Topic</h3>
                      <div>
                        <label className="text-sm text-slate-600">Category</label>
                        <select
                          className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, category: e.target.value }))
                          }
                        >
                          <option value="general">General</option>
                          <option value="research">Research</option>
                          <option value="questions">Questions</option>
                          <option value="experiences">Experiences</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-slate-600">Title</label>
                        <input
                          className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, title: e.target.value }))
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-600">Description</label>
                        <textarea
                          className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary-300 focus:outline-none"
                          rows={3}
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, description: e.target.value }))
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSubmit(topic._id)}
                          className="flex-1 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Display View
                    <>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">
                            {topic.category}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold text-midnight">
                            {topic.title}
                          </h3>
                          <p className="mt-2 text-sm text-slate-600">{topic.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditStart(topic)}
                            className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTopic(topic._id)}
                            className="rounded-lg bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="rounded-full bg-primary-50 px-3 py-1 text-primary-600">
                          {topic.replies?.length || 0} replies
                        </span>
                        <span className="rounded-full bg-slate-50 px-3 py-1 text-slate-600">
                          {topic.views || 0} views
                        </span>
                      </div>
                      <Link
                        to={`/discussions/${topic._id}`}
                        className="mt-4 inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700"
                      >
                        View thread →
                      </Link>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          // Messages Tab
          <div className="space-y-6">
            {receivedMessages.length === 0 ? (
              <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center">
                <p className="text-slate-600">You haven't received any messages yet.</p>
                <p className="mt-2 text-sm text-slate-500">
                  Share your ID: <span className="font-mono font-semibold">{user.id}</span> to
                  let others contact you.
                </p>
              </div>
            ) : (
              receivedMessages.map((message) => (
                <div
                  key={message._id}
                  className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-midnight">{message.fullName}</h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            message.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-600'
                              : message.status === 'resolved'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {message.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{message.email}</p>
                      {message.subject && (
                        <p className="mt-2 font-medium text-midnight">Subject: {message.subject}</p>
                      )}
                      <p className="mt-2 text-slate-700">{message.message}</p>
                      <p className="mt-4 text-xs text-slate-500">
                        Received:{' '}
                        {new Date(message.createdAt).toLocaleDateString()} at{' '}
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${message.email}`}
                        className="rounded-lg bg-primary-100 px-3 py-2 text-xs font-semibold text-primary-600 hover:bg-primary-200"
                      >
                        Reply Email
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
