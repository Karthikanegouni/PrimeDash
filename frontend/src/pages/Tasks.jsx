import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { BiSearch } from 'react-icons/bi'
import AddTaskPopup from '../components/AddTaskPopup'
import EmptyView from '../components/EmptyView'
import TasksTable from '../components/TasksTable'
const apiUrl = import.meta.env.VITE_API_URL

const Tasks = () => {
  const [searchInput, setSearchInput] = useState('')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const token = Cookies.get('jwt_token')
      const res = await axios.get(`${apiUrl}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks(res.data.tasks || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get('jwt_token')
      await axios.delete(`${apiUrl}/tasks/${id}}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete task')
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.description.toLowerCase().includes(searchInput.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' ? true : task.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="w-full min-h-[95vh] bg-gradient-to-b from-sky-700 to-black text-white flex flex-col items-center py-10 md:max-h-[100vh] overflow-y-auto">
      <h1 className="text-[clamp(1.3rem,2vw,3rem)] font-bold mb-5 text-center">
        Tasks
      </h1>

      <div className="flex flex-col lg:flex-row items-center gap-4 mb-5">
        <div className="relative w-[90vw] md:w-[60ch] flex items-stretch rounded-3xl text-zinc-900">
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-3 pl-5 text-l outline-none w-full focus:ring-5 bg-zinc-100  focus:ring-sky-500 rounded-3xl text-black"
            placeholder="Search tasks..."
          />
          <button className="bg-sky-600 text-white px-5 h-full right-0 absolute cursor-pointer rounded-e-3xl">
            <BiSearch className="text-[1.5rem]" />
          </button>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded-md text-black bg-white border border-gray-300 outline-none focus:ring-5 focus:ring-sky-500"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <AddTaskPopup refreshTasks={fetchTasks} />
      </div>

      {loading ? (
        <p className="text-center mt-5">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center mt-5">{error}</p>
      ) : tasks.length === 0 ? (
        <EmptyView />
      ) : filteredTasks.length === 0 ? (
        <p className="text-center mt-5 text-zinc-300">
          No tasks found for this filter or search.
        </p>
      ) : (
        <TasksTable
          filteredTasks={filteredTasks}
          fetchTasks={fetchTasks}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Tasks
