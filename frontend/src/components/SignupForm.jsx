import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'
import axios from 'axios'
import Cookies from 'js-cookie'
const apiUrl = import.meta.env.VITE_API_URL

const SignupForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'email' ? value.toLowerCase() : value,
    }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerError('')
    setSuccessMessage('')
  }

  const handleTogglePassword = (e) => {
    e.preventDefault()
    setShowPassword((prev) => !prev)
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitted(true)
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, formData)

      // Save token if present
      if (response.data.token) {
        Cookies.set('jwt_token', response.data.token, { expires: 1 })
      }

      setSuccessMessage(
        response.data.message || 'Account created successfully!'
      )
      setServerError('')
      setFormData({ name: '', email: '', password: '' })

      // Redirect after short delay
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      if (err.response?.data?.message) {
        setServerError(err.response.data.message)
      } else {
        setServerError('Server error. Please try again.')
      }
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-100 p-5 md:p-10 rounded-lg shadow-lg w-[90%] max-w-md mx-auto mt-10"
    >
      <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-center text-amber-700 mb-6">
        Sign Up
      </h1>

      {successMessage && (
        <p className="text-green-600 text-sm mb-4 text-center font-medium">
          {successMessage}
        </p>
      )}

      {serverError && (
        <p className="text-red-500 text-sm mb-4 text-center">{serverError}</p>
      )}

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={`w-full border rounded-md px-3 py-2 outline-none ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={`w-full border rounded-md px-3 py-2 outline-none ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
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
            type='button'
            className="bg-transparent ml-2"
          >
            {showPassword ? <RiEyeFill /> : <RiEyeCloseFill />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitted}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md transition duration-200 disabled:bg-zinc-500 disabled:cursor-not-allowed"
      >
        {isSubmitted ? 'Signing up...' : 'Sign up'}
      </button>

      <p className="text-center text-gray-600 text-sm mt-4">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-amber-600 hover:text-amber-700 font-semibold"
        >
          Login
        </Link>
      </p>
    </form>
  )
}

export default SignupForm
