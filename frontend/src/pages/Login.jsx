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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-sky-900 to-zinc-900">
      <LoginForm />
    </div>
  )
}

export default Login
