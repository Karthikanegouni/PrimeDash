import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
const apiUrl = import.meta.env.VITE_API_URL

const EditTaskForm = ({ task, closePopup, refreshTasks }) => {
  const [formData, setFormData] = useState({
    title: task.title || '',
    description: task.description || '',
    status: task.status || 'pending',
  })
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
      await axios.put(`${apiUrl}/tasks/${task.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setSuccessMsg('Task updated successfully!')

      // Refresh the tasks table
      if (refreshTasks) await refreshTasks()

      // Close the popup
      if (closePopup) closePopup()
    } catch (err) {
      setServerError(err.response?.data?.message || 'Server error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-100 p-5 md:p-10 rounded-lg shadow-lg w-full mx-auto text-zinc-900"
    >
      <h1 className="text-[clamp(1rem,3vw,2rem)] font-bold text-center text-amber-700 mb-6">
        Edit Task
      </h1>

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
          className={`w-full border rounded-md px-3 py-2 outline-none ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

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
          rows="4"
          className="w-full border rounded-md px-3 py-2 outline-none border-gray-300 resize-none"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="status"
          className="block mb-2 font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 outline-none border-gray-300"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {serverError && (
        <p className="text-red-500 text-sm mb-4 text-center">{serverError}</p>
      )}
      {successMsg && (
        <p className="text-green-700 text-sm mb-4 font-semibold text-center">
          {successMsg}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-md transition duration-200"
      >
        Update Task
      </button>
    </form>
  )
}

export default EditTaskForm
