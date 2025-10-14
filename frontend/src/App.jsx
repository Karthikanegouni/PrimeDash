import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Profile from './pages/Profile'
import Tasks from './pages/Tasks'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import ProtectedRoute from './utils/ProtectedRoute'
import { UserProvider } from './context/UserContext'
import { useState } from 'react'
import Home from './pages/Home'

const Layout = () => (
  <main className="md:flex select-none">
    <Navbar />
    <Outlet />
  </main>
)


const App = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [stats, setStats] = useState(0)
  const [userAvatar, setUserAvatar] = useState(null)

  const updateUsername = (username) => {
    setUsername(username)
  }
  const updateEmail = (email) => {
    setEmail(email)
  }
  const updateStats = (stats) => {
    setStats(stats)
  }
  const updateUserAvatar = (avatar) => {
    setUserAvatar(avatar)
  }

  return (
    <UserProvider
      value={{
        username,
        email,
        stats,
        userAvatar,
        updateUsername,
        updateEmail,
        updateStats,
        updateUserAvatar,
      }}
    >
      <Routes>
        {/* Public (no navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected (with navbar via Layout) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>

        {/* Not found */}
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </UserProvider>
  )
}

export default App
