import React from "react"
import Search from "../../public/svgs/search.svg"
import Speech from "../../public/svgs/speech.svg"
import Lens from "../../public/svgs/lens.svg"

const SearchBox = ({ className }) => {
  return (
    <div className={`${className} relative w-full max-w-[584px]`}>
      <input
        type="text"
        className={`w-full py-3 pl-10 pr-24 border-[1px] min-h-[44px] bg-[#202124] focus:border-transparent focus:bg-[#303134] hover:bg-[#303134] border-[#5f6368] rounded-full hover:border-transparent focus:outline-none`}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Search width={25} height={25} />
      </div>
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 cursor-pointer">
        <Speech width={25} height={25} />
      </div>
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer">
        <Lens width={25} height={25} />
      </div>
    </div>
  )
}

export default SearchBox
