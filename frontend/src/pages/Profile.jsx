import UserCard from '../components/UserCard'
import UpdateProfileForm from '../components/UpdateProfileForm'

const Profile = () => {
  return (
    <div className="min-h-[95vh] w-full p-3 md:p-10 text-white bg-radial from-sky-700 to-black md:max-h-[100vh] overflow-y-auto">
      <h1 className="text-center text-[clamp(1.3rem,2vw,3rem)] font-semibold">
        Profile
      </h1>
      <UserCard />
      <UpdateProfileForm />
    </div>
  )
}

export default Profile
