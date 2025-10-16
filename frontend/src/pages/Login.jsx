import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginForm from '../components/LoginForm'

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (token) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gradient-to-t from-sky-900 to-zinc-900">
      <LoginForm />
      <h1 className="text-white text-md mt-10 max-w-[30ch] md:max-w-[50ch] p-3">
        Its may take few seconds (30-50secs) to start the server if its not used
        for a while, as it is hosted in free tier of render.
      </h1>
    </div>
  )
}

export default Login
