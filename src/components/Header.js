import Image from "next/image"
import React from "react"
import Icon from "@mdi/react"
import { mdiDotsGrid } from "@mdi/js"

const LINK_CLASS = "p-[5px] mx-1 hover:underline"
const Header = ({ className, showLogo = false }) => {
  return (
    <div
      className={`${className} flex items-center justify-between p-1.5 h-[60px] text-[14px] font-semibold px-3`}
    >
      {showLogo ? (
        <Image
          src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
          width={75}
          height={40}
          alt="Google"
        />
      ) : (
        <div className="">
          <a href="#" className={LINK_CLASS}>
            About
          </a>
          <a href="#" className={LINK_CLASS}>
            Store
          </a>
        </div>
      )}
      <div className="ml-2 flex items-center gap-1">
        {showLogo ? null : (
          <React.Fragment>
            <a href="#" className={LINK_CLASS}>
              Gmail
            </a>
            <a href="#" className={LINK_CLASS}>
              Images
            </a>
          </React.Fragment>
        )}
        <Icon
          path={mdiDotsGrid}
          color={showLogo ? "#6d6f74" : "white"}
          className={`rounded-full aspect-square p-1.5 transition-colors duration-400 ${
            showLogo ? "hover:bg-[#efeff1] mr-1" : "hover:bg-[#2d2e32] "
          }`}
          size={1.5}
        />
        <span
          className={`rounded-full aspect-square  ${
            showLogo
              ? "mr-2"
              : "hover:bg-[#2d2e32] p-1 transition-colors duration-400 w-[45px]"
          }`}
        >
          <Image
            src="/peter.jpg"
            alt="Peter Griffin"
            width={35}
            height={35}
            className="rounded-full aspect-square object-cover"
          />
        </span>
      </div>
    </div>
  )
}

export default Header
