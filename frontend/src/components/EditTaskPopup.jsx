import Popup from 'reactjs-popup'
import EditTaskForm from './EditTaskForm'
import { BiEdit } from 'react-icons/bi'

const EditTaskPopup = ({ task, refreshTasks }) => {
  return (
    <Popup
      modal
      trigger={
        <button className="text-sky-600 hover:text-sky-800 text-2xl">
          <BiEdit />
        </button>
      }
      position="center"
      overlayStyle={{
        backgroundColor: '#0000007f',
        backdropFilter: 'blur(2px)',
      }}
    >
      {(close) => (
        <div className="flex flex-col bg-zinc-100 w-[90vw] md:w-[60vw] lg:w-[30vw] rounded-lg">
          <button
            className=" text-zinc-900 hover:text-red-700  text-4xl font-bold self-end mr-5"
            onClick={close}
          >
            &times;
          </button>
          <EditTaskForm
            task={task}
            closePopup={close}
            refreshTasks={refreshTasks}
          />
        </div>
      )}
    </Popup>
  )
}

export default EditTaskPopup
