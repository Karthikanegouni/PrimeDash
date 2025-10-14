import Dashboard from '../components/Dashboard'

const Home = () => {
  return (
    <div className="w-full min-h-[95vh] bg-radial from-sky-700 to-black text-white flex flex-col md:max-h-[100vh] overflow-y-auto">
      <h1 className="text-[clamp(1.3rem,2vw,3rem)] text-center lg:mt-5 p-5 font-bold">
        Dashboard
      </h1>

      <Dashboard />
    </div>
  )
}

export default Home
