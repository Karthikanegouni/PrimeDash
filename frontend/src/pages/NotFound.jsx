import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-950 to-zinc-900 text-white text-center p-6">
      <h1 className="text-[6rem] font-extrabold text-sky-500 drop-shadow-lg">
        404
      </h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-300 mb-6 max-w-md">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-sky-600 hover:bg-sky-700 transition px-6 py-2 rounded-lg font-semibold cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  )
}

export default NotFound
