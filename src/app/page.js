"use client"

import Button from "@/components/Button"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import SearchBox from "@/components/SearchBox"
import Image from "next/image"
import React, { useRef, useState } from "react"

export default function Home() {
  const [showTrending, setIsShowTrending] = useState(false)
  const lensSearchRef = useRef(null)
  const searchBoxRef = useRef(null)

  const handleContainerEvents = (e) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
      setIsShowTrending(false)
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen overflow-y-auto bg-[#202124]"
      onMouseDown={handleContainerEvents}
    >
      {" "}
      <Header />
      <main
        className={`flex flex-col  items-center justify-center flex-grow ${
          showTrending ? "mb-56 pb-3 " : ""
        }`}
      >
        <Image
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"
          alt="Logo"
          width={272}
          height={92}
        />
        <SearchBox
          className="mt-6"
          showTrending={showTrending}
          setShowTrending={setIsShowTrending}
          ref={searchBoxRef}
        />

        {!showTrending && (
          <React.Fragment>
            <div className="mt-8">
              <Button text="Google Search" className="mr-3" />
              <Button text="I'm Feeling Lucky" />
            </div>
            <div className="text-[12px] flex text-[#bfbfbf] font-bold mt-6 mb-32">
              Google offered in:
              <span className="ml-2 flex justify-between w-[380px]">
                <span className="text-[#99c3ff]">हिन्दी</span>
                <span className="text-[#99c3ff]">বাংলা</span>
                <span className="text-[#99c3ff]">తెలుగు</span>
                <span className="text-[#99c3ff]">मराठी</span>
                <span className="text-[#99c3ff]">தமிழ்</span>
                <span className="text-[#99c3ff]">ગુજરાતી</span>
                <span className="text-[#99c3ff]">ಕನ್ನಡ</span>
                <span className="text-[#99c3ff]">മലയാളം</span>
                <span className="text-[#99c3ff]">ਪੰਜਾਬੀ</span>
              </span>
            </div>
          </React.Fragment>
        )}
      </main>
      <Footer />
    </div>
  )
}
