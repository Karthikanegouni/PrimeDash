export const StatsCard = ({ title, count, color }) => (
  <div
    className="flex flex-col justify-center items-center w-30 py-5 lg:w-50 rounded-2xl shadow-md text-white"
    style={{ backgroundColor: color }}
  >
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl font-bold mt-2">{count}</p>
  </div>
)
