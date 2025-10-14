import Popup from 'reactjs-popup'
import AddTaskForm from './AddTaskForm'

const AddTaskPopup = ({ refreshTasks }) => {
  return (
    <Popup
      modal
      trigger={
        <button className="bg-sky-600 text-white px-5 py-2 rounded-md hover:bg-sky-700 transition my-5">
          Add Task
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
          <AddTaskForm closePopup={close} refreshTasks={refreshTasks} />
        </div>
      )}
    </Popup>
  )
}

export default AddTaskPopup
