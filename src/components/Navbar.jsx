import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-zinc-100">
      <div className="w-[90%] md:w-full md:max-w-6xl mx-auto h-14 flex justify-between items-center">
        <div className="logo text-[1rem] md:text-xl font-semibold">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">GUARD /&gt;</span>
        </div>
        <a
          href="https://github.com/MuhammadAreeb30"
          target="_blank"
          className="flex text-[0.90rem] md:text-[1rem] items-center gap-2 bg-green-600 py-2 px-4 rounded-full transition-all text-white font-medium border-2 hover:border-2 hover:border-green-600 hover:bg-white hover:text-green-600"
        >
          <img src="icons/github.png" alt="Github" width={30} className="github z-10" />
          Github
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
