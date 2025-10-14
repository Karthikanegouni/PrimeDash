import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { FiEdit } from 'react-icons/fi'
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'
import useUser from '../context/UserContext'
const apiUrl = import.meta.env.VITE_API_URL

const UpdateProfileForm = () => {
  const [profile, setProfile] = useState({ name: '', email: '', password: '' })
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const user = useUser()
  const { username, email, updateEmail, updateUsername } = user
  const token = Cookies.get('jwt_token')

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value })

  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setError('')
    setSuccessMsg('')
    try {
      const updateData = { name: profile.name, email: profile.email }
      if (profile.password) updateData.password = profile.password

      await axios.put(`${apiUrl}/users/profile`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setSuccessMsg('Profile updated successfully')
      updateUsername(profile.name)
      updateEmail(profile.email)
      setProfile({ ...profile, password: '' })
      setShowPassword(false)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div
      className={`border-2 rounded-xl shadow-lg p-6 lg:max-w-[70%] mx-auto mt-10 text-black ${
        editMode
          ? 'bg-white'
          : 'bg-gradient-to-t from-sky-900 bg-zinc-900 text-white '
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <button
          onClick={() => setEditMode(!editMode)}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition cursor-pointer "
        >
          <FiEdit size={22} />
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={profile.name}
              onChange={handleChange}
              className="p-2 rounded text-black w-full focus:outline-none border-sky-400 border-1 focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Id"
              value={profile.email}
              onChange={handleChange}
              className="p-2 rounded text-black w-full focus:outline-none border-sky-400 border-1 focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="flex flex-col relative ">
            <label className="text-sm mb-1">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={profile.password}
              onChange={handleChange}
              placeholder="Leave empty if no change"
              className="p-2 rounded text-black w-full focus:outline-none border-sky-400 border-1 focus:ring-2 focus:ring-sky-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-9 text-black/70 hover:text-black cursor-pointer"
            >
              {showPassword ? (
                <RiEyeFill size={18} />
              ) : (
                <RiEyeCloseFill size={18} />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={updating}
            className="bg-green-700 px-4 py-2 rounded hover:bg-green-900 transition mt-2 text-white font-bold"
          >
            {updating ? 'Updating...' : 'Save Changes'}
          </button>

          {successMsg && (
            <p className="text-green-600 font-bold text-center">{successMsg}</p>
          )}
          {error && <p className="text-red-400">{error}</p>}
        </form>
      ) : (
        <div className="flex flex-col gap-2">
          <p>
            <span className="font-semibold">Name: </span>
            {username}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {email}
          </p>
          <p>
            <span className="font-semibold">Password: </span>**********
          </p>
        </div>
      )}
    </div>
  )
}

export default UpdateProfileForm
