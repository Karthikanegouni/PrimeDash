import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'
import axios from 'axios'
import Cookies from 'js-cookie'
const apiUrl = import.meta.env.VITE_API_URL

const LoginForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({}) // client validation
  const [serverError, setServerError] = useState('') // backend error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerError('')
  }

  const handleTogglePassword = (e) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Client-side validation
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: formData.email.toLowerCase(),
        password: formData.password,
      })

      Cookies.set('jwt_token', response.data.token, { expires: 1 })
      navigate('/')
    } catch (err) {
      // Server-side errors
      if (err.response && err.response.data && err.response.data.message) {
        setServerError(err.response.data.message)
      } else {
        setServerError('Server error. Please try again.')
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-100 p-5 md:p-10 rounded-lg shadow-lg w-[90%] max-w-md mx-auto mt-20"
    >
      <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-center text-amber-700 mb-6">
        Login
      </h1>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email.toLowerCase()}
          onChange={handleChange}
          placeholder="Enter your email"
          className={`w-full border rounded-md px-3 py-2 outline-none  ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 font-medium text-gray-700"
        >
          Password
        </label>
        <div
          className={`flex items-center rounded-md px-3 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full outline-none"
            required
          />
          <button
            onClick={handleTogglePassword}
            className="bg-transparent ml-2"
          >
            {showPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
      {serverError && (
        <p className="text-red-500 text-sm mb-4 text-center">{serverError}</p>
      )}

      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md transition duration-200"
      >
        Login
      </button>

      <p className="text-center text-gray-600 text-sm mt-4">
        New here?{' '}
        <Link
          to="/register"
          className="text-amber-600 hover:text-amber-700 font-medium"
        >
          Sign up
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
