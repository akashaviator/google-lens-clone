const Footer = () => {
  return (
    <footer className="flex-col items-center justify-center bg-[#171717]">
      <div className="font-semibold py-[15px] px-[30px] border-gray-600 border-b-[0.5px] text-[15px]">
        India
      </div>
      <div className="flex font-semibold px-[40px] py-[12px] md:gap-y-0 gap-y-6 md:flex-row flex-col items-center md:justify-between text-[14px]">
        <span className="flex justify-between w-[350px]">
          <span>Advertising</span>
          <span>Business</span>
          <span>How Search works</span>
        </span>
        <span className="flex justify-between w-[250px]">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Settings</span>
        </span>
      </div>
    </footer>
  )
}
export default Footer
