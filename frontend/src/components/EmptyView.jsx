import React from 'react'

const EmptyView = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center max-w-5xl mx-auto mt-5 md:mt-10 text-center">
      <img
        src="/assets/notasks.svg"
        alt="No Tasks To View"
        className="w-[70%] md:w-[40%]"
      />
      <p className="text-zinc-400 font-semibold my-5 md:my-0 text-xl md:text-2xl mx-5 ">
        You haven't created any tasks yet, start by creating some tasks!
      </p>
    </div>
  )
}

export default EmptyView
