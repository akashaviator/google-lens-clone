import Image from "next/image"
import Menu from "../../public/svgs/menu.svg"

const LINK_CLASS = "p-[5px] mx-1 hover:underline"
const Header = () => {
  return (
    <div className="flex items-center justify-between p-1.5 h-[60px] bg-dark text-[14px] font-semibold px-3">
      <div className="">
        <a href="#" className={LINK_CLASS}>
          About
        </a>
        <a href="#" className={LINK_CLASS}>
          Store
        </a>
      </div>
      <div className="ml-2 flex items-center gap-1">
        <a href="#" className={LINK_CLASS}>
          Gmail
        </a>
        <a href="#" className={LINK_CLASS}>
          Images
        </a>
        <Menu
          width="35"
          height="35"
          color="white"
          className="rounded-full aspect-square hover:bg-[#2d2e32] p-1.5 transition-colors duration-400"
        />
        <span className="rounded-full aspect-square hover:bg-[#2d2e32] p-1 transition-colors duration-400 w-[45px]">
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
