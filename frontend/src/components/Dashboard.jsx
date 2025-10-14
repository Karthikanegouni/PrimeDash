import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { StatsCard } from './StatsCard'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import useUser from '../context/UserContext'
import EmptyView from './EmptyView'
const apiUrl = import.meta.env.VITE_API_URL

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { stats = {}, updateStats } = useUser()

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      setError('')
      try {
        const token = Cookies.get('jwt_token')
        const res = await axios.get(`${apiUrl}/tasks/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        updateStats(res.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch stats')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <p className="text-center mt-5">Loading...</p>
  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>

  const noTasks = !stats.totalTasks

  const cardsData = [
    { title: 'Total Tasks', count: stats.totalTasks ?? 0, color: '#3b82f6' },
    { title: 'Completed', count: stats.completedTasks ?? 0, color: '#10b981' },
    { title: 'Pending', count: stats.pendingTasks ?? 0, color: '#ef4444' },
    {
      title: 'In Progress',
      count: stats.inProgressTasks ?? 0,
      color: '#f59e0b',
    },
  ]

  const pieData = cardsData
    .filter((card) => card.title !== 'Total Tasks' && card.count > 0)
    .map((card) => ({
      name: card.title,
      value: card.count,
      color: card.color,
    }))

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 flex flex-col gap-10">
      <div className="flex flex-wrap gap-6 justify-center p-5">
        {cardsData.map((card) => (
          <StatsCard
            key={card.title}
            title={card.title}
            count={card.count}
            color={card.color}
          />
        ))}
      </div>

      {noTasks ? (
        <EmptyView />
      ) : (
        <div className="bg-white p-5 rounded-xl shadow-md mx-3 mb-5 md:mx-5">
          <h2 className="text-xl font-bold mb-5 text-center text-zinc-600">
            Tasks Distribution
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={5}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default Dashboard
