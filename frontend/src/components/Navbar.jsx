import { useNavigate, NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import { MdSpaceDashboard, MdLogout } from 'react-icons/md'
import { FaUserAlt, FaTasks } from 'react-icons/fa'

const navItemsList = [
  {
    id: 'HOME',
    displayText: 'Home',
    path: '/',
    icon: <MdSpaceDashboard />,
  },
  {
    id: 'PROFILE',
    displayText: 'Profile',
    path: '/profile',
    icon: <FaUserAlt />,
  },
  { id: 'TASKS', displayText: 'Tasks', path: '/tasks', icon: <FaTasks /> },
]

const LogoutPopup = ({ children }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  return (
    <Popup
      modal
      trigger={children}
      position="center"
      overlayStyle={{
        backgroundColor: '#0000007f',
        backdropFilter: 'blur(2px)',
      }}
    >
      {(close) => (
        <div className="p-6 rounded-xl text-center bg-white text-black w-75 md:w-80">
          <p className="mb-6 text-lg">Are you sure you want to logout?</p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleLogout()
                close()
              }}
              className="px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-600 transition"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </Popup>
  )
}

const Navbar = () => {
  return (
    <nav className="flex p-3 md:p-0 md:flex-col items-center md:items-stretch justify-between bg-zinc-200 md:h-screen md:max-h-screen md:min-w-[15%]">
      <h1 className="text-[clamp(1.3rem,2vw,3rem)] font-bold md:text-center md:mt-5 px-3 ">
        PrimeDash
        <span className="text-[clamp(1.5rem,2vw,3rem)] text-sky-400">.</span>
      </h1>

      {/* Large screen Nav*/}
      <div className="hidden md:flex md:flex-col md:flex-grow">
        <ul className="flex flex-col flex-grow gap-3 mt-10">
          {navItemsList.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={({ isActive }) =>
                `block p-3 pl-10 text-[clamp(1rem,2vw,1.2rem)] transition-all duration-300 font-semibold text-black ${
                  isActive
                    ? 'bg-sky-400 text-white ml-5 rounded-s-full shadow-lg shadow-sky-900 '
                    : 'hover:bg-sky-200 rounded-s-full ml-2 shadow-md shadow-grey-700'
                }`
              }
            >
              {item.displayText}
            </NavLink>
          ))}
        </ul>
        <LogoutPopup>
          <button className="bg-sky-400 text-white p-3 hover:bg-sky-500 px-10 rounded-full cursor-pointer m-10 self-center font-bold text-l">
            Logout
          </button>
        </LogoutPopup>
      </div>
      {/*Small screens Menu */}
      <div className="flex md:hidden">
        <ul className="flex gap-5 text-2xl items-center">
          {navItemsList.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={({ isActive }) =>
                `${isActive ? 'text-sky-400 scale-[1.3]' : 'text-zinc-900'}`
              }
            >
              {item.icon}
            </NavLink>
          ))}
        </ul>
        <LogoutPopup>
          <button className="text-2xl pl-3">
            <MdLogout />
          </button>
        </LogoutPopup>
      </div>
    </nav>
  )
}

export default Navbar
