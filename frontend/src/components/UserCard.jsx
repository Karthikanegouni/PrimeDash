import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import useUser from '../context/UserContext'
const apiUrl = import.meta.env.VITE_API_URL

const avatars = [
  '/assets/avatar1.png',
  '/assets/avatar2.png',
  '/assets/avatar3.png',
  '/assets/avatar4.png',
  '/assets/avatar5.png',
]

const UserCard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const user = useUser()
  const {
    username,
    email,
    userAvatar,
    updateEmail,
    updateUsername,
    updateUserAvatar,
  } = user
  const token = Cookies.get('jwt_token')

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await axios.get(`${apiUrl}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const { name, email, id } = response.data
        updateUsername(name)
        updateEmail(email)

        if (!userAvatar) {
          const index = id % avatars.length // generates a number between 0 and avatars.length - 1
          const selectedAvatar = avatars[index]
          updateUserAvatar(selectedAvatar)
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const Shimmer = () => (
    <div className="lg:w-[70%]  mx-auto mt-10 p-5 bg-white rounded shadow-md animate-pulse flex flex-col items-center gap-4">
      <div className="h-30 w-30 rounded-full bg-gray-300 border-4 border-sky-400"></div>
      <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
    </div>
  )

  if (loading) return <Shimmer />
  if (error)
    return (
      <p className="text-center mt-5 text-red-500 font-semibold">{error}</p>
    )

  return (
    <div className="flex lg:flex-row md:px-10 lg:w-[70%] flex-col mx-auto mt-5 p-5 rounded-xl shadow-md justify-center lg:justify-start  bg-gradient-to-b from-sky-700 to-indigo-900 text-white">
      <div className="flex md:max-w-[30%]  justify-center mx-auto lg:mx-0">
        <img
          src={userAvatar}
          alt="user-avatar"
          className="w-1/2 min-w-[150px] rounded-full border-5 border-sky-400"
        />
      </div>
      <div className="lg:flex flex-col justify-center items-start lg:items-start">
        <p className="my-3 text-2xl text-center font-semibold">{username}</p>
        <p className="text-center font-light">{email}</p>
      </div>
    </div>
  )
}

export default UserCard
