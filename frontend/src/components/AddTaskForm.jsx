import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
const apiUrl = import.meta.env.VITE_API_URL

const AddTaskForm = ({ refreshTasks, closePopup }) => {
  const [formData, setFormData] = useState({ title: '', description: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerError('')
    setSuccessMsg('')
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const token = Cookies.get('jwt_token')
      if (!token) {
        setServerError('Authentication error. Please log in again.')
        return
      }

      await axios.post(`${apiUrl}/tasks`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setSuccessMsg('Task created successfully!')
      setFormData({ title: '', description: '' })

      // Refresh tasks table from Tasks component
      if (refreshTasks) await refreshTasks()

      // Close popup after adding
      if (closePopup) closePopup()
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Server error. Please try again.'
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-100 p-5 md:p-10 rounded-lg shadow-lg w-full  mx-auto  text-zinc-900"
    >
      <h1 className="text-[clamp(1rem,3vw,2rem)] font-bold text-center text-amber-700 mb-6">
        Add Task
      </h1>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className={`w-full border rounded-md px-3 py-2 outline-none ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2 font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          rows="4"
          className="w-full border rounded-md px-3 py-2 outline-none border-gray-300 resize-none"
        ></textarea>
      </div>

      {/* Messages */}
      {serverError && (
        <p className="text-red-500 text-sm mb-4 text-center">{serverError}</p>
      )}
      {successMsg && (
        <p className="text-green-700 text-sm mb-4 font-semibold text-center">
          {successMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md transition duration-200"
      >
        Add Task
      </button>
    </form>
  )
}

export default AddTaskForm
