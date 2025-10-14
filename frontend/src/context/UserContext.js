import { createContext, useContext } from 'react'

const UserContext = createContext({
  username: '',
  email: '',
  stats: 0,
  updateUsername: () => {},
  updateEmail: () => {},
  updateStats: () => {},
})

export const UserProvider = UserContext.Provider

export default function useUser() {
  return useContext(UserContext)
}
