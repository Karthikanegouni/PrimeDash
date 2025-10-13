import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: 'Dashboard', path: '/' },
  { name: 'Profile', path: '/profile' },
  { name: 'Tasks', path: '/tasks' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-amber-500 text-white flex  md:flex-col  w-full md:w-[15vw] h-15 md:h-screen items-center justify-between relative">
      {/* Logo / Brand */}
      <div className="text-xl font-bold md:mb-6 ml-4">MyApp</div>

      {/* Hamburger for mobile */}
      <button className="md:hidden text-2xl mr-4" onClick={toggleMenu}>
        ☰
      </button>

      {/* Shared Nav Links */}
      <ul
        className={`flex-col md:flex-col  md:mt-4 md:relative absolute top-16 md:top-0 right-0 md:right-auto bg-amber-500 md:w-auto h-screen md:h-auto transform transition-transform duration-300 w-screen ${
          isOpen ? 'translate-x-[50vw]' : 'translate-x-full md:translate-x-0'
        }`}
      >
        {navLinks.map((link) => (
          <li key={link.name} className="md:mr-0 mr-4 my-2 md:my-0">
            <Link
              to={link.path}
              className="block px-4 py-2 hover:bg-amber-600 rounded"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
