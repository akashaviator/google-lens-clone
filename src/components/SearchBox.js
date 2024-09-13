"use client"
import React, { forwardRef, useState } from "react"
import Search from "../../public/svgs/search.svg"
import Speech from "../../public/svgs/speech.svg"
import Lens from "../../public/svgs/lens.svg"
import Trending from "../../public/svgs/trending.svg"
import Button from "./Button"

const recentSearchesData = [
  "How to use React",
  "JavaScript ES6 features",
  "CSS Flexbox tutorial",
  "Understanding Hooks in React",
  "Next.js vs React",
]

const SearchBox = forwardRef(({ showTrending, setShowTrending }, ref) => {
  return (
    <React.Fragment>
      <div className="relative mt-6 w-full max-w-[584px]" ref={ref}>
        <input
          type="text"
          onFocus={() => setShowTrending(true)}
          className={`w-full py-3 pl-10 pr-24 border-[1px] min-h-[44px] ${
            showTrending
              ? "bg-[#303134] rounded-t-[25px] border-transparent"
              : "bg-[#202124] rounded-full"
          } hover:bg-[#303134] border-[#5f6368] hover:border-transparent focus:outline-none`}
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
        {showTrending && (
          <div className="absolute w-full bg-[#303134] rounded-b-[25px] pb-4 mb-80">
            <div className="w-100 mx-4 border-t border-[#5f6267]">
              <span className="font-semibold text-[#9e9e9e] mb-[16px] mt-[20px] text-[14px]">
                Trending Searches
              </span>
              {recentSearchesData.map((search, index) => (
                <div
                  key={index}
                  className="py-2 text-[#e8eaed] items-center flex hover:bg-[#424245] cursor-pointer"
                >
                  <Trending width={20} height={20} />
                  <span className="ml-3">{search}</span>
                </div>
              ))}
              <div className="flex justify-center mt-4">
                <Button
                  text="Google Search"
                  className="text-semibold bg-[#3c4043] mr-5"
                />
                <Button
                  text="I'm Feeling Lucky"
                  className="text-semibold bg-[#3c4043]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
})

export default SearchBox
