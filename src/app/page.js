"use client"
import Button from "@/components/Button"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import LensSearch from "@/components/LensSearch"
import SearchBox from "@/components/SearchBox"
import { useRef, useState } from "react"

export default function Home() {
  const [isLensSearch, setIsLensSearch] = useState(false)
  const [showTrending, setIsShowTrending] = useState(false)
  const lensSearchRef = useRef(null)
  const searchBoxRef = useRef(null)

  const handleContainerEvents = (e) => {
    if (lensSearchRef.current && !lensSearchRef.current.contains(e.target)) {
      setIsLensSearch(false)
    }
    if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
      setIsShowTrending(false)
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen overflow-y-auto bg-[#202124]"
      onMouseDown={handleContainerEvents}
    >
      <Header />

      <main
        className={`flex flex-col  items-center justify-center ${
          isLensSearch ? "mt-20" : ""
        } flex-grow ${showTrending ? "mb-40 pb-2.5" : ""}`}
      >
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png"
          alt="Logo"
          className="mb-6 w-[272px]"
        />
        {isLensSearch ? (
          <LensSearch ref={lensSearchRef} />
        ) : (
          <SearchBox
            setIsLensSearch={setIsLensSearch}
            showTrending={showTrending}
            setShowTrending={setIsShowTrending}
            ref={searchBoxRef}
          />
        )}
        {isLensSearch ? null : (
          <div className="mt-8">
            <Button text="Google Search" className="mr-3" />
            <Button text="I'm Feeling Lucky" />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
