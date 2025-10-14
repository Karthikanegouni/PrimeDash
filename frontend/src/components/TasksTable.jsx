import EditTaskPopup from './EditTaskPopup'
import { BiTrash } from 'react-icons/bi'

const TasksTable = ({ filteredTasks, fetchTasks, handleDelete }) => {
  const getRowColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-200 hover:bg-green-300'
      case 'in-progress':
        return 'bg-yellow-200 hover:bg-yellow-300'
      case 'pending':
        return 'bg-red-200 hover:bg-red-300'
      default:
        return 'bg-white hover:bg-gray-100'
    }
  }

  return (
    <div className="overflow-x-auto w-[90%]">
      <table className="min-w-full bg-white text-black rounded-xl overflow-hidden">
        <thead className="bg-sky-600 text-white font-semibold">
          <tr>
            <th className="py-3 px-5 text-left">Title</th>
            <th className="py-3 px-5 text-left">Description</th>
            <th className="py-3 px-5 text-left">Status</th>
            <th className="py-3 px-5 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr
              key={task.id}
              className={`${getRowColor(
                task.status
              )} border-b hover:bg-gray-100 text-black`}
            >
              <td className="py-3 px-5 max-w-[15ch] lg:max-w-[20ch] overflow-x-auto">
                {task.title}
              </td>
              <td className="py-3 px-5 max-w-[15ch] lg:max-w-[20ch] overflow-x-auto">
                {task.description.trim() === ''
                  ? 'No description'
                  : task.description}
              </td>
              <td className="py-3 px-5 capitalize">{task.status}</td>
              <td className="py-3 px-5 flex gap-3">
                <div className="relative group">
                  <EditTaskPopup task={task} refreshTasks={fetchTasks} />
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-[10ch] text-center">
                    Edit Task
                  </span>
                </div>

                <div className="relative group">
                  <button
                    className="text-red-600 hover:text-red-800 text-2xl"
                    onClick={() => handleDelete(task.id)}
                  >
                    <BiTrash size={20} />
                  </button>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-[15ch] text-center">
                    Delete Task
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TasksTable
